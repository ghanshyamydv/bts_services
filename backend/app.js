import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import wrapAsync from "./utils/wrapAsync.js";
import expressError from "./utils/expressError.js";
import User from "./models/user.model.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { generateAccessToken, generateRefreshToken } from "./utils/jwt.js";
import FoodItem from "./models/restaurant-models/foodItem.model.js";
import { verifyToken } from "./utils/verifyToken.js";
import Cart from "./models/cart.model.js";
import Order from "./models/order.model.js";
import {createServer} from "http";
import { Server } from "socket.io";

const app=express();
const server = createServer(app);
const io = new Server(server, {
  cors:{
  origin: "http://localhost:5173",
  credentials: true,
}
}); 

// io.on("connec")
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// Parse incoming JSON
app.use(express.json());

// Provide the same secret if you want signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });


//database connection----------------------------
const atlasdbURL = process.env.ATLASDB_URL;
// const atlasdbURL = "mongodb://localhost:27017/GiftOfLife";
db()
  .then((res) => console.log("Database connection sucessful"))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(atlasdbURL);
}
// ------------------------------------ socket io ---------------------------------------
io.on("connection", (socket)=>{
  console.log("connected", socket.id);
   // Handle join-room event
  socket.on("join-room", async ({ category}) => {
    
  await socket.join("deliveryBoy"); // join the room
    console.log(`${socket.id} joined room: ${category}`);
  });

  socket.on("updateOrder", async () => {
    socket.to("deliveryBoy").emit("orders-updated")
  });

})

//---------------------------------------------
app.get("/", (req,res)=>{
  res.send("Welcome to BTS Services");
});

app.post("/api/signup", wrapAsync(
  async (req, res, next) =>{  
      // Check if email already exists
      const existingUser = await User.findOne({ email:req.body.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    const newUser = new User(req.body);
    await newUser.save();
    
    res.status(200).json({
      success: true,
      message: "User created successfully",
  });
}
));

// Login route
app.post("/api/login", async (req, res) => {
  
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid Credentials" });
  }

  if (!compareSync(req.body.password, user.password)) {
    return res.status(401).json({ success: false, message: "Invalid Credentials" });
  }

  const payload = { id: user._id, category: user.category };

  const accessToken = generateAccessToken(payload);        // expires in 15 mins
  const refreshToken = generateRefreshToken(payload);      // expires in 7 days

  // Store refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    signed: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Logged in Successfully!",
    accessToken, // send access token for immediate login
    user: { id: user._id, category: user.category}
  });
});

app.get("/api/refresh-token", (req, res) => {
  const token = req.signedCookies.refreshToken;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        signed: true
      });
      return res.sendStatus(403);
    }

    const newAccessToken = generateAccessToken({ id: decoded.id });

    return res.json({
      accessToken: newAccessToken,
      user: { id: decoded.id, category:decoded.category}
    });
  });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    signed: true
  });

  return res.status(200).json({ message: "Logout Successful!" });
});

app.get("/api/restaurants", wrapAsync(
  async (req, res, next) =>{  
    const restaurants=await User.find({category:"Restaurant Partner"});
    const allRestaurants=restaurants.map((restaurant)=>{
      return {
       id: restaurant._id,
       name: restaurant.fullName,
       rating: 5.0,
       description: "Quality matters 😋😋😋",
       status: "Open",
       deliveryTime: "30 mins",
       location: "Siraha",
       minOrder: "RS 250.00",
       image:restaurant.profileImage.url 
    }
    })
    
    res.status(200).json(allRestaurants);
}
));

app.get("/api/restaurants/:id", wrapAsync(
  async (req, res, next) =>{  
    
    const restaurant=await User.findById(req.params.id);
    const newRestaurants={
       id: restaurant._id,
       name: restaurant.fullName,
       rating: 5.0,
       description: "Quality matters 😋😋😋",
       status: "Open",
       deliveryTime: "30 mins",
       location: "Siraha",
       minOrder: "RS 250.00",
       image:restaurant.profileImage.url,
       mobile:restaurant.mobile,
    }
    
    res.status(200).json(newRestaurants);
}
));


app.get("/api/food-item/:id", wrapAsync(
  async (req, res, next) =>{  
    const foodItems=await FoodItem.find({restaurant:req.params.id});
    res.status(200).json(foodItems);
}
));

app.post("/api/food/cart", verifyToken, wrapAsync(
  async (req, res, next) =>{
    
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // create new cart
      cart = await Cart.create({
        userId: req.user.id,
        cartItems: [{ product, quantity }],
      });
    } else {
      // find if product exists
      const itemIndex = cart.cartItems.findIndex(
        item => item.product.toString() === product
      );

      if (itemIndex > -1) {
        // increase quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // push new item
        cart.cartItems.push({ product, quantity });
      }

      await cart.save();
    }

    res.status(200).json({ success: true, cart });
}
));

app.get("/api/food/cart",verifyToken, wrapAsync(
  async (req, res, next) =>{  
    const cart=await Cart.findOne({userId:req.user.id}).populate("cartItems.product");
    res.status(200).json(cart);
  }
));

app.post("/api/food/update-cart",verifyToken, wrapAsync(
    async (req, res) => {
      
    try {
      const { productId, action } = req.body;
      const userId = req.user.id;
      
      const cart = await Cart.findOne({ userId });
      
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const item = cart.cartItems.find(i => i.product.toString() === productId);
      if (!item) return res.status(404).json({ message: "Item not found" });

      if (action === "increase") {
        item.quantity += 1;
      } else if (action === "decrease") {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item if quantity goes to zero
          cart.cartItems = cart.cartItems.filter(i => i.product.toString() !== productId);
        }
      }

      await cart.save();
      return res.json(cart);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
));

app.get("/api/food/restaurant-location/:id",verifyToken,wrapAsync(
  async (req, res, next) =>{  
    const restaurant=await User.findById(req.params.id);
    const user=await User.findById(req.user.id);
    res.status(200).json({user:{fullName:user.fullName,mobile:user.mobile},resLocation:restaurant.location.coordinates});
}
));

app.post("/api/food/order",verifyToken,wrapAsync(  
  async (req, res, next) =>{  
    const newOrder=new Order({user:req.user.id,...req.body});
    await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order Placed successfully!",
  });
}
));

app.get("/api/food/orders", verifyToken, wrapAsync(
  async (req, res, next) =>{  
    const orders =await Order.find({user:req.user.id});
    res.status(200).json(orders);
}
));
// --------------------------Restaurant partner Routes---------------------------------

app.post("/api/restaurant/food-item", verifyToken, wrapAsync(
  async (req, res, next) =>{  
    const newItem = new FoodItem({restaurant:req?.user?.id,...req.body});
    await newItem.save();
    
    res.status(200).json({
      success: true,
      message: "Item Added successfully",
  });
}
));
app.post("/api/restaurant/food-item/remove", verifyToken, wrapAsync(
  async (req, res, next) =>{  
    const removedItem =await FoodItem.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Item removed successfully",
  });
}
));

app.get("/api/restaurant/food-item", verifyToken, wrapAsync(
  async (req, res, next) =>{  
    const foodItems=await FoodItem.find({restaurant:req.user.id});
    res.status(200).json(foodItems);
}
));

app.get("/api/restaurant/orders",verifyToken,wrapAsync(  
  async (req, res, next) =>{  
    // const orders=await Order.find({user:req.user.id});
    let orders=await Order.find().populate("cartItems.product").sort({ createdAt: -1 });
    const restaurantId = req.user.id.toString();
    
    // 2. filter cartItems by restaurant
    orders = orders
      .map(order => {
        order.cartItems = order.cartItems.filter(item =>
          item.product?.restaurant?.toString() === restaurantId
        );
        return order;
      })
      // 3. remove orders with empty cartItems
      // .filter(order => order.cartItems.length > 0);
    
    res.status(200).json(orders);
}
));

app.get("/api/restaurant/orders/:id",verifyToken,wrapAsync(  
  async (req, res, next) =>{  
    let order=await Order.findById(req.params.id).populate("cartItems.product");
    res.status(200).json(order);
}
));

app.post("/api/restaurant/update-order", verifyToken, wrapAsync(async (req, res) => {
// console.log(req.io);

  const order = await Order.findByIdAndUpdate(
    req.body.id,
    { status: req.body.status },
    { new: true }
  ).populate("cartItems.product");

  // const deliveryBoyIds = await User.find({ category: "Delivery Partner" }).select("_id");

  // const restaurant = order.cartItems[0].product.restaurant;
  // const orders = await Order.find({ status: { $ne: "Delivered" } });
  // io.emit("updateOrder", orders);

  // io.to(restaurant).emit("updateOrder", orders);

  // deliveryBoyIds.forEach(d => {
  //   io.to(d._id.toString()).emit("updateOrder", orders);
  // });
   const orders = await Order.find({
        status: { $nin: ["Delivered", "Cancelled"] }
      });
  // req.io.to("deliveryBoy").emit("orders-update", orders);
  res.status(200).json(order);
}));


// app.post("/api/restaurant/update-order",verifyToken, wrapAsync(
//     async (req, res) => {
//       let order=await Order.findByIdAndUpdate(req.body.id,{status:req.body.status}).populate("cartItems.product");
//       const deliveryBoyIds=await User.find({category:"Delivery Partner"}).select("_id");;
//       // console.log(order.cartItems[0].product.restaurant);
      
//       // 🔥 Send new updated order to all clients
//       const restaurant = order.cartItems[0].product.restaurant; 
//       const customer = order.user;
//       const orders = await Order.find({ status: { $ne: "Delivered" } });
//       io.to(restaurant).emit("updateOrder", orders);
//       // io.to(customer).emit("updateOrder", orders);
//       deliveryBoyIds.forEach((deliveryBoy)=>{
//         io.to(deliveryBoy._id).emit("updateOrder", orders);
//       })

//       res.status(200).json(order);
//   }
  
// ));

// --------------------------Delivery partner Routes---------------------------------
app.get("/api/delivery/orders",verifyToken,wrapAsync(  
  async (req, res, next) =>{  
    let orders=await Order.find().populate("cartItems.product").sort({ createdAt: -1 });
    
    res.status(200).json(orders);
}
));

app.use( (req, res, next) => {
  // console.log("all routes");
  const err = new expressError(404, "Page Not Found!");
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Some Error Occurred" } = err;
  // console.error("❌ ERROR OCCURRED");
  console.error("Route:", req.method, req.originalUrl);
  // console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  res.status(statusCode).json({ message });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});

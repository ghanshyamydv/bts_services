import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetRestaurantLocationQuery, usePlaceOrderMutation } from "../../redux/features/food/foodApi";
import getDistance from "../../../public/getDistance";
import { updateOrderField } from "../../redux/features/food/orderSlice";
function Checkout(){
  
  const dispatch=useDispatch();
  const orderDetails = useSelector((state) => state.order);
  const {items}=useSelector((state)=>state.cart);
  const [location, setLocation]=useState();
  const {accessToken, user, socket} = useSelector((state)=> state.auth);
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({longitude:position.coords.longitude,latitude:position.coords.latitude})
        // alert(
        //   `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`
        // );
      },
      (error) => {
        console.log(error);
        alert("Location access denied or unavailable.");
      }
    );
  };
  // console.log(items[0].product.restaurant);
  
  const { data, isLoading, error } = useGetRestaurantLocationQuery(items[0]?.product?.restaurant, {
        skip: !(items[0]?.product?.restaurant && accessToken)    // ⬅ fetch only when token exists
      });

  const distance = ()=>{
  if(location && data?.resLocation){
    return getDistance(data.resLocation[1], data.resLocation[0], location?.latitude, location?.longitude);
    // return getDistance(26.659418, 86.210490, 26.629950, 86.226816);
  }
}
  let subTotal=0;
  let deliveryFee=distance()?.toFixed(2)*10;
  
  useEffect(() => {
  if (location && items.length > 0) {
    dispatch(updateOrderField({ field: "deliveryFee", value: deliveryFee }));
    dispatch(updateOrderField({ field: "totalPrice", value: subTotal + deliveryFee }));
    dispatch(updateOrderField({ field: "cartItems", value: items }));
    dispatch(updateOrderField({
      field: "location",
      value: { type: "Point", coordinates: [location.latitude, location.longitude] }
    }));
  }
}, [location, items, subTotal, deliveryFee, dispatch]);

    // const [registerUser, { isLoading, data, error }] = useSignupUserMutation();
    const handleChange = (e) => {
      dispatch(
        updateOrderField({
          field: e.target.name,
          value: e.target.value,
        })
      );
    };


    if (data?.user) {
      // Initialize multiple fields safely
      dispatch(updateOrderField({ field: "customerName", value: data.user.fullName }));
      dispatch(updateOrderField({ field: "customerMobile", value: data.user.mobile}));
    }

const [placeOrders]=usePlaceOrderMutation();
  const handleSubmit = async () => {
    try {
      // console.log(orderDetails);
      // Call RTK Query mutation with data
      const result = await placeOrders(orderDetails); 
      console.log("order success:", result);

      if(socket && user){
        socket.emit("updateOrder");
      }
      // Optionally reset form here
      // dispatch(resetSignupForm());
  
    } catch (err) {
      console.error("Order failed:", err);
    }
  };
  
    if (isLoading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ========================
             DELIVERY ADDRESS FORM
        ========================= */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your name"
              name="customerName"
              value={orderDetails.customerName}
              onChange={handleChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter mobile number"
              name="customerMobile"
              value={orderDetails.customerMobile}
              onChange={handleChange}
            />
          </div>

          {/* Address Text Area */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Full Delivery Address
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              rows={4}
              name="customerAddress"
              placeholder="House No, Street, Area, City, Pincode"
              value={orderDetails.customerAddress}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Get Delivery Fee Button */}
          <button onClick={()=>{handleGetLocation();} } className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Get My Location
          </button>

        </div>


        {/* ========================
             ORDER SUMMARY
        ========================= */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* product list */}
          <div className="space-y-4">
            {items.map((item) => {
              // const discountedPrice = Math.round(item.product.originalPrice * (1 - item.product.discount / 100));
              const eachTotalPrice=(item.product.discountedPrice*item.quantity).toFixed(2);
              subTotal+=Number(eachTotalPrice);
              return <div
                key={item}
                className="flex items-center gap-4 border border-gray-200 rounded-xl p-3"
              >
                <img
                  src={item.product.image}
                  alt="product"
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Price: ₹ { item.product.discountedPrice}</p>
                  <p className="text-gray-600 font-semibold ">Total: ₹ { eachTotalPrice}</p>
                </div>
              </div>
            })}
          </div>

          {/* Price Details */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>

            {/* <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>-₹100</span>
            </div> */}
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Delivery Fee</span>
              <span>+₹{deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 font-semibold">
              <span>Total Amount</span>
              <span>₹{(subTotal+deliveryFee).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================
           PLACE ORDER BUTTON
      ========================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl p-4 lg:static lg:mt-6 lg:bg-transparent lg:shadow-none">
        <button onClick={handleSubmit} className="w-full py-4 bg-black text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;


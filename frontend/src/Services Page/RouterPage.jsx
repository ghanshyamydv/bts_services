import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import FoodPage from "./food/FoodPage";
import GroceryPage from "./grocery/GroceryPage";
import RestraInfo from "./food/RestraInfo";
import RestaurantList from "./food/Restaurants.JSX";
import Cart from "./food/Cart";
import ServiceCrad from "./ServiceCrad";
import Layout from "./Layout";
import Checkout from "./food/Checkout";
import Orders from "./Orders";

function RouterPage() {
    const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path: "", // default route
          element: <ServiceCrad />
        },
        {
          path:"/food",
          element:<FoodPage/>,
          children: [
            {
              path: "", // default route under /food
              element: <RestaurantList />
            },
            {
              path: "restaurants/:id",
              element: <RestraInfo />
            },
            {
              path: "cart",
              element: <Cart />
            },
            {
              path: "checkout",
              element: <Checkout />
            },
            
            
          ]
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "signup",
          element: <Signup/>
        },
        {
          path: "orders",
          element: <Orders/>
        },
        {
          path:"/grocery",
          element:<GroceryPage/>
        }
      ]
    },
  ])
  return <RouterProvider router={router}/>;
}

export default RouterPage

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import FoodItems from "./FoodItems";
import Orders from "./Orders";
import AddItemForm from "./AddItemForm";
import OrderDetails from "./OrderDetails";
import DeliveredOrders from "./DeliveredOrders";

  
function RouterPage() {


    const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path: "", // default route
          element: <Orders />
        },
        {
              path:"order/:id",
              element:<OrderDetails/>
        },
        {
          path:"/items",
          element:<FoodItems/>
        },
        {
          path:"/add-item",
          element:<AddItemForm/>
        },
        {
          path:"delivered-orders",
          element:<DeliveredOrders/>
        },
      ]
    },
  ])
  return <RouterProvider router={router}/>;
}

export default RouterPage;

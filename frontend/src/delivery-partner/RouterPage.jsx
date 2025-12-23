import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Orders from "./Orders";
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
          path:"delivered-orders",
          element:<DeliveredOrders/>
        },
        // {
        //   path:"/add-item",
        //   element:<AddItemForm/>
        // }
      ]
    },
  ])
  return <RouterProvider router={router}/>;
}

export default RouterPage;

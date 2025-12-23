import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDeliveryOrdersQuery } from "../redux/restaurant-features/restaurantApi";
import { useEffect } from "react";
// import { restaurantApi } from "../redux/restaurant-features/restaurantApi";
import { deliveryApi } from "../redux/delivery-features/deliveryApi";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
function Orders() {
  const navigate = useNavigate();
  const {data:orders, refetch}=useGetDeliveryOrdersQuery();
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth);
useEffect(() => {
  if (!socket || !user) return;
  const handleOrdersUpdate = () => {   
     refetch();
  };

  socket.on("orders-updated", handleOrdersUpdate);

  return () => {
    socket.off("orders-updated", handleOrdersUpdate);
  };
}, [socket, user]);

  const statusColors = {
  Pending: "bg-yellow-500",
  Confirmed: "bg-indigo-500",
  Preparing: "bg-blue-500",
  "Ready to Pickup": "bg-blue-600",
  "Out for Delivery": "bg-purple-500",
  Delivered: "bg-green-600",
  Cancelled: "bg-red-600",
};


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-5">Delivery Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders?.filter(order => order.status !== "Delivered").map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition cursor-pointer"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              {/* <h2 className="font-bold">#{order._id}</h2> */}
              <span
                className={`text-white text-sm px-3 py-1 rounded-full ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            {/* Details */}
            <p className="text-gray-700">
              <strong>Customer:</strong> {order?.customerName}
            </p>
            <p className="text-gray-700">
              <strong>Items:</strong> {order?.cartItems?.length}
            </p>
            <p className="text-gray-700">
              <strong>Total:</strong> Rs. {order?.totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {new Date(order.createdAt).toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // AM/PM
              }).replace(/-/g, "/")}
            </p>

            {/* Button */}
            <button
              onClick={() => navigate(`/order/${order?._id}`)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Orders;
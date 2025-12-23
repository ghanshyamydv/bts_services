import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery, useUpdateOrderMutation } from "../redux/restaurant-features/restaurantApi";
import { useSelector } from "react-redux";
import { socket } from "../socket";

function OrderDetails() {
  const {id}=useParams();
  // const dispatch=useDispatch();
  const {data:order}=useGetOrderQuery(id);
  const [updateOrder]=useUpdateOrderMutation();
  const handleUpdateOrder=async (status)=>{
   await updateOrder({id:order?._id, status:status});
  if(socket){
    socket.emit("updateOrder");
  }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-gray-600">Order ID: {order?._id}</p>
        </div>

        {/* Customer Details */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Name:</strong> {order?.customerName}</p>
            <p><strong>Phone:</strong> {order?.customerMobile}</p>
            <p><strong>Address:</strong> {order?.customerAddress}</p>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Ordered Items</h2>

          <div className="space-y-4">
            {order?.cartItems?.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 bg-white border p-3 rounded-lg shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Price: {(item.product.discountedPrice).toFixed(2)}</p>
                </div>
                <p className="font-semibold">Rs. {(item.product.discountedPrice*item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Price Summary</h2>
          {/* <div className="flex justify-between text-gray-700 mb-1">
            <span>Subtotal</span>
            <span>Rs. {order?.subTotal}</span>
          </div> */}
          {/* <div className="flex justify-between text-gray-700 mb-1">
            <span>Delivery Fee</span>
            <span>Rs. {order?.deliveryFee}</span>
          </div> */}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs. {(order?.totalPrice-order?.deliveryFee).toFixed(2)}</span>
          </div>
        </div>

        {/* Status Update Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Update Order Status</h2>

          <div className="flex gap-3 flex-wrap">
            <button disabled={order?.status==="Pending"?false:true}  onClick={()=>handleUpdateOrder("Confirmed")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition  disabled:bg-gray-400 disabled:cursor-not-allowed">
              Accept Order
            </button>
            <button disabled={order?.status==="Confirmed"?false:true} onClick={()=>handleUpdateOrder("Preparing")} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              Mark as Preparing
            </button>
            <button disabled={order?.status==="Preparing"?false:true}  onClick={()=>handleUpdateOrder("Ready to Pickup")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              Ready to Pickup
            </button>
            <button disabled={order?.status==="Ready to Pickup" || order?.status==="Delivered" ||order?.status==="Cancelled" ?true:false} onClick={()=>handleUpdateOrder("Cancelled")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
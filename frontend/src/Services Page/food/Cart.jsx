import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCartItemsQuery, useUpdateCartMutation } from "../../redux/features/food/foodApi";
function CartItemCard({item, handleUpdate}) {
  // const discountedPrice = Math.round(item.product.originalPrice * (1 - item.product.discount / 100)); 
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm ">
      <div className="flex items-start justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Image */}
          <img
            src={item.product.image}
            className="w-16 h-16 rounded-lg object-cover"
            alt="item"
          />

          {/* Title + Price */}
          <div>
            <h2 className="text-base font-semibold">{item.product.name}</h2>
            <p className="text-blue-600 text-sm font-semibold">₹{item.product.discountedPrice}</p>
          </div>
        </div>

        {/* Remove */}
        <button className="text-red-500 text-lg font-semibold">×</button>
      </div>

      {/* Quantity Row + Price */}
      <div className="flex items-center justify-between mt-4">

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button onClick={()=>handleUpdate({id:item.product._id,action:"decrease"})} className="w-8 h-8 border border-gray-300 rounded-lg flex justify-center items-center text-lg">
            -
          </button>

          <div className="w-8 h-8 border border-gray-300 rounded-lg flex justify-center items-center text-sm font-medium">
            {item.quantity}
          </div>

          <button onClick={()=>handleUpdate({id:item.product._id, action:"increase"})} className="w-8 h-8 border border-gray-300 rounded-lg flex justify-center items-center text-lg">
            +
          </button >
        </div>

        {/* Right Price */}
        <p className="text-lg font-semibold">₹{(item.product.discountedPrice*item.quantity)}</p>
      </div>
    </div>
  );
}


function Cart() {
  const {accessToken} = useSelector((state)=> state.auth);
  const { data:cart, isLoading, error } = useGetCartItemsQuery(undefined, {
        skip: !accessToken,   // ⬅ fetch only when token exists
      });

  const [updateCart,{isLoading:isUpdating}]=useUpdateCartMutation();
  const handleUpdate = async ({id,action}) => {
    
        try {
          const res = await updateCart({
            productId:id,
            action: action,
          }).unwrap();
 
          // optional: update UI cart slice
          // dispatch(updateCart(res.cart.cartItems));
  
          console.log("Added:", res);
        } catch (err) {
          console.log("Error:", err);
        } 
      }; 
    const totalCartItems = cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity,
      0) || 0;
    if (isLoading) return <p>Loading...</p>;
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md max-w-md">
      <h1 className="text-xl font-semibold mb-4">Cart Items ({totalCartItems})</h1>
      {cart?.cartItems?.map((item)=>{   
        return <CartItemCard key={item._id} item={item} handleUpdate={handleUpdate}/>
      })}
      <div className="flex justify-center"><Link to="/food/checkout"><button className="px-4 py-2 bg-blue-500 text-white rounded-xl">Proceed to Checkout</button></Link></div>
    </div>
  );
}


export default Cart;
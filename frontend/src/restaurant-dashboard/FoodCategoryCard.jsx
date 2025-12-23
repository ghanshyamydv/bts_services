import { useNavigate } from "react-router-dom";
import {useGetItemQuery, useRemoveItemMutation} from "../redux/restaurant-features/restaurantApi"

function FoodCategoryCard() {
  const navigate=useNavigate();
  const {data:items}=useGetItemQuery();
  const [removeItem]=useRemoveItemMutation();
  const categories = [...new Set(items?.map(item => item.category))];
  const handleRemove=async (id)=>{
    const result=await removeItem({id});
  }
  return (
    <div>
      {
      categories?.map((category)=>
      (
        <div key={category} className="mt-8 p-4 rounded-xl border border-gray-300 overflow-hidden w-full">
      {/* Main Heading */}
      <h2 className="text-2xl font-bold mb-4">{category}</h2>

      {/* Food Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items?.map((item) => {
          const discountedPrice = Math.round(item.originalPrice * (1 - item.discount / 100));
          
          if(item.category===category){
            return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-lg"
              />

              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>

              <p className="text-gray-500 text-sm">{item.description}</p>

              {/* Price Section */}
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="font-bold text-red-600 mr-2">₹{discountedPrice}</span>
                  <span className="text-gray-400 line-through text-sm">₹{item.originalPrice}</span>
                </div>

                <span className="text-green-600 font-semibold text-sm">
                  {item.discount}% OFF
                </span>
                <button onClick={()=>navigate(`edit-item/${item?._id}`)} className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 cursor-pointer">
                  Edit
                </button>
                <button onClick={()=>handleRemove(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 cursor-pointer">
                  Remove
                </button>
              </div>
            </div>
          );
          }
        })}
      </div>
    </div>
      )
      )
    }
    </div>
    
  );
}

export default FoodCategoryCard;

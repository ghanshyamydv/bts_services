import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetRestaurantsQuery } from "../../redux/features/food/foodApi";
// const restaurants = [
//   {
//     id: 1,
//     name: "Family Restaurant & Thakali Khana",
//     rating: 5.0,
//     description: "Best Restaurants in Siraha",
//     cuisine: ["Nepali", "Indian"],
//     status: "Open",
//     deliveryTime: "25-35 minutes",
//     deliveryCost: "RS 40.00",
//     location: "Siraha",
//     minOrder: "RS 250.00",
//     image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSye12jyqhO00zaqw7u4iyHK8ZzDtC6NIt6aw3OAfz8lBbekXmnsDUCBf-OitlTmISZsJirqZ5gizsZcvFP09wQSZ2Hajotp106CFCSbTSv5tM2n7AZ8yMo2Lzr9ys26lJBtQ7s=s1360-w1360-h1020-rw",
//   },
//   {
//     id: 2,
//     name: "Naya Test Cafe & Restaurant Bar",
//     rating: 5.0,
//     description: "Quality matters 😋😋😋",
//     cuisine: ["Indians"],
//     status: "Open",
//     deliveryTime: "30 mins",
//     deliveryCost: "RS 30.00",
//     location: "Siraha",
//     minOrder: "RS 250.00",
//     image: "https://scontent.fjkr1-1.fna.fbcdn.net/v/t39.30808-6/516939551_122102133350936451_3686976226173783720_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-cQX4AvxTxgQ7kNvwGnffAg&_nc_oc=AdmWMD2mm-gUQDPJNlIX91KCHjcgw6arhjVXyINTlbfzuvkL6UXLXGmcErhWxlTnlIQIJFTlSUuDPxmXeBkoCqaS&_nc_zt=23&_nc_ht=scontent.fjkr1-1.fna&_nc_gid=ct2HF3FWC48Yi4SM6D9pLQ&oh=00_AfgfzEivRmGGWqZaN9cReF26WcklDh0QsHYn2jyCfaOHJQ&oe=6925C373",
//   },
// ];

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`restaurants/${restaurant.id}`} className="bg-white rounded-xl shadow-md overflow-hidden w-72 m-2.5">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-44 object-cover"
        />
        {restaurant.deliveryCost && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            🚴 Delivery
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg w-50 truncate">{restaurant.name}</h3>
          <span className="flex items-center  font-semibold">
            ⭐ {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 truncate">{restaurant.description}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-xs py-1 text-gray-500">Status:</span>
          <span className="bg-blue-700 font-bold text-white px-2 py-1 text-xs rounded-full">
            {restaurant.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
          <span>Cook Time: {restaurant.deliveryTime}⏱</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-3">
          < FiMapPin/><span className="ml-2">{restaurant.location}</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">Min order: {restaurant.minOrder}</p>
      </div>
    </Link>
  );
}

function RestaurantList() {
  const {data:restaurants}=useGetRestaurantsQuery();
  
  return (
    <div>
        <div className="flex items-center"><FaRegStar className="text-3xl text-amber-400"/><h1 className="m-2.5 text-3xl font-medium">Top Restaurant</h1></div>
        <p className="ml-2.5 mb-2.5 text-gray-500">Highly rated Restaurant in our area</p>
        <div className="flex flex-wrap justify-start">
            {restaurants?.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
            ))}
        </div>
    </div>

  );
}

export default RestaurantList;
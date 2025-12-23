import React from 'react'
import { IoCallOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import FoodCategoryCard from './FoodCategoryCard';
import { useGetRestaurantDetailsQuery} from '../../redux/features/food/foodApi';

function RestraInfo() {
  const {id}=useParams();
  const {data:restaurant}=useGetRestaurantDetailsQuery(id);
  
  
  return (
    <div className='container mx-auto'>
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full ">
      <div className="relative">
        <img
          src={restaurant?.image}
          alt={restaurant?.name}
          className="w-full h-60 object-top object-cover"
        />
        {restaurant?.deliveryCost && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            🚴 Delivery
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">{restaurant?.name}</h3>
          <span className="flex items-center  font-semibold">
            ⭐ {restaurant?.rating.toFixed(1)}
          </span>
        </div>
        <div className='flex justify-between'>
            <div>
            <p className="text-gray-500 text-xl mt-1 truncate">{restaurant?.description}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-md text-gray-500">Status:</span>
          <span className="bg-blue-700 font-bold text-white px-2 py-1 text-sm rounded-full">
            {restaurant?.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-500 text-md mt-2">
          <span className='text-gray-500'>Cook Time: {restaurant?.deliveryTime}⏱</span>
        </div>
        <p className="text-gray-500 text-md mt-1">Min order: {restaurant?.minOrder}</p>
        <div className="flex items-center text-gray-500 text-sm mt-2">
            < FiMapPin/><span className="ml-2">{restaurant?.location}</span>
        </div>
        <div className='flex items-center text-gray-500 mt-2'><IoCallOutline /><p className='ml-2 '>+977-{restaurant?.mobile}</p></div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <button className='flex items-center justify-center w-44 text-white font-semibold  bg-green-500 py-2 rounded-3xl'><IoCallOutline /><span className='ml-2'>Call Restaurant</span></button>
            <Link to="https://www.google.com/maps/dir//M656%2BQ5P+Family+Restaurant+%26+Thakali+Khana+SAKA,+Siraha+56500/@26.6594629,86.2093663,17z/data=!4m17!1m7!3m6!1s0x39ec21007ffdd31b:0xfd6984ae80bd8e13!2sFamily+Restaurant+%26+Thakali+Khana+SAKA!8m2!3d26.6594533!4d86.2104606!16s%2Fg%2F11y2h5511n!4m8!1m0!1m5!1m1!1s0x39ec21007ffdd31b:0xfd6984ae80bd8e13!2m2!1d86.2104998!2d26.6594404!3e0?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" className='flex items-center justify-center w-44 text-white font-semibold bg-indigo-600 py-2 rounded-3xl mt-4'>< FiMapPin/><span className='ml-2'>Get Direction</span></Link>
        </div>
        </div>
      </div>
    </div>
    <FoodCategoryCard/>
    </div>
  )
}

export default RestraInfo

import RestaurantList from './Restaurants.JSX';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { Outlet } from "react-router-dom";
function FoodPage() {
  
  return (
    <div className='container mx-auto'>
        {/* <div className="container mx-auto">
        <div className='h-14 flex relative justify-between items-center'>
          <h1 className="font-sans text-2xl font-bold">BTS Food Service</h1>
          <div className="w-35 text-lg">
            <Link to="cart" className='flex flex-col justify-center items-center bg-amber-500'><span className='text-sm px-0.5 z-1 border border-white rounded-3xl bg-red-600 w-5.5 text-center text-white absolute bottom-6.5'>0</span><MdShoppingCart className='text-3xl absolute bottom-1'/> <span className='font-bold absolute right-5 bottom-1'>Cart</span></Link>
          </div>
        </div>
      </div> */}
      <Outlet/>
    </div>
  )
}

export default FoodPage

import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { openPopup} from "../redux/features/auth/popupSlice";
import { useSelector, useDispatch } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import { MdShoppingCart } from "react-icons/md";
import Profile from './Profile'; 
import { useGetCartItemsQuery } from '../redux/features/food/foodApi';
import { updateCart } from '../redux/features/food/cartSlice';
function Navbar() {
    const location = useLocation(); // gives current URL path
    const navigate=useNavigate();
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    // const {open, type} = useSelector((state) => state.popup);
    const {isAuthenticated, accessToken} = useSelector((state)=> state.auth);

    const { data:cart, isLoading, error } = useGetCartItemsQuery(undefined, {
      skip: !accessToken,   // ⬅ fetch only when token exists
    });
     // Calculate total items
    const totalCartItems = cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity,
      0) || 0;

      // ✅ DISPATCH INSIDE useEffect
  useEffect(() => {
    if (cart) {
      dispatch(
        updateCart(
          cart.cartItems,
          totalCartItems,
        )
      );
    }
  }, [cart, totalCartItems, dispatch]);

    if (isLoading) return <p>Loading...</p>;
    
   

    // if(cart){
    //   dispatch(updateCart(cart.cartItems,totalCartItems))
    // } 
    
      
    // const isSignupOpen=type==="signup";
    // const isLoginOpen=type==="login";
    const RegisterUi=<div className='w-34 flex justify-between'>
                        <button onClick={() => navigate("/login")} className='cursor-pointer hover:text-red-500'>Log in</button>
                        <button onClick={() =>navigate("/signup")} className='cursor-pointer hover:text-red-500'>Sign up</button>
                      </div> 
    const ProfileUi=<Profile/>
    const UserUi=isAuthenticated?ProfileUi:RegisterUi;

  return (
      <div className='h-16 flex justify-between items-center'>
        <Link className="font-sans text-2xl font-bold">BTS Services</Link>
        <div className="flex text-lg p-2">
          {/* <div className='flex justify-center items-center relative bg-amber-600'> */}
            {currentPath.startsWith("/food") && (
                // <div className="w-35 text-lg">
                    <Link to="/food/cart" className='w-32 flex justify-center items-center'>
                    <div className='flex relative justify-center items-center'>
                        <span className='text-sm px-0.5 z-1 border border-white rounded-3xl bg-red-600 w-5.5 h-5.5 text-center text-white absolute bottom-5 right-1'>{totalCartItems}</span>
                        <MdShoppingCart className='text-3xl'/>
                    </div>
                    <span className='font-bold bottom-1'>Cart</span>
                    </Link> 
                // </div>
            )}

          {UserUi}
          {/* {open && isSignupOpen && <Signup/>}
          {open && isLoginOpen && <Login/>} */}

        </div>
      </div>
  )
}

export default Navbar

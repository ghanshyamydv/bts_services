import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { openPopup} from "../redux/features/auth/popupSlice";
import { useSelector, useDispatch } from "react-redux";
import Signup from "../Services Page/Signup";
import Login from "../Services Page/Login";
import { MdShoppingCart } from "react-icons/md";
import Profile from './Profile';
function Navbar() {
    const location = useLocation(); // gives current URL path
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    const {open, type} = useSelector((state) => state.popup);
    const {isAuthenticated} = useSelector((state)=> state.auth);

    const isSignupOpen=type==="signup";
    const isLoginOpen=type==="login";
    const RegisterUi=<div className='w-34 flex justify-between'>
                        <button onClick={() => dispatch(openPopup("login"))} className='cursor-pointer hover:text-red-500'>Log in</button>
                        <button onClick={() => dispatch(openPopup("signup"))} className='cursor-pointer hover:text-red-500'>Sign up</button>
                      </div> 
    const ProfileUi=<Profile/>
    const UserUi=isAuthenticated?ProfileUi:RegisterUi;
  

  return (
      <div className='flex h-16 justify-between items-center'>
        <Link className="font-sans text-2xl font-bold">BTS Services</Link>
        <div className='flex w-[80%] justify-between items-center'>
            <div className='text-xl'>
              <Link to="/" className="hover:text-red-500">Orders</Link>
              <Link to="/delivered-orders" className="ml-4 hover:text-red-500">Delivered Orders</Link>
              {/* <Link to="/add-item" className="ml-4 hover:text-red-500">Add Item</Link> */}
            </div>
            <div className="flex text-lg p-2">
              {/* <div className='flex justify-center items-center relative bg-amber-600'> */}
                {currentPath.startsWith("/food") && (
                    // <div className="w-35 text-lg">
                        <Link to="cart" className='w-32 flex justify-center items-center'>
                        <div className='flex relative justify-center items-center'>
                            <span className='text-sm px-0.5 z-1 border border-white rounded-3xl bg-red-600 w-5.5 h-5.5 text-center text-white absolute bottom-5 right-1'>0</span>
                            <MdShoppingCart className='text-3xl'/>
                        </div>
                        <span className='font-bold bottom-1'>Cart</span>
                        </Link> 
                    // </div>
                )}

              {UserUi}
              {open && isSignupOpen && <Signup/>}
              {open && isLoginOpen && <Login/>}

            </div>
        </div>
      </div>
  )
}

export default Navbar

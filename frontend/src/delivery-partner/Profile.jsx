import { GrFormNext } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import {useLogoutUserMutation} from '../redux/features/auth/authApi';
import {logout} from "../redux/features/auth/authSlice"
function Profile() {
    // const [trigger, { data, isLoading, error }] = useLazyLogoutUserQuery();
    // console.log(data?.statusCode===200);
    // const [accessTokenTrigger, { data:accessTokenData, isLoading:accessTokenIsLoading, error:accessTokenError }] = useLazyGetAccessTokenQuery();
    // console.log(data?.statusCode===200);
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
      await logoutUser().unwrap();
      dispatch(logout());
    };

    
  return (
    <div className='relative z-100'>
      <div className='w-8 relative cursor-pointer flex justify-center items-center'>
        <div className='w-8 h-8 rounded-2xl overflow-hidden flex'>
        <img src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?cs=srgb&dl=pexels-bess-hamiti-83687-35537.jpg&fm=jpg"
        className='w-full object-center object-cover' alt="profile-pic" />
        </div>
        <GrFormNext className='rotate-90 w-4 h-4 bg-gray-500 text-white rounded-2xl absolute top-5 left-5'/>
      </div>
      <div className='bg-white rounded shadow-md border border-gray-200 w-40 p-2 absolute top-10 right-0'>
        <button>My Profile</button>
        <button>My Orders</button>
        <button>Reviews</button><br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile

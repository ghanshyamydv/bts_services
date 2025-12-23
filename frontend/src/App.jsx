import './App.css'
import RouterPage from './Services Page/RouterPage';
import ResRouterPage from './restaurant-dashboard/RouterPage';
import DeliveryRouterPage from "./delivery-partner/RouterPage";
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials, setSocket} from './redux/features/auth/authSlice';
import { useLazyGetAccessTokenQuery } from './redux/features/auth/authApi';

import {socket}from "./socket";
function App() {
  const dispatch = useDispatch();
  const [getAccessToken] = useLazyGetAccessTokenQuery();
  const {user}=useSelector((state)=>state.auth);
useEffect(() => {
  const verify = async () => {
    try {
      const res = await getAccessToken().unwrap();
      dispatch(setCredentials({
        accessToken: res.accessToken,
        user: res.user
      }));
    } catch (err) {
      dispatch(logout());
    }
  };

  verify();

}, [dispatch, getAccessToken]);

useEffect(() => {
  if (!user) return;
  socket.connect();
  socket.on("connect", () => {
      socket.emit("join-room", { category: user.category });
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
}, [user]);


if(user && user.category==="Restaurant Partner"){
  return <ResRouterPage/>
}else if(user && user.category==="Delivery Partner"){
  return <DeliveryRouterPage/>
}else{
  return <RouterPage/>
}
}

export default App

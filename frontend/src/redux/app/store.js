import { configureStore } from '@reduxjs/toolkit';
import popupReducer from "../features/auth/popupSlice";
import {foodApi} from "../features/food/foodApi";
import signupReducer from "../features/auth/signupSlice";
import loginReducer from "../features/auth/loginSlice";
import { authApi } from '../features/auth/authApi';
import authReducer from "../features/auth/authSlice";
import addItemReducer from '../restaurant-features/addItemSlice';
import { restaurantApi } from '../restaurant-features/restaurantApi';
// import { deliveryApi } from '../delivery-features/deliveryApi';
import cartReducer from "../features/food/cartSlice";
import orderReducer from "../features/food/orderSlice";
export const store = configureStore({
  reducer: {
    popup: popupReducer,
    signup: signupReducer,
    login:loginReducer,
    auth:authReducer,
    addItem:addItemReducer,
    cart:cartReducer,
    order:orderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    // [deliveryApi.reducerPath]: deliveryApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(foodApi.middleware)
        .concat(restaurantApi.middleware)
        // .concat(deliveryApi.middleware)
});
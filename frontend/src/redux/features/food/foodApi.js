import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth"; 

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: baseQueryWithReauth,
  tagTypes:["Cart"],
  endpoints: (builder) => ({
    
    addItemToCart: builder.mutation({
      query: (data) => ({
        url: "/food/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Cart"],
    }),

    updateCart: builder.mutation({
      query: (data) => ({
        url: "/food/update-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Cart"],
    }),

    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/food/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Cart"],
    }),

    getCartItems: builder.query({
      query: () => ({
        url: "/food/cart",
        method: "GET",
      }),
      providesTags:["Cart"],
    }),


    getRestaurants: builder.query({
      query: () => "/restaurants",
    }),
    getRestaurantDetails: builder.query({
      query: (id) => `/restaurants/${id}`,
    }),
    getItem: builder.query({
      query: (id) => `/food-item/${id}`,
    }),
    getRestaurantLocation: builder.query({
      query: (id) => `/food/restaurant-location/${id}`,
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/food/orders",
        method: "GET",
      }),
    }),
  }),
});

export const {
    useGetRestaurantsQuery,
    useGetRestaurantDetailsQuery,
    useGetItemQuery,
    useAddItemToCartMutation,
    useGetCartItemsQuery,
    useUpdateCartMutation,
    useGetRestaurantLocationQuery,
    usePlaceOrderMutation,
    useGetOrdersQuery,
} = foodApi;


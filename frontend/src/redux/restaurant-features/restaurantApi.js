import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../features/auth/baseQueryWithReauth";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order", "Item"],
  endpoints: (builder) => ({

    addItem: builder.mutation({
      query: (data) => ({
        url: "/restaurant/food-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    removeItem: builder.mutation({
      query: (data) => ({
        url: "/restaurant/food-item/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    getItem: builder.query({
      query: () => "/restaurant/food-item",
      providesTags: ["Item"]
    }),

    getOrders: builder.query({
      query: () => "/restaurant/orders",
      providesTags: ["Order"]
    }),

     getDeliveryOrders: builder.query({
      query: () => "/delivery/orders",
      providesTags: ["Order"]
    }),

    // ✅ Dynamic tag for one specific order
    getOrder: builder.query({
      query: (id) => `/restaurant/orders/${id}`,
      providesTags: ["Order"],
    }),

    // ✅ Only invalidates the updated order
    updateOrder: builder.mutation({
      query: (data) => ({
        url: "/restaurant/update-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

  }),
});

export const {
  useAddItemMutation,
  useGetItemQuery,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useGetDeliveryOrdersQuery,
  useRemoveItemMutation,
} = restaurantApi;


// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithReauth } from "../features/auth/baseQueryWithReauth"; 

// export const restaurantApi = createApi({
//   reducerPath: "restaurantApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes:["Order"],
//   endpoints: (builder) => ({
    
//     addItem: builder.mutation({
//       query: (data) => ({
//         url: "/restaurant/food-item",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     getItem: builder.query({
//       query: () => "/restaurant/food-item",
//     }),

//     getOrders: builder.query({
//       query: () => "/restaurant/orders",
//     }),

//     getOrder: builder.query({
//       query: (id) => `/restaurant/orders/${id}`,
//       providesTags:["Order"],
//     }),

//     updateOrder: builder.mutation({
//       query: (data) => ({
//         url: "/restaurant/update-order",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags:["Order"],
//     }),

//   }),
// });

// export const {
//   useAddItemMutation,
//   useGetItemQuery,
//   useGetOrdersQuery,
//   useGetOrderQuery,
//   useUpdateOrderMutation,
// } = restaurantApi;


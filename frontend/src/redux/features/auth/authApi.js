import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth"; // from previous setup

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    
    signupUser: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    getAccessToken: builder.query({
      query: () => "/refresh-token",
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetAccessTokenQuery,
  useLazyGetAccessTokenQuery,
  useLogoutUserMutation,
} = authApi;







































// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:4000/api',
//   credentials: 'include', // send cookies if any
// });

// const baseQueryWithStatus = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   // Attach status code to result
//   if (result.meta?.response) {
//     const statusCode = result.meta.response.status;

//     if (result.error) {
//       // error response
//       result.error.statusCode = statusCode;
//     } else {
//       // success response
//       result.data = { ...result.data, statusCode };
//     }
//   }

//   return result;
// };

// export const authApi=createApi({
//  reducerPath: 'autApi',
//   baseQuery: baseQueryWithStatus,
//     // tagTypes: ['User'],
//     endpoints:(builder)=>({
//         registerUser: builder.mutation({
//             query: (userData) => ({
//                 url: "/signup",
//                 method: "POST",
//                 body: userData, // send payload
//                  responseHandler: (response) => response.json().then(data => ({
//                                 data,
//                                 status: response.status
//                                 }))
//                 }),
//             // This will automatically refetch queries with 'User' tag
//             invalidatesTags: ['User'],
//         }),

//         getAccessToken: builder.query({
//         query: () => '/verifyToken',
//         // providesTags: ['User'],
//         }),

//         logoutUser: builder.query({
//         query: () => '/logout',
//         invalidatesTags: ['User'],
//         }),

//         updateUser: builder.mutation({
//             query: (userData) => ({
//                 url: "/update",
//                 method: "POST",
//                 body: userData, // send payload
//                 }),
//         }),
//         loginUser: builder.mutation({
//             query: (userData) => ({
//                 url: "/login",
//                 method: "POST",
//                 body: userData, // send payload
//                  responseHandler: (response) => response.json().then(data => ({
//                                 data,
//                                 status: response.status
//                                 }))
//                 }),
//             // This will automatically refetch queries with 'User' tag
//             invalidatesTags: ['User'],
//         }),
//         // Optional: If you want to get users
//         getUsers: builder.query({
//         query: () => '/users',
//         // providesTags: ['User'],
//         }),
//     }),
// })

// export const {useGetAccessTokenQuery, useLazyGetAccessTokenQuery, useRegisterUserMutation, useLoginUserMutation, useLazyLogoutUserQuery}=authApi;
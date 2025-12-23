import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../features/auth/baseQueryWithReauth";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    getOrders: builder.query({
      query: () => "/delivery/orders",
      providesTags: ["Order"],
    }),

    // ✅ Dynamic tag for one specific order
    getOrder: builder.query({
      query: (id) => `/delivery/orders/${id}`,
      providesTags: (result, error, id) => [
        { type: "Order", id }
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
} = deliveryApi;

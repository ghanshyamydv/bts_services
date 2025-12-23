import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateAccessToken, logout, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bts-services-gcq5.onrender.com/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Access token expired → 401
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);

    if (refreshResult.data?.accessToken) {
      // save new token
      api.dispatch(updateAccessToken(refreshResult.data.accessToken));

      // retry previous request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

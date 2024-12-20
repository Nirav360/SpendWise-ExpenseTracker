import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://spendwise-api-nlqh.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      // store the new token
      api.dispatch(setToken({ accessToken }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const commonApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Income", "Expense"],
  endpoints: () => ({}),
});

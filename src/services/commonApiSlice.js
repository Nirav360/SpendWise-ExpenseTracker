import { resetState, setToken } from "../slice/authSlice";
import { commonApi } from "./commonApi";

export const commonApiSlice = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "register",
        method: "POST",
        body: payload,
      }),
    }),

    login: builder.mutation({
      query: (payload) => ({
        url: "login",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetState());
          setTimeout(() => {
            dispatch(commonApi.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setToken({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getTransactions: builder.query({
      query: () => ({
        url: "getTransactions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetTransactionsQuery,
} = commonApiSlice;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    resetState: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, resetState } = authSlice.actions;
export const currentToken = (state) => state.auth.token;
export default authSlice.reducer;

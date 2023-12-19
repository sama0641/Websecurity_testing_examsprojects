import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
};

const Token = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.headers = {
        ...state.headers,
        "CSRF-Token": action.payload,
      };
    },
  },
});

export const { setToken } = Token.actions;

export default Token.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  post: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    Fetching(state, action) {
      state.loading = true;
    },
    Fetched(state, action) {
      state.loading = false;
      state.post = action.payload;
    },
  },
});

export const { Fetching, Fetched } = postSlice.actions;

export default postSlice.reducer;

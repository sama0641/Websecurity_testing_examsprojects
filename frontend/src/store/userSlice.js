import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    Logout(state, action) {
      state.isLoggedIn = false;
      state.user = {};
    },
    UpdateUser(state, action) {
      state.user = action.payload;
    },
    savePost(state, action) {
      const user = state.user;
      const targetPostId = action.payload;
      if (user.savedArticles.includes(action.payload)) {
        state.user.savedArticles = user.savedArticles.filter(
          (postId) => postId != targetPostId
        );
      } else {
        state.user.savedArticles.push(targetPostId);
      }
    },
  },
});

export const { Login, UpdateUser, Logout, savePost } = userSlice.actions;

export default userSlice.reducer;

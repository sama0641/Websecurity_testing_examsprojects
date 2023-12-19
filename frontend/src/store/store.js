import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import articlesReducer from "./allarticles";
import tokenReducer from "./csrfToken";
// import postsReducer from "./postsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    allArticles: articlesReducer,
    token: tokenReducer,
  },
});

export default store;

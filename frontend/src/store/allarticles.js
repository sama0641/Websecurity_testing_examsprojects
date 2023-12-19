import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allArticles: [],
  loading: false,
};

const allArticlesSlice = createSlice({
  name: "allArticles",
  initialState,
  reducers: {
    StartLoading(state) {
      state.loading = true;
    },
    CloseLoading(state) {
      state.loading = false;
    },
    Fetched(state, action) {
      state.loading = false;
      state.allArticles = action.payload;
    },
    AddArticle(state, action) {
      const newTopic = action.payload;
      state.allArticles.push(newTopic);
    },
  },
});

export const { StartLoading, Fetched, AddArticle, CloseLoading } =
  allArticlesSlice.actions;

export default allArticlesSlice.reducer;

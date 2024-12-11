import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const getPostsSlice = createSlice({
  name: "getPosts",
  initialState: {
    fetching: false,
    error: false,
    success: false,
    succefulMessage: "",
    posts: [] as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.getPosts.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      apis.getPosts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.success = true;
        state.posts = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.getPosts.rejected,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.error = true;
        state.succefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default getPostsSlice.reducer;

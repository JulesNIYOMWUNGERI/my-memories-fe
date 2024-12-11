import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const getPostSlice = createSlice({
  name: "getPost",
  initialState: {
    fetching: false,
    error: false,
    success: false,
    succefulMessage: "",
    post: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.getPost.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      apis.getPost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.success = true;
        state.post = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.getPost.rejected,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.error = true;
        state.succefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default getPostSlice.reducer;

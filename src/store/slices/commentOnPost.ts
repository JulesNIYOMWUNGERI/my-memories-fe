import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const commentPostSlice = createSlice({
  name: "commentPost",
  initialState: {
    commenting: false,
    error: false,
    success: false,
    successfulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.commentPost.pending, (state) => {
      state.commenting = true;
    });
    builder.addCase(
      apis.commentPost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.commenting = false;
        state.success = true;
        state.successfulMessage = "Updated successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.commentPost.rejected,
      (state, action: PayloadAction<any>) => {
        state.commenting = false;
        state.error = true;
        state.successfulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.commenting = false;
      state.error = false;
      state.success = false;
      state.successfulMessage = "";
      state.data = {} as any;
    });
  },
});

export default commentPostSlice.reducer;

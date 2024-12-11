import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const deletePostSlice = createSlice({
  name: "deletePost",
  initialState: {
    deleting: false,
    error: false,
    success: false,
    successfulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.deletePost.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(
      apis.deletePost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.success = true;
        state.successfulMessage = "Deleted successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.deletePost.rejected,
      (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.error = true;
        state.successfulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.deleting = false;
      state.error = false;
      state.success = false;
      state.successfulMessage = "";
      state.data = {} as any;
    });
  },
});

export default deletePostSlice.reducer;

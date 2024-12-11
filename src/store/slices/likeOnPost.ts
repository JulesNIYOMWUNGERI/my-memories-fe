import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const likePostSlice = createSlice({
  name: "likePost",
  initialState: {
    liking: false,
    error: false,
    success: false,
    successfulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.likePost.pending, (state) => {
      state.liking = true;
    });
    builder.addCase(
      apis.likePost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.liking = false;
        state.success = true;
        state.successfulMessage = "Updated successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.likePost.rejected,
      (state, action: PayloadAction<any>) => {
        state.liking = false;
        state.error = true;
        state.successfulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.liking = false;
      state.error = false;
      state.success = false;
      state.successfulMessage = "";
      state.data = {} as any;
    });
  },
});

export default likePostSlice.reducer;

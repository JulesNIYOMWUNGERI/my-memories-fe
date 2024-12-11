import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const updatePostSlice = createSlice({
  name: "updatePost",
  initialState: {
    updating: false,
    error: false,
    success: false,
    succefulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.updatePost.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(
      apis.updatePost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.updating = false;
        state.success = true;
        state.succefulMessage = "Updated successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.updatePost.rejected,
      (state, action: PayloadAction<any>) => {
        state.updating = false;
        state.error = true;
        state.succefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.updating = false;
      state.error = false;
      state.success = false;
      state.succefulMessage = "";
      state.data = {} as any;
    });
  },
});

export default updatePostSlice.reducer;

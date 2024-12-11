import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const addPostSlice = createSlice({
  name: "createPost",
  initialState: {
    saving: false,
    error: false,
    success: false,
    savedSuccefulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.createPost.pending, (state) => {
      state.saving = true;
    });
    builder.addCase(
      apis.createPost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.saving = false;
        state.success = true;
        state.savedSuccefulMessage = "Created successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.createPost.rejected,
      (state, action: PayloadAction<any>) => {
        state.saving = false;
        state.error = true;
        state.savedSuccefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.saving = false;
      state.error = false;
      state.success = false;
      state.savedSuccefulMessage = "";
      state.data = {} as any;
    });
  },
});

export default addPostSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const getCommentsSlice = createSlice({
  name: "getComments",
  initialState: {
    fetching: false,
    error: false,
    success: false,
    succefulMessage: "",
    comments: [] as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.getComments.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      apis.getComments.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.success = true;
        state.comments = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.getComments.rejected,
      (state, action: PayloadAction<any>) => {
        state.fetching = false;
        state.error = true;
        state.succefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default getCommentsSlice.reducer;

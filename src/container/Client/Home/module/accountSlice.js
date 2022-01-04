import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../../../../apis/callApi";
const objAccount = JSON.parse(localStorage.getItem("userInfor2"));
const initialState = {
  account: objAccount ? objAccount : {},
};

export const changeAsyncUserAccount = createAsyncThunk(
  "user/changeAccount",
  async (data) => {
    const res = await callApi(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      "PUT",
      data.body,
      data.token
    );
    if (res?.status === 200) {
      return {
        status: res.status,
        data: res.data,
        message: "Change User Successly",
      };
    } else {
      return res.response.data;
    }
  }
);
export const accountSlice = createSlice({
  name: "accountList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeAsyncUserAccount.fulfilled, (state, { payload }) => {
      state.account = payload.data;
      localStorage.setItem("userInfo2", JSON.stringify(payload.data));
    });
  },
});
export const selectMovieList = (state) => state.accountSlice.account;
export default accountSlice.reducer;

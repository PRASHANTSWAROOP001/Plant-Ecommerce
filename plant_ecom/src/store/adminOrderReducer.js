import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/configedAxios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk("/order/getAllOrdersForAdmin", async () => {
  const response = await axios.get(`/api/admin/order/get`);
  console.log("getAllOrdersForAdmin", response.data);
  return response.data;
});

export const getOrderDetailsForAdmin = createAsyncThunk("/admin/getOrderDetailsForAdmin", async (id) => {
  const response = await axios.get(`/api/admin/order/details/${id}`);
  console.log("getOrderDetailsForAdmin", response.data);
  return response.data;
});

export const updateOrderStatus = createAsyncThunk("/admin/updateOrderStatus", async ({ id, orderStatus }) => {
  const response = await axios.put(`/api/admin/order/update/${id}`, { orderStatus });
  console.log("updateOrderStatus", response.data);
  return response.data;
});

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetAdminOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetAdminOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
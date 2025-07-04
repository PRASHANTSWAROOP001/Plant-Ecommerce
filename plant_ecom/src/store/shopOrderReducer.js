import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/configedAxios";

const initialState = {
    approvalURL:null,
    isLoading:false,
    orderId:null,
    orderList:[],
    orderDetails:null

}


export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder", async ({userId, addressId, paymentMethod="PayPal"}) => {

        const response = await axios.post(`/api/shop/order/create`, {userId, addressId, paymentMethod})

        return response.data;
        
    }
)


export const capturePayment = createAsyncThunk(
    "/order/capturePayment", async ({paymentId, payerId}) => {

        const response = await axios.post(`/api/shop/order/capture`, {paymentId, payerId })

        return response.data;
        
    }
)


export const getAllOrdersByUserId = createAsyncThunk("/order/getAllOrdersByUserId ", async (userId) => {
    
    const response = await axios.get(`/api/shop/order/list/${userId}`);
    console.log("getAllOrdersByUserId", response.data);
    return response.data;

})

export const getOrderDetails = createAsyncThunk("/order/getOrderDetails", async (id) => {
    
    const response = await axios.get(`api/shop/order/details/${id}`);
    console.log("getOrderDetails", response.data);
    return response.data;

})

const shoppingOrderSlice = createSlice({
    name:"shoppingOrderSlice",
    initialState,
    reducers:{
        resetOrderDetails: (state)=>{
            state.orderDetails = null;
        }
    },
    extraReducers: (builder)=>{

        builder.addCase(createNewOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled, (state, action)=>{
            state.isLoading = false
            state.approvalURL = action.payload.approvalUrl
            state.orderId = action.payload.orderId
        })
        .addCase(createNewOrder.rejected, (state,action)=>{
            state.isLoading = false
            state.approvalURL = null
            state.orderId = null
        })
        .addCase(getAllOrdersByUserId.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllOrdersByUserId.fulfilled, (state,action)=>{
            state.isLoading = false
            state.orderList = action.payload.data
        })
        .addCase(getAllOrdersByUserId.rejected, (state,action)=>{
            state.isLoading = false
            state.orderList = []
        })
        .addCase(getOrderDetails.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getOrderDetails.fulfilled, (state, action)=>{
            state.isLoading = false
            state.orderDetails = action.payload.data
        })
        .addCase(getOrderDetails.rejected, (state, action)=>{
            state.isLoading = false
            state.orderDetails = null
        })
    }
})

export const {resetOrderDetails} = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
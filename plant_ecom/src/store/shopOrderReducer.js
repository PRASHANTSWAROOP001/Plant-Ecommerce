import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL:null,
    isLoading:false,
    orderId:null
}


export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder", async ({userId, addressId, paymentMethod="PayPal"}) => {

        const response = await axios.post(`http://localhost:5000/api/shop/order/create`, {userId, addressId, paymentMethod})

        return response.data;
        
    }
)


export const capturePayment = createAsyncThunk(
    "/order/capturePayment", async ({paymentId, payerId}) => {

        const response = await axios.post(`http://localhost:5000/api/shop/order/capture`, {paymentId, payerId })

        return response.data;
        
    }
)


const shoppingOrderSlice = createSlice({
    name:"shoppingOrderSlice",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{

        builder.addCase(createNewOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled, (state, action)=>{
            state.isLoading = false
            state.approvalURL = action.payload.approvalUrl
            state.orderId = action.payload.orderId
            sessionStorage.setItem("currentOrderId", action.payload.orderId);
        })
        .addCase(createNewOrder.rejected, (state,action)=>{
            state.isLoading = false
            state.approvalURL = null
            state.orderId = null
        })
    }
})

export default shoppingOrderSlice.reducer;
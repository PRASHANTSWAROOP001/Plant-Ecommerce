import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/configedAxios";


const initialState ={
    isLoading:false,
    addressList:[]
} 



export const addNewAddress = createAsyncThunk("/address/addNewAddress", async(formData)=>{
    console.log(formData, "formData")
    const response = await axios.post("/api/shop/address/add", formData)
    return response.data;
})

export const fetchAddress = createAsyncThunk("/address/fetchAddress" , async (userId) => {
    // console.log(userId)
    const response = await axios.get(`/api/shop/address/get/${userId}`)
    console.log(response.data)
    return response.data;    
})

export const deleteAddress = createAsyncThunk("/address/deleteAddress", async({userId, addressId})=>{
    const response = await axios.delete(`/api/shop/address/delete/${userId}/${addressId}`)
    return response.data;
})

export const editAddress = createAsyncThunk("/address/editAddress", async({userId, addressId, formData})=>{
    const response = await axios.put(`/api/shop/address/update/${userId}/${addressId}`, formData)

    return response.data;
})




const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

        builder.addCase(addNewAddress.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(addNewAddress.fulfilled, (state, action)=>{
            state.isLoading = false
            state.addressList = action.payload.data

        })
        .addCase(addNewAddress.rejected, (state)=>{
            state.isLoading = false
            state.addressList = []
        })
        .addCase(fetchAddress.pending, (state,action)=>{
            state.isLoading = true
        })
        .addCase(fetchAddress.fulfilled, (state, action)=>{
            state.isLoading = false
            state.addressList = action.payload?.data
        })
        .addCase(fetchAddress.rejected, (state, action)=>{
            state.isLoading = false
            state.addressList = []
        })
        .addCase(deleteAddress.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteAddress.fulfilled, (state)=>{
            state.isLoading= false
        })
        .addCase(deleteAddress.rejected, (state)=>{
            state.isLoading = false
        })
        .addCase(editAddress.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(editAddress.fulfilled, (state)=>{
            state.isLoading = false
        })
        .addCase(editAddress.rejected, (state)=>{
            state.isLoading = false
        })
    }
}) 


export default  addressSlice.reducer
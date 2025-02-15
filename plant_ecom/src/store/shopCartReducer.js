import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: []
};

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/shop/cart/add`, {
            userId,
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error at addToCart async thunk", error);
        throw error;
    }
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
        console.log("fetch cart response.data value",response.data);
        return response.data;
    } catch (error) {
        console.error("Error happened at fetchCart async thunk", error);
        throw error;
    }
});

export const updateCartItemsQuantity = createAsyncThunk("cart/updateCartItems", async ({ userId, productId, quantity }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/shop/cart/update-cart`, {
            userId,
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error happened at the updateCart async thunk", error);
        throw error;
    }
});

export const deleteCartItems = createAsyncThunk("cart/deleteCartItems", async ({ userId, productId }) => {
    try {
        console.log("userid,productid", userId,productId )
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error happened at the deleteCartItems", error);
        throw error;
    }
});

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data?.items;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCartItemsQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItemsQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.cartItems.findIndex(item => item.productId === action.payload.productId);
                if (index !== -1) {
                    state.cartItems[index].quantity = action.payload.quantity;
                }
            })
            .addCase(updateCartItemsQuantity.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data?.items;
            })
            .addCase(deleteCartItems.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shoppingCartSlice.reducer;
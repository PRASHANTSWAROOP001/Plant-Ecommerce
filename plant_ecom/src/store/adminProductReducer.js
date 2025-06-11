import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/configedAxios";

// Initial state
const initialState = {
  isLoading: false,
  productList: [],
  error: null
};

// Fetch All Products Thunk
export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get("/api/admin/get");
      console.log("fetched data response: ", result.data)
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

// Add Product Thunk
export const addProduct = createAsyncThunk(
  "admin/addProducts", 
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "/api/admin/add", 
        formData, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      //console.log("result data print",result.data)
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  }
);

// Delete Product Thunk
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct', 
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `/api/admin/delete/${id}`, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);


export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/edit/${id}`, // Corrected endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data; // Ensure this returns the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit product");
    }
  }
);


// Admin Product Slice
const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All Products Cases
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload?.data;
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Add Product Cases
    .addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList.push(action.payload?.product);
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete Product Cases
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      //console.log("action.payload", action.payload);
      state.isLoading = false;
      state.productList = state.productList.filter(
        product => product._id !== action.meta.arg
      );
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

export default adminProductSlice.reducer;
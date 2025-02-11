import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productList:[],
    productDetails:null,
}


export const fetchAllFilteredProdcuts = createAsyncThunk(
    "admin/fetchAllProduct",
    async ({category, brand,sort}, { rejectWithValue }) => {


      const queryParams = new URLSearchParams();

      if (category?.length > 0) {
          queryParams.set("category", category);  // Sends "category=Electronics,Mobiles"
      }

      if (brand?.length > 0) {
          queryParams.set("brand", brand);  // Sends "brand=Apple,Samsung"
      }

      if (sort) {
          queryParams.set("sortBy", sort);
      }

      try {
        let url = `http://localhost:5000/api/shop/product/get?${queryParams.toString()}`
        console.log(url)
        const result = await axios.get(url);
        console.log("fetched data response: ", result.data)
        return result?.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
      }
    }
);


const shopProductSlice = createSlice({
    name:"shoppingProduct",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProdcuts.pending, (state,action)=>{
          state.isLoading = true;

        })
        .addCase(fetchAllFilteredProdcuts.fulfilled, (state,action)=>{
          console.log(action.payload);
          state.isLoading = false;
          state.productList = action.payload?.data;
        })
        .addCase(fetchAllFilteredProdcuts.rejected, (state,action)=>{
          state.isLoading = false;
          state.productList = []
        })
    }
})


export default shopProductSlice.reducer;
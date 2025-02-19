import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
}


export const fetchAllFilteredProdcuts = createAsyncThunk(
  "shop/fetchAllProduct",
  async ({ category, brand, sort }, { rejectWithValue }) => {


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
      //console.log(url)
      const result = await axios.get(url);
      //console.log("fetched data response: ", result.data)
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);


export const fetchProdctDetails = createAsyncThunk(
  "shop/fetchProductDetails", async (id) => {

    console.log("id at store", id)

    try {
      const result = await axios.get(`http://localhost:5000/api/shop/product/get/${id}`)

      console.log(result?.data)
      return result?.data

    } catch (error) {

      console.error("Error happend at shopProductStore: ", error)

    }

  }
);


const shopProductSlice = createSlice({
  name: "shoppingProduct",
  initialState: initialState,
  reducers: { setProductDetails: (state, action)=>{
    state.productDetails = null;
  }},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProdcuts.pending, (state, action) => {
      state.isLoading = true;

    })
      .addCase(fetchAllFilteredProdcuts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload?.data;
      })
      .addCase(fetchAllFilteredProdcuts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = []
      })
      .addCase(fetchProdctDetails.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(fetchProdctDetails.fulfilled, (state, action)=>{
        state.isLoading= false
        state.productDetails = action.payload?.data
      })
      .addCase(fetchProdctDetails.rejected, (state, action)=>{
        state.isLoading = false
        state.productDetails = null
      })
  }
})


export const {setProductDetails}  = shopProductSlice.actions

export default shopProductSlice.reducer;
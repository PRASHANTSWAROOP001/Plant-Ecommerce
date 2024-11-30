import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    user: null,
    isAuthenticated: false
};

export const registerUser = createAsyncThunk("/auth/registerUser",
    async(FormData) => {
        const response = await axios.post("http://localhost:5000/api/auth/register", FormData, {
            withCredentials: true
        });

        return response.data;
    }
);

export const checkAuth = createAsyncThunk("/auth/verifyUser",

    async()=>{
        const response = await axios.get("http://localhost:5000/api/auth/verifyUser", {
            withCredentials:true,
            headers: {
                'Cache-Control':  'no-store, no-cache, must-revalidate, proxy-revalidate',
            }
        });
        return response.data;
    }
)

export const loginUser = createAsyncThunk("/auth/login", 
    async(FormData) => {
        const response = await axios.post("http://localhost:5000/api/auth/login", FormData, {
            withCredentials: true,
        });

        return response.data;
    }
);

export const logoutUser = createAsyncThunk("/auth/logout", 
    async() => {
        const responce = await axios.post("http://localhost:5000/api/auth/logout", {}, {
            withCredentials: true,
        })

        return responce.data;
    }
)



export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    // Removed extra comma here
    extraReducers: (builder) => {

        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });

        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success ? true : false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            });

            builder.addCase(checkAuth.pending, (state)=>{
                state.isAuthenticated=false,
                state.user = null,
                state.isLoading=true
            })
            .addCase(checkAuth.rejected,(state)=>{
                state.isAuthenticated=false,
                state.user=null,
                state.isLoading =true
            })
            .addCase(checkAuth.fulfilled,(state, action)=>{
                state.isLoading=true,
                state.isAuthenticated = action.payload.success ? true : false,
                state.user = action.payload.success ? action.payload.user : null
            })

            builder.addCase(logoutUser.fulfilled, (state)=>{
                state.isLoading = false,
                state.isAuthenticated = null,
                state.user = null
            })
    }
});

// Export actions and reducer
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
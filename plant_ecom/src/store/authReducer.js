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

export const loginUser = createAsyncThunk("/auth/login", 
    async(FormData) => {
        const response = await axios.post("http://localhost:5000/api/auth/login", FormData, {
            withCredentials: true,
        });

        return response.data;
    }
);



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
    }
});

// Export actions and reducer
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
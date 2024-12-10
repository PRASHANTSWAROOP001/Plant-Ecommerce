import {configureStore} from "@reduxjs/toolkit"

import  authSlice  from "./authReducer"
import AdminProductReducer from "./adminProductReducer"


const store = configureStore({
    reducer:{
        auth:authSlice,
        adminProduct:AdminProductReducer
    }
})


export default store
import {configureStore} from "@reduxjs/toolkit"

import  authSlice  from "./authReducer"
import AdminProductReducer from "./adminProductReducer"
import shopProductReducer from "./shopProductReducer"

const store = configureStore({
    reducer:{
        auth:authSlice,
        adminProduct:AdminProductReducer,
        shopProduct: shopProductReducer,
    }
})


export default store
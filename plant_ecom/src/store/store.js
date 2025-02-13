import {configureStore} from "@reduxjs/toolkit"

import  authSlice  from "./authReducer"
import AdminProductReducer from "./adminProductReducer"
import shopProductReducer from "./shopProductReducer"
import shopCartReducer from "./shopCartReducer"

const store = configureStore({
    reducer:{
        auth:authSlice,
        adminProduct:AdminProductReducer,
        shopProduct: shopProductReducer,
        shopCart: shopCartReducer
    }
})


export default store
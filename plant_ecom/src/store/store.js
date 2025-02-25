import {configureStore} from "@reduxjs/toolkit"

import  authSlice  from "./authReducer"
import AdminProductReducer from "./adminProductReducer"
import shopProductReducer from "./shopProductReducer"
import shopCartReducer from "./shopCartReducer"
import shopAddressReducer from "./shopAddressReducer"
import shopOrderReducer from "./shopOrderReducer"
import AdminOrderReducer from "./adminOrderReducer"

const store = configureStore({
    reducer:{
        auth:authSlice,
        adminProduct:AdminProductReducer,
        shopProduct: shopProductReducer,
        shopCart: shopCartReducer,
        shopAddress: shopAddressReducer,
        shopOrder: shopOrderReducer,
        adminOrder: AdminOrderReducer
    }
})


export default store
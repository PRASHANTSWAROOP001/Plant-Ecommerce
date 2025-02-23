const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId:String,
    cartItem:[
        {
            productId:String,
            name:String,
            image:String,
            price:Number,
            sellPrice:Number

        }
    ],
    addressInfo:{
        addressId:String,
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String
    },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    totalAmount:Number,
    orderDate:Date,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String

})

module.exports = mongoose.model("Order", orderSchema);

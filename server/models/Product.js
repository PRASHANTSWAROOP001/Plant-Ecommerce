const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    scientificName:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },

    category:{
        type:String,
        enum:["indoor", "outdoor", "succulents", "flowering"],
        required:true
    },
    careLevel:{
        type:String,
        enum:["easy", "moderate ", "advanced"],
        required:true
    },

    lightRequirement:{
        type:String,
        enum:["low","medium","high"],
        required:true
    },

    stock:{

        type:Number,
        required:true
    },

    imageUrl:{
        type:[String] // array of strings for  multiple data photos.
    },
},
{collection:"product",
    timestamps: true}
)

const Product = new mongoose.model("Product",productSchema,"product");
module.exports = {Product}
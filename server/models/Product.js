const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["indoor", "outdoor", "succulents", "flowering"],
      required: true,
    },
    careLevel: {
      type: String,
      enum: ["easy", "moderate", "advanced"], // Removed trailing space
      required: true,
    },
    lightRequirement: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Ensures stock can't be negative
    },
    price: {
      type: Number, // Changed to Number for monetary precision
      required: true,
      min: 0, // Price can't be negative
    },
    sellPrice: {
      type: Number, // Changed to Number
      required: true,
      min: 0,
    },
    imageUrl: {
      type: [String], // Array of image URLs
      default: [], // Default to an empty array if no images provided
    },
  },
  {
    collection: "product",
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

function ShopTile({ product, handleGetProductDetails, handleAddToCart }) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-56 object-cover rounded-t-lg cursor-pointer"
          onClick={() => handleGetProductDetails(product?._id)}
        />
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-gray-900 text-lg font-medium">
            Price <span className="line-through">${product.price}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          ${product.sellPrice.toFixed(2)}
        </span>
        <button
          onClick={() => handleAddToCart(product?._id)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  );
}

export default ShopTile;

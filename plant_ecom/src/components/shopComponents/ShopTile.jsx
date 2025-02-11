import React from "react";

function ShopTile({ product }) {
  return (
    <div
      key={product._id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">

        <div className="mt-2 flex items-center justify-between">

        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-900 text-lg font-medium  "> Price <span className="line-through"> ${product.price}</span> </p>

        </div>
    
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 ">
            ${product.sellPrice.toFixed(2)}
          </span>
       
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopTile;

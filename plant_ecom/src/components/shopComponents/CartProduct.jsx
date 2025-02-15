import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartProduct = ({ cartItem, onIncrease, onDecrease, onDelete }) => {

  return (
    <div className="flex items-center space-x-4 py-4 border-b last:border-b-0 w-full">
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <img src={cartItem?.imageUrl[0] || "/placeholder.svg"} alt={cartItem?.name} layout="fill" objectFit="cover" />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{cartItem.name}</h3>
        <p className="text-sm text-gray-500">${cartItem.sellPrice.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <Button variant="outline" size="icon" onClick={onDecrease} disabled={cartItem.quantity === 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-2 font-semibold">{cartItem.quantity}</span>
          <Button variant="outline" size="icon" onClick={onIncrease}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="font-semibold">${(cartItem.sellPrice * cartItem.quantity).toFixed(2)}</span>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

};

export default CartProduct;

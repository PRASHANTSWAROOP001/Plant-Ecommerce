import React from "react";
import { SheetContent, SheetTitle, SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import CartProduct from "./CartProduct";

function CartWrapper({ cartItems }) {
  let amount = cartItems && cartItems.length > 0 
  ? cartItems.reduce((sum, cartItem) => { 
      return sum + (Math.min(cartItem.sellPrice, cartItem.price) * cartItem.quantity); 
    }, 0) 
  : 0;

  console.log(cartItems);
  return (
    <SheetContent className="flex flex-col h-full">
      {/* Header (Fixed at Top) */}
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto pr-4 scrollbar">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
        
            <CartProduct
              imageUrl={
                Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl
              } // Ensure it's an array
              name={item.name}
              price={item.price}
              sellPrice={item.sellPrice}
              key={item?.productId}
              productId={item.productId}
              quantity={item.quantity}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Total + Checkout (Fixed at Bottom) */}
      <div className="p-4 border-t">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${amount}</span>
        </div>
        <Button className="w-full mt-4">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default CartWrapper;

import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCartItems, fetchCart, updateCartItemsQuantity } from "@/store/shopCartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const CartProduct = ({imageUrl, name, quantity, price, sellPrice, productId}) => {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.auth);

  const {toast} = useToast()

  async function onDelete(){
    const response = await dispatch(deleteCartItems({ userId:user.id, productId:productId}))
    if(response.payload?.success){
      toast({
        title:"Product Deleted Successfully."
      })
    }

    //console.log(response);
  }


  async function handleCartQuantity({productId, action}){

  const response = await dispatch(updateCartItemsQuantity({ userId:user.id, productId:productId, quantity: action === "plus" ? quantity+1 : quantity-1 }))
  if (response.payload?.success){
    toast({
      title:"Quantity Updated"
    })
    dispatch(fetchCart(user.id))
  }

  }



  return (
    <div className="flex items-center space-x-4 py-4 border-b last:border-b-0 w-full">
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">${sellPrice.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <Button variant="outline" size="icon" onClick={()=>handleCartQuantity({productId, action:"minus"})} disabled={quantity === 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-2 font-semibold">{quantity}</span>
          <Button variant="outline" size="icon" onClick={()=>handleCartQuantity({productId, action:"plus"})}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="font-semibold">${(sellPrice * quantity).toFixed(2)}</span>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

};

export default CartProduct;

import React from 'react'
import leafPhoto from "/leaf photos.jpg"
import { useSelector, useDispatch } from 'react-redux'
import AddressCard from '@/components/shopComponents/AddressCard'
import CartProduct from '@/components/shopComponents/CartProduct'
import { Button } from '@/components/ui/button'


import { useToast } from '@/hooks/use-toast'

import { createNewOrder } from '@/store/shopOrderReducer'

function Checkout() {
  const {cartItems} = useSelector((state)=>state.shopCart)
  const {user} = useSelector((state)=>state.auth)
  const {approvalURL} = useSelector((state)=>state.shopOrder);


  const [isPaymentStart, setIsPaymentStart] = React.useState(false)

  const dispatch = useDispatch();

const {toast} = useToast();

  const [currentAddressId, setCurrentAddressId] = React.useState(null);


  let amount = cartItems && cartItems.length > 0 
  ? cartItems.reduce((sum, cartItem) => { 
      return sum + (Math.min(cartItem.sellPrice, cartItem.price) * cartItem.quantity); 
    }, 0) 
  : 0;4

  console.log("currentAddress selected: ", currentAddressId)


  function handlePaypalPayment(){

    if(currentAddressId == null){

      toast({
        title:"Please select one address. Click on One Address.",
        variant:"destructive"
      })
    }

    dispatch(createNewOrder({userId:user.id, addressId:currentAddressId, paymenMethod:"PayPal"})).then((data)=>{
      if(data.pyaload?.success){
        setIsPaymentStart(true);
      }else{
        setIsPaymentStart(false)
      }
    })

  }

  if (approvalURL){
    window.location.href = approvalURL;
  }


  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={leafPhoto} alt="leafImageBackground" className='w-full h-full object-cover object-center' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>

        <AddressCard setCurrentAddressId={setCurrentAddressId}></AddressCard>

          <div className='flex flex-col gap-5'>


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

<div className="p-4 ">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${amount}</span>
                  </div>
                  <Button onClick = {handlePaypalPayment}  className="w-full mt-4">Checkout With Paypal</Button>
                </div>

          </div>

          

      </div>

    </div>
  )
}

export default Checkout
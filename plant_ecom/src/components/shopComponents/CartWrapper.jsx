import React from 'react'
import { SheetContent, SheetTitle, SheetHeader } from '../ui/sheet'
import { Button } from '../ui/button'

function CartWrapper() {
  return (
    <SheetContent>

        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className='mt-8 space-y-4'>
            {/* Cart Items */}

        </div>

        <div className='mt-8 space-y-4'>

            <div className='flex  justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>Amount $ </span>
            </div>

        </div>

        <Button className='w-full mt-6'>Checkout</Button>

    </SheetContent>
  )
}

export default CartWrapper
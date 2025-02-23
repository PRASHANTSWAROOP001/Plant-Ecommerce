import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'


function ShoppingOrderDetails() {
  return (
    <DialogContent className='sm:max-w-[600px]'>
    <div className='grid gap-6'>
        <div className='grid gap-2'>
            <div className='flex mt-6 items-center justify-between'>
                <p className='font-medium'>Order Id</p>
                <Label>123456</Label>
            </div>
            <div className='flex mt-6 items-center justify-between'>
                <p className='font-medium'>Order Date</p>
                <Label>27/12/2025</Label>
            </div>
            <div className='flex mt-6 items-center justify-between'>
                <p className='font-medium'>Order Status</p>
                <Label>Pending</Label>
            </div>
            <div className='flex mt-6 items-center justify-between'>
                <p className='font-medium'>Order Prie</p>
                <Label>100 $</Label>
            </div>
            <Separator></Separator>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='font-medium'>Order Details</div>
                <ul className='grid gap-3'>
                  <li className='flex items-center justify-between'>
                    <span>Product One</span>
                    <span>30$</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='font-medium'>Shipping Information</div>
                <div className='grid gap-0.5 text-muted-foreground'>
                  <span>Jhon</span>
                  <span>Address</span>
                  <span>City</span>
                  <span>Pincode</span>
                  <span>Phone</span>
                  <span>Notes</span>
                </div>
              </div>
            </div>
        </div>
    </div>
</DialogContent>
  )
}

export default ShoppingOrderDetails
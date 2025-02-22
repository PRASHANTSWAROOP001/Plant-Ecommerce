import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCardData({ addressData, handleDeleteAddress, handleEditAddress }) {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-4">
          <div className="flex items-center">
            <Label className="font-semibold text-gray-700">Address:</Label>
            <span className="ml-2 text-gray-600">{addressData?.address}</span>
          </div>
          <div className="flex items-center">
            <Label className="font-semibold text-gray-700">City:</Label>
            <span className="ml-2 text-gray-600">{addressData?.city}</span>
          </div>
          <div className="flex items-center">
            <Label className="font-semibold text-gray-700">Phone:</Label>
            <span className="ml-2 text-gray-600">{addressData?.phone}</span>
          </div>
          <div className="flex items-center">
            <Label className="font-semibold text-gray-700">Pincode:</Label>
            <span className="ml-2 text-gray-600">{addressData?.pincode}</span>
          </div>
          <div className="flex items-center">
            <Label className="font-semibold text-gray-700">Notes:</Label>
            <span className="ml-2 text-gray-600">{addressData?.notes}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>

        <Button onClick={()=>handleEditAddress(addressData)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressData?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCardData
import React, { useEffect } from 'react'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from '../ui/card'

import CommonForm from '../common/CommonForm'

import { addAddressFormElements} from "../../config/index"
import { useDispatch, useSelector} from 'react-redux'
import { useToast } from '@/hooks/use-toast'


import {addNewAddress,deleteAddress, editAddress, fetchAddress} from "../../store/shopAddressReducer"
import AddressCardData from './AddressCardData'

const initialAddress = {
    address:"",
    city:"",
    phone:"",
    pincode:"",
    notes:""
}



function AddressCard({setCurrentAddressId}) {

    const [formData, setFormData] = useState(initialAddress);
    const [currentEditId, setCurrentEditId] = useState(null)
    const dispatch = useDispatch()
    const {toast} = useToast()

    const {user} = useSelector((state)=>(state.auth))
    const {addressList}   = useSelector((state)=>(state.shopAddress))

    const handleManageAddress =(e)=>{
        e.preventDefault()
        if(addressList && addressList.length >= 3){
            toast({
                title:"Can't Have More Than 3 Addresses",
                variant:"destructive"
            })
            setFormData(initialAddress);
            return;
        }
        else if(currentEditId != null){
            dispatch(editAddress({
                userId:user.id,
                addressId: currentEditId,
                formData
            }))
            .then((data)=>{
                if(data.payload?.success){
                    toast({
                        title:"Address Edited Successfully"
                    })
                    dispatch(fetchAddress(user.id))
                    setCurrentEditId(null)
                    setFormData(initialAddress)
                }
            })
        }
        else{

            dispatch(addNewAddress({
                ...formData,
                userId:user.id
            }))
            .then((data)=>{
    
                if(data.payload?.success){
                    
                    toast({
                        title:"Address added successfully"
                    })
    
                    setFormData(initialAddress);
    
                    dispatch(fetchAddress(user.id))
                }
            })
        }
        
    }

    const validForm = () => {
        return Object.values(formData).every(value => value.trim() !== "");
    }

    useEffect(()=>{
        dispatch(fetchAddress(user.id))
        
    }, [])


    function handleDeleteAddress(addressId){
        dispatch(deleteAddress({userId:user.id, addressId})).then((data)=>{
            if(data?.payload.success){
                toast({
                    title:"Address Deleted Successfully"
                })
                dispatch(fetchAddress(user.id))
            }
        })
    }

    function handleEditAddress(addressData){
        setCurrentEditId(addressData?._id);
        setFormData({
            ...formData,
            address:addressData?.address,
            city:addressData?.city,
            phone: addressData?.phone,
            pincode:addressData?.pincode,
            notes:addressData?.notes

        })
    }



  return (
    <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0 ? addressList.map((address)=>(<AddressCardData setCurrentAddressId={setCurrentAddressId} key={address?._id} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} addressData={address} />)): null}

        </div>
       

        <CardHeader>
            <CardTitle>{currentEditId != null ? "Edit Address" : "Add Address"}</CardTitle>
        </CardHeader>

        <CardContent>
            <CommonForm isBtnDisabled={!validForm()} formControls={addAddressFormElements}  formData={formData} setFormData={setFormData} buttonText={currentEditId != null ? "Edit" : "Add"} onSubmit={handleManageAddress}></CommonForm>
        </CardContent>
    </Card>
  )
}

export default AddressCard
import React, { useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle,  } from '@/components/ui/card'
import { useDispatch } from 'react-redux'
import { capturePayment } from '@/store/shopOrderReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'


function PaypalReturn() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get("paymentId")
  const payerId = params.get("PayerID")

  // console.log("paymentId", paymentId)
  // console.log("payerId", payerId)

  const {toast} = useToast()


  useEffect(()=>{
    if(paymentId && payerId){
      dispatch(capturePayment({paymentId, payerId})).then((data)=>{
         if(data.payload.success){
          toast({
            title:"Payment Successfull. Redirecting To Home Page"
          })
          navigate("/shop/home")
         }
         else{
          toast({
            title:"Payment Unsuccessfull. Please Review."
          })
         }
      })
    }
  }, [payerId, paymentId, dispatch, toast])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturn
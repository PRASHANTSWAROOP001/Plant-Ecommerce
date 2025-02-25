import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import CommonForm from '../common/CommonForm';
import { updateOrderStatus, getOrderDetailsForAdmin, getAllOrdersForAdmin} from '@/store/adminOrderReducer';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
const initialFormData = {
  status: "",
};

function AdminOrderDetail({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const {toast} = useToast()

  function handleUpdateStatus(e) {
    e.preventDefault();
    // Handle status update logic here

    const {status} = formData;

    dispatch(updateOrderStatus({id:orderDetails?._id,orderStatus:status})).then((data)=>{
      if(data.payload?.success){
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin())

        toast({
          title:"order updated successfully"
        })
      }
    })

  }

  return (
    <DialogContent className="max-w-2xl h-[90vh] flex flex-col" aria-labelledby="orderDetailsTitle">
      {/* Fixed Header */}
      <DialogHeader className="flex-shrink-0">
        <DialogTitle id="orderDetailsTitle" className="text-xl font-semibold">
          Order Details
        </DialogTitle>
      </DialogHeader>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 py-4">
        <div className="grid gap-6">
          {/* Order Summary Card */}
          <Card aria-labelledby="orderSummaryTitle">
            <CardHeader className="pb-4">
              <CardTitle id="orderSummaryTitle" className="text-lg">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-muted-foreground">Order ID</p>
                  <p className="font-medium" aria-label={`Order ID: ${orderDetails?._id}`}>
                    {orderDetails?._id}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Order Date</p>
                  <p className="font-medium" aria-label={`Order date: ${orderDetails?.orderDate.split("T")[0]}`}>
                    {orderDetails?.orderDate.split("T")[0]}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">Payment Method</p>
                  <p className="font-medium" aria-label={`Payment Method: ${orderDetails?.paymentMethod}`}>
                    {orderDetails?.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">Payment Status</p>
                  <p className="font-medium" aria-label={`Payment Method: ${orderDetails?.paymentStatus}`}>
                    {orderDetails?.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">Order Status</p>
                  <Badge
                    className={`py-1 px-3 text-sm ${
                      orderDetails?.orderStatus === "Confirmed"
                        ? "bg-green-500 hover:bg-green-600"
                        : orderDetails?.orderStatus === "rejected"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                    aria-label={`Order status: ${orderDetails?.orderStatus}`}
                  >
                    {orderDetails?.orderStatus}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Total Amount</p>
                  <p className="font-medium" aria-label={`Total amount: ${orderDetails?.totalAmount} dollars`}>
                    ${orderDetails?.totalAmount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card aria-labelledby="productsTitle">
            <CardHeader className="pb-4">
              <CardTitle id="productsTitle" className="text-lg">
                Products ({orderDetails?.cartItem?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4" role="list" aria-label="List of ordered products">
                {orderDetails?.cartItem?.map((cartItem) => (
                  <li 
                    key={cartItem.productId}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                    role="listitem"
                  >
                    <div className="space-y-1">
                      <p className="font-medium" aria-label={`Product name: ${cartItem.name}`}>
                        {cartItem.name}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span aria-label={`Quantity: ${cartItem.quantity}`}>
                          Qty: {cartItem.quantity}
                        </span>
                        <span aria-hidden="true">|</span>
                        <span aria-label={`Price per unit: ${cartItem.sellPrice} dollars`}>
                          ${cartItem.sellPrice} each
                        </span>
                      </div>
                    </div>
                    <div className="font-medium" aria-label={`Total for this product: ${cartItem.quantity * cartItem.sellPrice} dollars`}>
                      ${(cartItem.quantity * cartItem.sellPrice).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shipping Information Card */}
          <Card aria-labelledby="shippingTitle">
            <CardHeader className="pb-4">
              <CardTitle id="shippingTitle" className="text-lg">
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p aria-label={`Phone number: ${orderDetails?.addressInfo?.phone}`}>
                    {orderDetails?.addressInfo?.phone}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Address</p>
                  <p aria-label={`Address: ${orderDetails?.addressInfo?.address}`}>
                    {orderDetails?.addressInfo?.address}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">City</p>
                  <p aria-label={`City: ${orderDetails?.addressInfo?.city}`}>
                    {orderDetails?.addressInfo?.city}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pincode</p>
                  <p aria-label={`Pincode: ${orderDetails?.addressInfo?.pincode}`}>
                    {orderDetails?.addressInfo?.pincode}
                  </p>
                </div>
                {orderDetails?.addressInfo?.notes && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Delivery Notes</p>
                    <p aria-label={`Delivery notes: ${orderDetails?.addressInfo?.notes}`}>
                      {orderDetails?.addressInfo?.notes}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Status Update Form */}
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetail;
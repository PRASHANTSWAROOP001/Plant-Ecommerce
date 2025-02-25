import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHeader, Table , TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import ShoppingOrderDetails from '@/components/shopComponents/ShoppingOrderDetails'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails} from '@/store/shopOrderReducer'
import { Badge } from '@/components/ui/badge'
function ShopOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const {user} = useSelector((state)=>state.auth);
    const {orderList, orderDetails} = useSelector((state)=>(state.shopOrder))
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllOrdersByUserId(user.id))
    }, [dispatch])

    
    function handleFetchOrderDetails(getOrderId){

        console.log(getOrderId, "orderId");

        dispatch(getOrderDetails(getOrderId))

    }

    useEffect(() => {
        if (orderDetails != null) {
          setOpenDetailsDialog(true);
        }
    
      }, [orderDetails]);


   console.log("orderList: ", orderList)

   console.log(orderDetails, "orderDetails");

  return (
    <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order Id</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                    </TableRow>

                    <TableHead>
                        <span className='sr-only'>Details</span>
                    </TableHead>
                </TableHeader>

                <TableBody>


                    {orderList && orderList.length > 0 ? orderList.map(orderItems=> (
                        <TableRow key={orderItems?._id}>
                        <TableCell>
                            {orderItems?._id}
                        </TableCell>
                        <TableCell>
                        {orderItems?.orderDate.split("T")[0]}
                        </TableCell>
                        <TableCell>
                            <Badge  className={`py-1 px-3 ${
                          orderItems?.orderStatus === "Confirmed"
                            ? "bg-green-500"
                            : orderItems?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}>{orderItems?.orderStatus}</Badge>
                        </TableCell>
                        <TableCell>
                            {orderItems?.totalAmount}$
                        </TableCell>
                        <TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={()=>{
                                setOpenDetailsDialog(false)
                                dispatch(resetOrderDetails())
                            }}>
                            <Button onClick={()=>handleFetchOrderDetails(orderItems?._id)}> View Details</Button>
                             <ShoppingOrderDetails orderDetails = {orderDetails}/>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                    )): null}

                    

                </TableBody>
            </Table>

        </CardContent>
    </Card>
  )
}

export default ShopOrders
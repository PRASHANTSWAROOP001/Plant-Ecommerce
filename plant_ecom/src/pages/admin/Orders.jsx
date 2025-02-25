import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableHeader, Table, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import AdminOrderDetail from '@/components/adminComponents/AdminOrderDetail';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@/components/ui/badge';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetAdminOrderDetails } from '@/store/adminOrderReducer';

function Orders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    if (orderDetails != null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? orderList.map((orderItems) => (
              <TableRow key={orderItems?._id}>
                <TableCell>{orderItems?._id}</TableCell>
                <TableCell>{orderItems?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge className={`py-1 px-3 ${
                    orderItems?.orderStatus === "Confirmed"
                      ? "bg-green-500"
                      : orderItems?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}>{orderItems?.orderStatus}</Badge>
                </TableCell>
                <TableCell>{orderItems?.totalAmount}$</TableCell>
                <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={() => {
                    setOpenDetailsDialog(false);
                    dispatch(resetAdminOrderDetails());
                  }}>
                    <Button onClick={() => handleFetchOrderDetails(orderItems?._id)}>View Details</Button>
                    <AdminOrderDetail orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Orders;
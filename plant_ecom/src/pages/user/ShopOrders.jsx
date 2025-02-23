import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHeader, Table , TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import ShoppingOrderDetails from '@/components/shopComponents/ShoppingOrderDetails'
import { useState } from 'react'

function ShopOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
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

                    <TableRow>
                        <TableCell>
                            12334
                        </TableCell>
                        <TableCell>
                            27/10/204
                        </TableCell>
                        <TableCell>
                            Pending
                        </TableCell>
                        <TableCell>
                            1000$
                        </TableCell>
                        <TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                            <Button onClick={()=>setOpenDetailsDialog(true)}> View Details</Button>
                             <ShoppingOrderDetails/>
                            </Dialog>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </CardContent>
    </Card>
  )
}

export default ShopOrders
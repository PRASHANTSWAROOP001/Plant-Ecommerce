const express = require("express")
const {getAllOrders,getOrderDetailsForAdmin,updateOrderStatus} = require("../../controllers/admin/orderController")


const router = express.Router();


router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);


module.exports = router;
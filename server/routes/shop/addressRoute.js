const express = require("express");

const router = express.Router();

const {addAddress, deleteAddress,editAddress,fetchAddress} = require("../../controllers/shop/addressController");


router.post("/add", addAddress)
router.get("/get/:userId",fetchAddress)
router.delete("/delete/:userId/:addressId", deleteAddress)
router.put("/update/:userId/:addressId", editAddress)

module.exports = router;

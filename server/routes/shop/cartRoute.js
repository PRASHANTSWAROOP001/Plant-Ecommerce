const express = require("express")

const { addToCart, deleteCartItems, fetchCart, updateCartItemsQuantity } = require("../../controllers/shop/cartController")

const router = express.Router()

router.post("/add", addToCart);

router.get("/get/:userId", fetchCart);

router.put("/update-cart", updateCartItemsQuantity)

router.delete("/:userId/:productId", deleteCartItems)

module.exports = router;
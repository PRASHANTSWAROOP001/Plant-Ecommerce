const express = require("express");


const {getFilteredProducts} = require("../../controllers/shop/shopProduct")


const router = express.Router()

router.get("/get", getFilteredProducts)


module.exports = router;


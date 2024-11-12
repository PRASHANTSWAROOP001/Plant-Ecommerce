const express = require("express");

const router = express.Router()

const {addProduct,deleteProduct,fetchAllProducts,handleImageUpload} = require("../../controllers/admin/productController")

const {upload} = require("../../helper/cloudinary")

router.post("/add", addProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/get", fetchAllProducts)
router.post("/upload-image", upload.single("my_file"), handleImageUpload)

module.exports = router;
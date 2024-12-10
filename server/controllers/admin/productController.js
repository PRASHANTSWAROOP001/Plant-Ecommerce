const { imageUploadUtil } = require("../../helper/cloudinary");

const { Product } = require("../../models/Product");

async function handleImageUpload(req, res) {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "File Uploaded Successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error happend while trying to upload file: ", error);

    res.json({
      success: false,
      message: "Error while uploading file",
    });
  }
}

const addProduct = async (req, res) => {
  const {
    imageUrl,
    name,
    scientificName,
    description,
    category,
    careLevel,
    lightRequirement,
    stock,
    price,
    sellPrice,
  } = req.body;

  console.log(req.body);

  try {
    const newProduct = new Product({
      imageUrl,
      name,
      scientificName,
      description,
      category,
      careLevel,
      lightRequirement,
      stock,
      price,
      sellPrice,
    });

    await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.error("Error while adding product: ", error);

    res.status(401).json({
      success: false,
      message: "Error while adding product",
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    res.json({
      success: true,
      messsage: "Product fetched successfully",
      data: listOfProducts,
    });
  } catch (error) {
    console.error("Error happend while trying to get all the product. ", error);
    res.json({
      success: false,
      message: "error while fetching products",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Could Not Be Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error Occured While Deleting A Product",
    });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const editProduct = await Product.findById(id);

    if (!editProduct) {
      throw new Error("Product is not Found");
    }

    const {
      imageUrl,
      name,
      scientificName,
      description,
      category,
      careLevel,
      lightRequirement,
      stock,
      price,
      sellPrice,
    } = req.body;

    editProduct.name = editProduct.name || name;

    editProduct.scientificName = editProduct.scientificName || scientificName;

    editProduct.price = editProduct.price || price;

    editProduct.sellPrice = editProduct.sellPrice || sellPrice;

    editProduct.stock = editProduct.stock || stock;

    editProduct.description = editProduct.description || description;

    editProduct.category = editProduct.category || category;

    editProduct.careLevel = editProduct.careLevel || careLevel;

    editProduct.lightRequirement =
      editProduct.lightRequirement || lightRequirement;

    editProduct.imageUrl = editProduct.imageUrl || imageUrl;

    await editProduct.save();

    return res.status(201).json({
      success: true,
      message: "product updated successfully",
    });
  } catch (error) {
    console.log("error happend while trying to modify product", error);

    return res.status(501).json({
      success: false,
      message: "Error Happend while trying to modify Product.",
    });
  }
};

//add a function to edit existing products

module.exports = {
  handleImageUpload,
  addProduct,
  deleteProduct,
  fetchAllProducts,
  editProduct
};

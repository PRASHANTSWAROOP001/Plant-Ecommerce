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
    // Create the new product
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

    // Save the new product to the database
    await newProduct.save();

    // Return the new product data along with success message
    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct, // Send the product data as part of the response
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

    const product = await Product.findByIdAndDelete(id);

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

    // Update fields with the correct logic
    editProduct.name = name || editProduct.name;
    editProduct.scientificName = scientificName || editProduct.scientificName;
    editProduct.price = price || editProduct.price;
    editProduct.sellPrice = sellPrice || editProduct.sellPrice;
    editProduct.stock = stock || editProduct.stock;
    editProduct.description = description || editProduct.description;
    editProduct.category = category || editProduct.category;
    editProduct.careLevel = careLevel || editProduct.careLevel;
    editProduct.lightRequirement = lightRequirement || editProduct.lightRequirement;
    editProduct.imageUrl = imageUrl || editProduct.imageUrl;

    await editProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error happened while trying to modify product", error);

    return res.status(501).json({
      success: false,
      message: "Error happened while trying to modify product.",
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

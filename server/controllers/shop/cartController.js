const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const addedProduct = await Product.findById(productId);

    if (!addedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Could Not Be Found.",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error happend while adding or creating a product:", error);

    res.json(500).json({
      success: false,
      message: "Error happend while adding/creating cart instance",
      error,
    });
  }
};

const fetchCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "imageUrl name price sellPrice",
    });

    // there is this populate method which uses reference keys and pulls our relevenat data using that object key
    // this way we dont have to store redundant data everywhere.

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not avilable for user.",
      });
    }

    const validItems = cart.items.filter((productItem) => productItem.id); // deleting all such elements which do not have valid productId

    if (validItems.length < cart.items.length) {
      // since we deleted/eliminated invalidItems now our validItems.lenght < cart.items.length
      cart.items = validItems; //so we save the valid items
      await cart.save();
    }

    // here in the below code block we are using poulated values structuring them and sending the data in a easier format

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      imageUrl: item.productId.imageUrl,
      sellPrice: item.productId.sellPrice,
      price: item.productId.price,
      name: item.productId.name,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error happend while fetching cart data:", error);

    res.json(500).json({
      success: false,
      message: "Error happend while fetching cart items",
      error,
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not avilable for user.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "imageUrl name price sellPrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      imageUrl: item.productId ? item.productId.imageUrl : null,
      sellPrice: item.productId ? item.productId.sellPrice : null,
      price: item.productId ? item.productId.price : null,
      name: item.productId ? item.productId.name : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("error happend while deleting cart items", error);
    return res.status(500).json({
      success: false,
      message: "Error happend while deleting cartItems",
      error,
    });
  }
};

const updateCartItemsQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for user",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "product could now be found",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "imageUrl name price sellPrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      imageUrl: item.productId ? item.productId.imageUrl : null,
      sellPrice: item.productId ? item.productId.sellPrice : null,
      price: item.productId ? item.productId.price : null,
      name: item.productId ? item.productId.name : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("error happend while updating cart items", error);
    return res.status(500).json({
      success: false,
      message: "Error happend while updating cartItems",
      error,
    });
  }
};

module.exports = {
  fetchCart,
  deleteCartItems,
  updateCartItemsQuantity,
  addToCart,
};

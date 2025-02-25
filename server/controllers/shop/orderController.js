const paypal = require("../../helper/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");

/**
 * @description Handles the creation of a new order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createOrder = async (req, res) => {
  try {
    const { userId, addressId, paymentMethod } = req.body;


    console.log(req.body, "req.body")

    // Validate request data
    if (!userId || !addressId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "userId, addressId, and paymentMethod are required."
      });
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty."
      });
    }

    // Fetch address information
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found."
      });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.productId.sellPrice * item.quantity;
    }, 0);

    // Create PayPal payment if payment method is PayPal
    let paymentId = null;
    let approvalUrl = null;

    if (paymentMethod === "PayPal") {
      const createPaymentJson = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "http://localhost:5173/order/success",
          cancel_url: "http://localhost:5173/order/cancel"
        },
        transactions: [{
          item_list: {
            items: cart.items.map(item => ({
              name: item.productId.name,
              sku: item.productId._id.toString(),
              price: item.productId.sellPrice.toFixed(2),
              currency: "USD",
              quantity: item.quantity
            }))
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2)
          },
          description: "Plant Ecom Order"
        }]
      };

      const payment = await new Promise((resolve, reject) => {
        paypal.payment.create(createPaymentJson, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });

      console.log(payment, "payment");

      paymentId = payment.id;

      // Ensure approval URL exists before using it
      const approvalLink = payment.links.find(link => link.rel === "approval_url");
      if (approvalLink) {
        approvalUrl = approvalLink.href;
      }
    }

    // Create new order
    const newOrder = new Order({
      userId,
      cartItem: cart.items.map(item => ({
        productId: item.productId._id.toString(),
        name: item.productId.name,
        image: item.productId.imageUrl[0],
        price: item.productId.price,
        sellPrice: item.productId.sellPrice,
        quantity:item.quantity,

      })),
      addressInfo: {
        addressId: address._id.toString(),
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        phone: address.phone,
        notes: address.notes
      },
      orderStatus: "Pending",
      paymentMethod,
      paymentStatus: paymentMethod === "PayPal" ? "Pending" : "Not Paid",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId,
      payerId:" "
    });

    const savedOrder = await newOrder.save();


    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
      approvalUrl,
      orderId: savedOrder._id
    });

    
  } catch (error) {
    console.error("Error happened while creating the order", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


/**
 * @description Handles the capture of a PayPal payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;

    // Validate request data
    if (!paymentId || !payerId) {
      return res.status(400).json({
        success: false,
        message: "paymentId and payerId are required."
      });
    }

    // Capture PayPal payment
    const executePaymentJson = {
      payer_id: payerId
    };

    const payment = await new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    // Update order status and payment status
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentId },
      {
        orderStatus: "Confirmed",
        paymentStatus: "Paid",
        payerId:payerId,
        orderUpdateDate: new Date()
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    const userId = updatedOrder.userId;

    const cart = await Cart.findOneAndUpdate({userId}, {items:[]}); //empty the cart after successfull order


    res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error happened while capturing the payment", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};



const getAllOrdersByUserId = async(req,res)=>{

  try {

    const {userId} = req.params;

    if(!userId){
      return res.status(400).json({
        success:false,
        message:"Please send the userId. To fetch user orders"
      })
    }

    const order = await Order.find({userId});

    if(!order.length){
      return res.status(404).json({
        success:false,
        message:"No order could be found."
      })
    }
    else{
      return res.status(201).json({
        success:true,
        data:order
      })
    }
    
  } catch (error) {

    console.error("Error happend while fetching the orders for user");

    return res.status(500).json({
      success:false,
      message:"Error happend while fetching the orders for user",
      error
    })
    
  }

}

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order Details Cant Be Found Without order id"
      });
    }

    // 🔥 Add await to get the document (not a Query object)
    const order = await Order.findById(id).exec(); // <-- fix here

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Particular Order Could Not Be Found."
      });
    }

    // ✅ Mongoose documents have circular structures. Convert to a plain object
    return res.status(200).json({ // <-- 201 is for creation, use 200
      success: true,
      data: order.toObject({ getters: true }) // converts Mongoose doc to plain JS object
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ // <-- 501 is "Not Implemented", use 500
      success: false,
      message: "Error fetching order",
      error: error.message // Send error message instead of the full error object
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUserId,
  getOrderDetails
};
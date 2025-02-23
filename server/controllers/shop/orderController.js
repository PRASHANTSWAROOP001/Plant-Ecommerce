const paypal = require("../../helper/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");

const createOrder = async (req, res) => {
  try {
    const { userId, addressId, paymentMethod } = req.body;

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
    let payerId = null;
    if (paymentMethod === "PayPal") {
      const createPaymentJson = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "http://localhost:5000/api/shop/order/success",
          cancel_url: "http://localhost:5000/api/shop/order/cancel"
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

      paymentId = payment.id;
      payerId = payment.payer.payer_info.payer_id;
    }

    // Create new order
    const newOrder = new Order({
      userId,
      cartItem: cart.items.map(item => ({
        productId: item.productId._id.toString(),
        name: item.productId.name,
        image: item.productId.imageUrl[0],
        price: item.productId.price,
        sellPrice: item.productId.sellPrice
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
      payerId
    });

    const savedOrder = await newOrder.save();

    // Clear user's cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder
    });
  } catch (error) {
    console.error("Error happened while creating the order", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};




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

module.exports = {
  createOrder,
  capturePayment
};
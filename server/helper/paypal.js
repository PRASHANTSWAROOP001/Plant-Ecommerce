const paypal = require("paypal-rest-sdk");
require("dotenv").config(); // Ensure environment variables are loaded

// Check if credentials are provided
if (!process.env.CLIENT_ID || !process.env.SECRET) {
  console.error("PayPal credentials are missing!");
}

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox", // Use "live" for production
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.SECRET,
});

module.exports = paypal;

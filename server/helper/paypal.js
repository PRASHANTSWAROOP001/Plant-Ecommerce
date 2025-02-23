const paypal = require("paypal-rest-sdk");

const clientId = process.env.CLIENT_ID
const secret = process.env.SECRET

paypal.configure({
    mode:"sandbox",
    client_id:clientId,
    client_secret:secret
})

module.exports = paypal



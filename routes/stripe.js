const stripeController = require("./../controllers/stripe");
const express = require("express");
const router = express.Router();

//app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
router.route("/webhook").post(stripeController.webhook);
router.route("/orders").post(stripeController.getOrders);
router.route("/checkout").post(stripeController.checkout);

module.exports = router;

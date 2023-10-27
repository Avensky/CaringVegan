const express = require("express");
const router = express.Router();
const priceController = require("./../controllers/price");

router
  .route("/")
  .get(priceController.getPrices)
  .post(priceController.createPrice);

router
  .route("/:id")
  .get(priceController.getPrice)
  .patch(priceController.updatePrice)
  .delete(priceController.deletePrice);

module.exports = router;

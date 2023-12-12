const stripeController = require("./../controllers/stripe");
const imageController = require("./../controllers/image");
const authController = require("./../controllers/auth");
const express = require("express");
const router = express.Router();

//app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
router.route("/webhook").post(stripeController.webhook);
router.route("/orders").post(stripeController.getOrders);
router.route("/checkout").post(stripeController.checkout);

router.route("/migrate").post(stripeController.migrateAll);
router.route("/migrateAll").post(stripeController.migrateAll);

router
  .route("/")
  .get(stripeController.getProducts)
  .post(stripeController.createProduct);

router
  .route("/:id")
  .get(stripeController.getProduct)
  .patch(stripeController.updateProduct)
  .delete(
    // authController.protect,
    // authController.restrictTo("user"),
    stripeController.deleteProduct
  );

router.route("/unarchive/:id").patch(stripeController.unarchiveStripe);
router.route("/featured").get(stripeController.getFeatured);
router.route("/shop").get(stripeController.getShop);
router
  .route("/addImage")
  .post(imageController.upload.single("photo"), stripeController.createProduct);

module.exports = router;

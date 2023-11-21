const express = require("express");
const productController = require("../controllers/product");
// const imageController = require("./../controllers/image");
// const authController = require("./../controllers/auth");
const router = express.Router();

// router.param("id", productController.checkID);
// router.route("/featured").get(productController.getFeatured);
// router.route("/shop").get(productController.getShop);
// router
//   .route("/getTopProducts")
//   .get(productController.getTopProducts, productController.getProducts);
// router
//   .route("/addImage")
//   .post(
//     imageController.upload.single("photo"),
//     productController.createProduct
//   );

// router.route("/getProductStats").get(productController.getProductStats);
// router.route("/getMonthlyPlan").get(productController.getMonthlyPlan);

// router
//   .route("/addGallery")
//   .post(
//     imageController.upload.array("gallery", 8),
//     productController.createProduct
//   );

// router
//   .route("/addGallery")
//   .post(
// imageController.upload.fields([
//   { name: "photo", maxCount: 1 },
//   { name: "gallery", maxCount: 8 },
// ])
//     productController.createProduct
//   );
//  req.files['avatar'][0] -> File
//  req.files['gallery'] -> Array

router.route("/").get(productController.getProducts);
// .post(productController.createProduct);

// router
//   .route("/:id")
//   .get(productController.getProduct)
//   .patch(productController.updateProduct)
//   .delete(
//     authController.protect,
//     authController.restrictTo("user")
//     // productController.deleteProduct
//   );

module.exports = router;

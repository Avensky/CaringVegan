const express = require("express");
const router = express.Router();
const passportController = require("../controllers/passportController");
const authController = require("../controllers/auth");

router.route("/signup").post(passportController.signup);
router.route("/login").post(passportController.login);
router.route("/getUser").get(passportController.getUser);
router.route("/logout").post(passportController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.route("/resetPassword/:token").post(passportController.resetPassword);

// router.patch(
//   "/updatePassword",
//   passportController.protect,
//   passportController.updatePassword
// );

// router.patch("/updateMe", passportController.protect, userController.updateMe);
// router.delete("/deleteMe", passportController.protect, userController.deleteMe);

// router
//   .route("/")
//   .get(passportController.protect, userController.getUsers)
//   .post(passportController.protect, userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
// };

module.exports = router;

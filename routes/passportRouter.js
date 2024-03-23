const express = require("express");
const router = express.Router();
const passportController = require("../controllers/passportController");

router.route("/signup").post(passportController.signup);
router.route("/login").post(passportController.login);
router.route("/getUser").get(passportController.getUser);
router.route("/logout").post(passportController.logout);

// app.post("/api/resetPassword/:token", async (req, res, next) => {
//   // 1) Get user based on the token
//   console.log("params = ", req.params.token);
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   console.log("hashedToken = ", hashedToken);

//   const user = await Users.findOne({
//     "local.passwordResetToken": hashedToken,
//     "local.passwordResetExpires": { $gt: Date.now() },
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     return res.status(200).json({
//       info: {
//         user: null,
//         message: "Token is invalid or has expired",
//       },
//     });
//   }

//   console.log("user=  ", user);
//   console.log("req.body=  ", req.body);
//   user.local.password = user.generateHash(req.body.password);
//   // user.local.passwordConfirm = req.body.passwordConfirm;
//   user.local.passwordResetToken = undefined;
//   user.local.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in
//   req.logIn(user, function (err) {
//     console.log("user", user);
//     if (err) {
//       return res.status(200).json({
//         info: {
//           user: null,
//           message: err,
//         },
//       });
//     }
//     return res.status(200).json({
//       info: {
//         user: user,
//         message: "Successfully updated password",
//       },
//     });
//   });
// });

// app.post("/api/forgotPassword", async (req, res, next) => {
//   console.log("forgot password", req.body);

//   // 1) Get user by email
//   const user = await Users.findOne({ "local.email": req.body.email });
//   if (!user) {
//     return res.status(200).json({
//       info: {
//         user: null,
//         message: "Email not found!",
//       },
//     });
//   }
//   console.log("user", user);

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   console.log("resetToken", resetToken);
//   await user.save({ validateBeforeSave: false });
//   //console.log('user token', user);

//   // 3) Send it to user's email
//   try {
//     //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
//     const resetURL = `${req.protocol}://${req.hostname}${keys.clientPort}/resetPassword/${resetToken}`;
//     console.log("resetURL", resetURL);
//     console.log("user", user);
//     const email = user.local.email;
//     await new Email(user, email, resetURL).sendPasswordReset();
//     return res.status(200).json({
//       info: {
//         status: "success",
//         message:
//           "Password reset token sent to email! Link is valid for 10 minutes!",
//       },
//     });
//   } catch (err) {
//     console.log("err", err);
//     user.local.passwordResetToken = undefined;
//     user.local.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return res.status(500).json({
//       info: {
//         status: "error",
//         message: "There was an error sending the email. Try again later!",
//       },
//     });
//   }
// });

// route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/");
// }

// app.get("/api/v2/users/logout", async (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.status(200).json({ message: "logout successful" });
//   });
// });

// router.post("/forgotPassword", passportController.forgotPassword);
// router.patch("/resetPassword/:token", passportController.resetPassword);

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

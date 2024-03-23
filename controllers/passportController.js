const passport = require("passport");
// const User = require("../models/user");
// const QueryAPI = require("../utils/QueryAPI");
const catchAsync = require("../utils/catchAsync");

exports.login = (req, res, next) => {
  // Use passport callback function to get errors, user data, or info response
  passport.authenticate("local-login", (err, user, info) => {
    if (err) return next(err); // return errors
    if (!user) return res.send(info); // respond to bad requests
    req.logIn(user, (err) => {
      if (err) return next(err); // send error
      return res.status(200).json({ message: "User logged in successfully" }); // send response succesful login
    });
  })(req, res, next);
};

exports.signup = (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) return res.status(200).json({ err });
    if (!user) return res.status(200).json({ info });
    req.logIn(user, (err) => {
      if (err) return next(res.status(200).json({ err }));
      return res.status(200).json({ info });
    });
  })(req, res, next);
};

exports.getUser = catchAsync(async (req, res, next) => {
  if (req.user) {
    console.log("req.user = ", req.user);
    res.status(200).json({
      user: req.user,
      message: "User found",
    });
  } else {
    res.status(400).json({
      user: null,
      message: "No active user found",
    });
  }
});

exports.logout = async function (req, res, next) {
  try {
    req.logout(req.user, function (err) {
      console.log("loggingggg outtt");
      if (err) return next(err);
    });
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ user: null, message: "logout successful" });
};

// =============================================================================
// REGISTER Local Accounts =====================================================
// =============================================================================
// exports.register = () => {};

// Login
//   app.post("/api/login", function (req, res) {
//     passport.authenticate("local-login", (err, user, info) => {
//       if (err) {
//         console.log("err", err);
//         return res.status(200).json({ err });
//       }

//       if (!user) {
//         console.log("info", info);
//         return res.status(200).json({ info });
//       }

//       req.logIn(user, function (err) {
//         console.log("user = ", user);
//         if (err) {
//           return res.status(200).json({
//             info: {
//               user: null,
//               message: err,
//             },
//           });
//         }
//         //return res.redirect('/profile/' + user.username);
//         return res.status(200).json({ info });
//       });

//       // regenerate the session, which is good practice to help
//       // guard against forms of session fixation

//       //           req.session.regenerate(function (err) {
//       //               console.log('user', user);
//       //               if (err) {
//       //                   return res.status(200).json({
//       //                       info:{
//       //                           user:null,
//       //                           message: err
//       //                       }
//       //                   })
//       //               }
//       //
//       //               // store user information in session, typically a user id
//       //               req.session.user = req.body.user
//       //
//       //               // save the session before redirection to ensure page
//       //               // load does not happen before session is saved
//       //               req.session.save(function (err) {
//       //                   return res.status(200).json({info});
//       //               });
//       //           });
//     })(req, res);
//   });

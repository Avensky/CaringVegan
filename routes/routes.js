// const mongoose = require("mongoose");
// const Users = mongoose.model("User");
// load the auth variables

module.exports = function (app, passport) {
  // =============================================================================
  // normal routes ===============================================================
  // =============================================================================
  // Get all users
  // app.get("/api/v1/fetchUsers", (req, res) => {
  //   Users.find({}, (err, doc) => {
  //     if (doc) res.json(doc);
  //     else {
  //       res.err(err);
  //     }
  //   });
  // });
  // app.get("/ping", (req, res) => {
  //   res.status(200).send("pong!");
  // });
  // app.get("/api/ping", (req, res) => {
  //   res.status(200).send("api pong!");
  // });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  // app.get("/api/logout", function (req, res) {
  //   req.logout();
  //   // res.redirect("/login");
  // });
  // =============================================================================
  // AUTHENTICATION ==============================================================
  // =============================================================================
  // =====================================
  // LOGIN ===============================
  // =====================================
  // app.post("/api/login", function (req, res, next) {
  //   passport.authenticate("local-login", (err, user, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return res.send(info);
  //     }
  //     req.logIn(user, function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       //return res.redirect('/profile/' + user.username);
  //       return res.send(200);
  //     });
  //   })(req, res, next);
  // });
  // =====================================
  // REGISTER ============================
  // =====================================
  // process the signup form
  // app.post("/api/signup", function (req, res, next) {
  //   passport.authenticate("local-signup", function (err, user, info) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return res.send(info);
  //     }
  //     req.logIn(user, function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       // return res.redirect('/profile/' + user.username);
  //       return res.send(200);
  //     });
  //   })(req, res, next);
  // });
  // =====================================
  // =====================================
  // FACEBOOK ROUTES =====================
  // route for facebook authentication and login
  // app.get(
  //   "/api/facebook",
  //   passport.authenticate("facebook", {
  //     scope: ["public_profile", "email"],
  //   })
  // );
  // handle the callback after facebook has authenticated the user
  // app.get(
  //   "/api/facebook/callback",
  //   passport.authenticate("facebook", {
  //     successRedirect: "/profile",
  //     failureRedirect: "/",
  //   })
  // );
  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  //   app.get(
  //     "/api/twitter",
  //     passport.authenticate("twitter", {
  //       scope: "email",
  //     })
  //   );
  //   // handle the callback after twitter has authenticated the user
  //   app.get(
  //     "/api/twitter/callback",
  //     passport.authenticate("twitter", {
  //       successRedirect: "/profile",
  //       failureRedirect: "/",
  //     })
  //   );
  //   // =====================================
  //   // GOOGLE ROUTES =======================
  //   // =====================================
  //   // send to google to do the authentication
  //   // profile gets us their basic information including their name
  //   // email gets their emails
  //   app.get(
  //     "/api/google",
  //     passport.authenticate("google", { scope: ["profile", "email"] })
  //   );
  //   // the callback after google has authenticated the user
  //   app.get(
  //     "/api/google/callback",
  //     passport.authenticate("google", {
  //       successRedirect: "/profile",
  //       failureRedirect: "/",
  //     })
  //   );
  //   // =============================================================================
  //   // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  //   // =============================================================================
  //   // locally --------------------------------
  //   app.post("/api/connect/local", function (req, res, next) {
  //     passport.authenticate("local-signup", function (err, user, info) {
  //       if (err) {
  //         return next(err);
  //       }
  //       if (!user) {
  //         return res.send(info);
  //       }
  //       req.logIn(user, function (err) {
  //         if (err) {
  //           return next(err);
  //         }
  //         //return res.redirect('/profile');
  //         return res.send(200);
  //       });
  //     })(req, res, next);
  //   });
  //   // facebook -------------------------------
  //   // send to facebook to do the authentication
  //   app.get(
  //     "/api/connect/facebook",
  //     passport.authorize("facebook", { scope: "email" })
  //   );
  //   // handle the callback after facebook has authorized the user
  //   app.get(
  //     "/api/connect/facebook/callback",
  //     passport.authorize("facebook", {
  //       successRedirect: "/profile",
  //       failureRedirect: "/",
  //     })
  //   );
  //   // twitter --------------------------------
  //   // send to twitter to do the authentication
  //   app.get(
  //     "/api/connect/twitter",
  //     passport.authorize("twitter", { scope: "email" })
  //   );
  //   // handle the callback after twitter has authorized the user
  //   app.get(
  //     "/api/connect/twitter/callback",
  //     passport.authorize("twitter", {
  //       successRedirect: "/profile",
  //       failureRedirect: "/",
  //     })
  //   );
  //   // google ---------------------------------
  //   // send to google to do the authentication
  //   app.get(
  //     "/api/connect/google",
  //     passport.authorize("google", { scope: ["profile", "email"] })
  //   );
  //   // the callback after google has authorized the user
  //   app.get(
  //     "/api/connect/google/callback",
  //     passport.authorize("google", {
  //       successRedirect: "/profile",
  //       failureRedirect: "/",
  //     })
  //   );
  //   // =============================================================================
  //   // UNLINK ACCOUNTS =============================================================
  //   // =============================================================================
  //   // used to unlink accounts. for social accounts, just remove the token
  //   // for local account, remove email and password
  //   // user account will stay active in case they want to reconnect in the future
  //   // local -----------------------------------
  //   app.get("/api/unlink/local", function (req, res) {
  //     var user = req.user;
  //     user.local.email = undefined;
  //     user.local.password = undefined;
  //     user.save(function (err) {
  //       res.redirect("/profile");
  //     });
  //   });
  //   // facebook -------------------------------
  //   app.get("/api/unlink/facebook", function (req, res) {
  //     var user = req.user;
  //     user.facebook.token = undefined;
  //     user.save(function (err) {
  //       res.redirect("/profile");
  //     });
  //   });
  //   // twitter --------------------------------
  //   app.get("/api/unlink/twitter", function (req, res) {
  //     var user = req.user;
  //     user.twitter.token = undefined;
  //     user.save(function (err) {
  //       res.redirect("/profile");
  //     });
  //   });
  //   // google ---------------------------------
  //   app.get("/api/unlink/google", function (req, res) {
  //     var user = req.user;
  //     user.google.token = undefined;
  //     user.save(function (err) {
  //       res.redirect("/profile");
  //     });
  //   });
  // };
  // route middleware to ensure user is logged in
  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) return next();
  //   res.redirect("/");
};

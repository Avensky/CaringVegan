const passport = require("passport");

exports.login = (req, res, next) => {
  // Use passport callback function to get errors, user data, or info response
  passport.authenticate("local-login", (err, user, info) => {
    if (err) return next(err); // return errors
    if (!user) return res.send(info); // respond to bad requests
    user.local.password = undefined;
    user.local.verifyToken = undefined;
    req.logIn(user, (err) => {
      if (err) return next(err); // send error
      return res
        .status(200)
        .json({ user: user, message: "User logged in successfully" }); // send response succesful login
    });
  })(req, res, next);
};

exports.signup = (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) return res.status(200).json({ err });
    if (!user) return res.status(200).json({ info });
    user.local.password = undefined;
    user.local.verifyToken = undefined;
    req.logIn(user, (err) => {
      if (err) return next(res.status(200).json({ err }));
      return res
        .status(200)
        .json({ user: user, message: "User created successfully" });
    });
  })(req, res, next);
};
exports.resetPassword = async (req, res, next) => {
  passport.authenticate("local-reset", (err, user, info) => {
    user.local.password = undefined;
    if (err) return res.status(400).json({ err });
    if (!user) return res.status(404).json({ user: null, info });
    req.logIn(user, (err) => {
      if (err) return next(res.status(200).json({ err }));
      return res
        .status(200)
        .json({ user: user, message: "Password updated successfully!" });
    });
  })(req, res, next);
};

exports.getUser = async (req, res, next) => {
  // console.log("req.user = ", req.user);
  if (req.user) {
    // console.log("req.user = ", req.user) ;
    res.status(200).json({
      user: req.user,
      message: "User found",
    });
  } else {
    res.status(200).json({
      user: null,
      message: null,
    });
  }
};

exports.logout = async function (req, res, next) {
  console.log("loggingggg outtt");
  try {
    req.logout(req.user, function (err) {
      if (err) return next(err);
    });
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ user: null, message: "logout successful" });
};

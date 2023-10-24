const User = require("./../models/user");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const { success } = require("concurrently/src/defaults");
const keys = require("./../config/keys");
// const { debug } = require('console');

// ========================================================================
// Tokens =================================================================
// ========================================================================
const signToken = (id) => {
  return jwt.sign({ id }, keys.jwtSecret, {
    expiresIn: keys.jwtCookieExpiresIn,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + keys.jwtCookieExpiresIn * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.local.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// ====================================================================
// SIGNUP =============================================================
// ====================================================================

exports.signup = catchAsync(async (req, res, next) => {
  // console.log(req.body.name)
  console.log("req.body.email", req.body.email);
  console.log("req.body.password", req.body.password);
  console.log("req.body.passwordConfirm", req.body.passwordConfirm);

  // Build object
  const userObject = {
    username: req.body.username,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    local: {
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    },
  };

  const newUser = await User.create(userObject);
  // const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(url);
  // await new Email(newUser, url).sendWelcome();
  console.log("newuser = ", newUser);

  createSendToken(newUser, 201, req, res);
});

// ========================================================================
// Login ==================================================================
// ========================================================================
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body = ", req.body);

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ "local.email": email }).select(
    "+local.password"
  );
  console.log("user = ", user);

  // if the email doesn't exist or the password is incorrect
  if (!user || !(await user.verifyPassword(password, user.local.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log("password verified");
  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

// ========================================================================
// Logout =================================================================
// ========================================================================

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

// ====================================================================
// Verify token - is user logged in? ==================================
// ====================================================================

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  // console.log("protect req");
  // console.log('protect res',res.session.cookie)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("protect", token);

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) VerifY token
  const decoded = await promisify(jwt.verify)(token, keys.jwtSecret);
  console.log("decoded: ", decoded);
  const userid = decoded.id;
  const tokenCreatedAt = decoded.iat;

  // 3) Check if user still exists in db
  const currentUser = await User.findById(userid);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.hasPasswordChanged(tokenCreatedAt)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  console.log("access granted: ", req.user);
  next();
});

// ========================================================================
// Check to see if user is logged in ======================================
// ========================================================================

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.hasPasswordChanged(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.local.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// ============================================================================
// Restrict to admin ==========================================================
// ============================================================================

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'user'].role='user'
    // console.log(req.user);
    // console.log(roles);
    // Check for users with roles passed here
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

// ============================================================================
// FORGOT PASSWORD ============================================================
// ============================================================================

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ "local.email": req.body.email });
  if (!user) next(new AppError("There is no user with email address.", 404));

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  //console.log('resetToken', resetToken)
  await user.save({ validateBeforeSave: false });

  //console.log('user token', user)

  // 3) Send it to user's email
  try {
    //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    console.log("resetURL", resetURL);

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message:
        "Password reset token sent to email! Link is valid for 10 minutes!",
    });
  } catch (err) {
    user.local.passwordResetToken = undefined;
    user.local.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// ============================================================================
// Reset password =============================================================
// ============================================================================

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  console.log("resetPassword start");
  // console.log("req.params.token", req.params.token);

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("hashedToken", hashedToken);

  const user = await User.findOne({
    "local.passwordResetToken": hashedToken,
    "local.passwordResetExpires": { $gt: Date.now() }, // check if reset token expired
  });

  console.log("user found by token: ", user);
  // console.log("reset password user", user);
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.local.password = req.body.password;
  user.local.passwordConfirm = req.body.passwordConfirm;
  console.log("req.body.password", req.body.password);
  console.log("req.body.confirm_password", req.body.confirmPassword);
  // Delete password reset token, to avoid hacks
  user.local.passwordResetToken = undefined;
  user.local.passwordResetExpires = undefined;

  await user.save();

  // 3) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

// ============================================================================
// Update password ============================================================
// ============================================================================

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Look for user
  console.log("req.user = ", req.user);
  // a) Search Server
  if (!req.user) return next(new AppError("No user logged in.", 401));
  console.log("req.user", req.user);
  const user = await User.findById(req.user.id).select("+local.password");
  console.log("user found ", req.user);

  // 2) Check if POSTed current password is correct
  if (
    !(await user.verifyPassword(req.body.currentPassword, user.local.password))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.local.password = req.body.password;
  user.local.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

const AppError = require("../utils/appError");

// USER ERROR
const handleCastErrorDB = (err) => {
  const message = `${err.name} on ${err.kind}. The value for ${
    err.path
  }:'${err.value.trim()}' is invalid.`;
  console.log("handleCastErrorDB = ", message);
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // console.log("err ", err);
  let keyValue = JSON.stringify(err.keyValue);
  keyValue = keyValue.replace(/\\/g, "");
  // console.log("keyValue", keyValue);
  const message = `${keyValue}. The value for this field is already in use, please choose something else!`;
  // console.log("message = ", message);
  return new AppError(message, 400, "DuplicateField");
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400, "ValidationError");
};

// TOKEN ERRORS
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

//SEND THE WHOLE MESSAGE
const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  //   console.error("ERROR 💥", err);
  //   return res.status(err.statusCode).render("error", {
  //     title: "Something went wrong!",
  //     msg: err.message,
  //   });
};

// SEND MEANINGFUL ERROR RESPONSES
const sendErrorProd = (err, res) => {
  // A) API
  //   if (req.originalUrl.startsWith("/api")) {
  //     // A) Operational, trusted error: send message to client
  //     if (err.isOperational) {
  //       return res.status(err.statusCode).json({
  //         status: err.status,
  //         message: err.message,
  //       });
  //     }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  //     console.error("ERROR 💥", err);
  // 2) Send generic message
  //     return res.status(500).json({
  //       status: "error",
  //       message: "Something went very wrong!",
  //     });
  //   }
  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  // console.log("err = ", err);
  console.log("isOperational = ", err.isOperational);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "Oops! Something went wrong; Operational Error.",
      msg: err.message,
      name: err.name,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).json({
    title: "Oops! Something went very wrong!",
    msg: err.message || "Please try again later",
    name: err.name,
  });
};

// ==================================================================
// global error hanlder
// ==================================================================
module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  // });

  if (process.env.NODE_ENV !== "production") {
    // console.log("global error handler production");
    let error = { ...err };
    error.message = err.stack.split("\n", 1).join("");
    error.name = err.name;

    // error.reason = err.stack.split("\n", 1).join("");
    // console.log("error", error);
    // console.log("error.message", error.message);
    // console.log("error.name", error.name);
    // console.log("error.reason", error.reason);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // check for unique fields error
    if (error.name === "CastError") error = handleCastErrorDB(error); // invalid fields
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, res);
  }
};

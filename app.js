//define constants
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
//const hpp                 = require('hpp');
const bodyParser = require("body-parser");
const compression = require("compression");
//const cookieParser        = require('cookie-parser');
const cors = require("cors");
const session = require("cookie-session");
const passport = require("passport");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error");
const app = express();

//app.enable('trust proxy');

//MIDDLEWARE
// Development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

// configuration
require("./models/user");
require("./models/orders");
require("./models/product");
require("./config/passport")(passport); // pass passport for configuration

// set up cors to allow us to accept requests from our client
app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// // Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// read cookies (needed for auth)
// app.use(cookieParser());

// required for passport

app.use(
  session({
    secret: "ilovescotchscotchyscotchscotch", // session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'price'
//     ]
//   })
// );
//
app.use(compression());

// get information from html forms raw
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
//==============================================================================
// routes ======================================================================
//==============================================================================
require("./routes/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport
require("./routes/stripe.js")(app, passport);
// require('./routes/shop.js')(app);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

// catches all non existing routes
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;

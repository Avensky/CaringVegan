//define constants
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const compression = require("compression");
//const cookieParser        = require('cookie-parser');
const cors = require("cors");
const session = require("cookie-session");
const passport = require("passport");
const productRouter = require("./routes/product");
const priceRouter = require("./routes/price");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error");
const express = require("express");
const app = express();

// =============================================================================
// GLOBAL MIDDLEWARE ===========================================================
// =============================================================================

//app.enable('trust proxy');

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // # of requests
  windowMs: 60 * 60 * 1000, // 60min, 60sec, 1000ms
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, ready from body into req.body. Reject data over the limit.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Read data from the body
app.use(bodyParser.urlencoded({ extended: true }));

// Get data raw for multer
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// configuration
require("./models/user");
require("./models/orders");
require("./models/product");
require("./config/passport"); // pass passport for configuration

// set up cors to allow us to accept requests from our client
app.use(cors());
app.options("*", cors());

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
// Only allow these parameters to be searched by a range
app.use(
  hpp({
    whitelist: ["price"],
  })
);

app.use(compression());

//==============================================================================
// routes ======================================================================
//==============================================================================

require("./routes/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport
require("./routes/stripe.js")(app, passport);
// require('./routes/shop.js')(app);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/prices", priceRouter);

// catches all non existing routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getPrices = catchAsync(async (req, res, next) => {
  console.log("prices ");
  const prices = await stripe.prices.list({
    limit: 6,
  });
  if (!prices) next(new AppError("No prices found", 404));
  console.log("prices ", prices);
  res.status(200).json({
    status: "success",
    results: prices.data.length,
    prices: prices,
  });
});

exports.getPrice = catchAsync(async (req, res, next) => {
  console.log("id ", req.params.id);
  const price = await stripe.prices.retrieve(req.params.id);
  // if (!price) next(new AppError("No price found", 404));
  res.status(200).json({
    status: "success",
    price: price,
  });
});
exports.updatePrice = catchAsync(async (req, res, next) => {
  const metadata = { order_id: req.body.order_id };
  const price = await stripe.prices.update(process.env.stripeSecretKey, {
    metadata: metadata,
  });

  res.status(200).json({
    status: "success",
    price: price,
  });
});

exports.deletePrice = catchAsync(async (req, res, next) => {
  const price = await stripe.prices.update(process.env.stripeSecretKey, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    price: price,
  });
});
exports.createPrice = catchAsync(async (req, res, next) => {
  const prices = await stripe.prices.list({
    limit: 6,
  });

  res.status(201).json({
    status: "success",
    // results: prices.data.length,
    prices: prices,
  });
});

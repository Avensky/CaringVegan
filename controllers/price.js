const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const keys = require("./../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

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
    prices,
  });
});

exports.getPrice = catchAsync(async (req, res, next) => {
  console.log("id ", req.params.id);
  const price = await stripe.prices.retrieve(req.params.id);
  if (!price) next(new AppError("No price found", 404));
  res.status(200).json({
    status: "success",
    price,
  });
});
exports.updatePrice = catchAsync(async (req, res, next) => {
  const metadata = { order_id: req.body.order_id };
  const price = await stripe.prices.update(keys.stripeSecretKey, {
    metadata: metadata,
  });

  res.status(200).json({
    status: "success",
    price,
  });
});

exports.deletePrice = catchAsync(async (req, res, next) => {
  const price = await stripe.prices.update(keys.stripeSecretKey, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    price,
  });
});
exports.createPrice = catchAsync(async (req, res, next) => {
  const prices = await stripe.prices.list({
    limit: 6,
  });

  res.status(201).json({
    status: "success",
    // results: prices.data.length,
    prices,
  });
});

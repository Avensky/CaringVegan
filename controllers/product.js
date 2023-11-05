const AppError = require("../utils/appError");
const Product = require("./../models/product");
// const QueryAPI = require("./../utils/QueryAPI");
const catchAsync = require("./../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getTopProducts = (req, res, next) => {
  req.query.limit = "6";
  req.query.sort = "price, rating";
  // req.query.fields = "name, price, rating, desc, quantity";
  next();
};

exports.getProducts = catchAsync(async (req, res, next) => {
  // let filter = {};
  // if (req.params.id) filter = { product: req.params.id };
  // EXECUTE QUERY
  // const queryAPI = new QueryAPI(Product.find(), req.query)
  //   .filter()
  //   .sort()
  //   .limit()
  //   .paginate();
  // const products = await queryAPI.query;
  // query.sort().select().skip().limit()
  const queryParams = {
    // endindBefore: '',
    limit: req.query.limit,
    // active: true,
    // shippable: true,
    // ending_before: '',
    // starting_after: '',
    // url: '',
  };
  const products = await stripe.products.list(queryParams);

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.data.length,
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // console.log("req.params", req.params);
  // changed to findById to return error on wrong id
  // const product = await Product.findById(req.params.id);
  // console.log("product = ", product);

  const product = await stripe.products.retrieve(req.params.id);

  if (!product) {
    console.log("if !product = ", product);
    return next(new AppError("No product found with that ID", 404, "WrongId"));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1 CREATE NEW PRODUCT OBJ
  console.log("body ", req.body);
  console.log("req.file: ", req.file);

  const productObj = {
    name: req.body.name,
    description: req.body.description,
    default_price_data: {
      currency: req.body.currency,
      unit_amount_decimal: req.body.unit_amount_decimal,
    },
    statement_descriptor: req.body.statement_descriptor,
    metadata: {
      stock: req.body.stock,
      featured: req.body.featured,
      type: req.body.type,
      ratings_quantity: req.body.ratings_quantity,
      ratings_average: req.body.ratings_average,
    },
  };
  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj

  // 2) CREATE PRODUCT IN STRIPE
  const product = await stripe.products.create(productObj);
  if (!product) next(new AppError("PROBLEM CREATING PRODUCT", 500, "Error"));
  console.log("stripe product: ", stripeProduct);

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  console.log("body: ", req.body);
  // CREATE A PRODUCT OBJECT
  const productObj = {
    name: req.body.name,
    description: req.body.description,
    default_price_data: {
      currency: req.body.currency,
      unit_amount_decimal: req.body.unit_amount_decimal,
    },
    statement_descriptor: req.body.statement_descriptor,
    images: req.body.images,
    metadata: {
      stock: req.body.stock,
      featured: req.body.featured,
      type: req.body.type,
      ratings_quantity: req.body.ratings_quantity,
      ratings_average: req.body.ratings_average,
    },
  };
  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj
  const product = await stripe.products.update(req.params.id, productObj);
  // console.log("stripeProduct ", product);

  // console.log("stripeProduct ", product);

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  console.log("id = ", id);
  const product = await Product.findById(id, { active: false });
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  stripeProduct = await stripe.products.update(product.id);
  console.log("stripe delete");

  res.status(204).json({
    status: "success",
    data: stripeProduct.id,
  });
});

exports.getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { rating: { $gte: 4 } },
    },
    {
      $group: {
        _id: "$type",
        // avgRating: { $avg: "$rating" },
        // minPrice: { $min: "$price" },
        // maxPrice: { $max: "$price" },
        // _id: { $toUpper: "$difficulty" },
        // numTours: { $sum: 1 },
        // numRatings: { $sum: "$ratingsQuantity" },
        // avgRating: { $avg: "$ratingsAverage" },
        // avgPrice: { $avg: "$price" },
        // minPrice: { $min: "$price" },
        // maxPrice: { $max: "$price" },
      },
    },
    // {
    //   $sort: { avgPrice: 1 },
    // },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

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

exports.getFeatured = catchAsync(async (req, res, next) => {
  try {
    const featured = await stripe.products.search({
      expand: ["data.default_price", "total_count"],
      query: "metadata['featured']:'true'",
    });
    console.log("featured: ", featured);
    res.status(200).json({
      status: "success",
      featured,
    });
  } catch (err) {
    next(new AppError(err.message, err.statusCode, err.type));
  }
});

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

  console.log("req.query", req.query);
  console.log("req.query.starting_after", req.query.starting_after);

  const queryParams = {
    // include: ["data.prices"],
    expand: ["data.default_price", "total_count"],
    limit: req.query.limit,
    active: req.query.active,
    starting_after: req.query.starting_after,
    ending_before: req.query.ending_before,
    // shippable: true,
    // url: '',
  };

  console.log("queryParams ", queryParams);

  let prev = queryParams.ending_before;
  let getNext = queryParams.starting_after;

  let index = req.query.index * 1;
  console.log("index start= ", index);
  if (!queryParams.starting_after && !queryParams.ending_before) {
    index = 1;
  }

  if (queryParams.starting_after && req.query.has_more) {
    index += 1;
  }
  if (queryParams.ending_before && req.query.has_more) {
    index -= 1;
  }

  console.log("index= ", index);
  try {
    const products = await stripe.products.list(queryParams);

    let starting_after, ending_before;
    if (products) {
      starting_after = products.data.slice(-1).map((item) => item.id)[0];
      ending_before = products.data.slice(0).map((item) => item.id)[0];
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.data.length,
      products,
      starting_after,
      ending_before,
      index,
    });
  } catch (err) {
    // console.log("err ", err.message);
    // console.log("err ", err.statusCode);
    // console.log("err ", err.type);
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // console.log("req.params", req.params);
  // changed to findById to return error on wrong id
  // const product = await Product.findById(req.params.id);
  // console.log("product = ", product);

  try {
    const product = await stripe.products.retrieve(req.params.id, {
      expand: ["default_price"],
    });
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    console.log("err: ", err);
    return next(new AppError(err.message, err.statusCode, err.type));
  }
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
  try {
    const product = await stripe.products.create(productObj);
    if (!product) next(new AppError("PROBLEM CREATING PRODUCT", 500, "Error"));
    console.log("stripe product: ", stripeProduct);

    res.status(201).json({
      status: "success",
      product,
    });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }
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
  try {
    const product = await stripe.products.update(req.params.id, productObj);
    // console.log("stripeProduct ", product);
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }
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

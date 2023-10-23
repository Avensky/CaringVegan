const AppError = require("../utils/appError");
const Product = require("./../models/product");
const QueryAPI = require("./../utils/QueryAPI");
const catchAsync = require("./../utils/catchAsync");
// exports.checkID = (req, res, next, val) => {
//   console.log(`Product ID = ${val}`);

//   if (req.params.id * 1 > products.length) {
//     return res.status(404).json({
//       status: fail,
//       mesage: "Invalid ID",
//     });
//   }
//   next();
// };

exports.getTopProducts = (req, res, next) => {
  req.query.limit = "6";
  req.query.sort = "price, rating";
  // req.query.fields = "name, price, rating, desc, quantity";
  next();
};

// exports.getProducts = async () => {
//     const products = await Product.find();
//     return products;
// };
// exports.productById = async id => {
//     const product = await Product.findById(id);
//     return product;
// }
// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }

//const Product = require("../models/shop");

exports.getProducts = catchAsync(async (req, res, next) => {
  // let filter = {};
  // if (req.params.id) filter = { product: req.params.id };
  // EXECUTE QUERY
  const queryAPI = new QueryAPI(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const products = await queryAPI.query;
  // query.sort().select().skip().limit()

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // console.log("req.params", req.params);
  // changed to findById to return error on wrong id
  const product = await Product.findById(req.params.id);
  // console.log("product = ", product);

  if (!product) {
    console.log("if !product = ", product);
    return next(new AppError("No product found with that ID", 404, "WrongId"));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // console.log("req : ", req);
  console.log("createProduct : ", req.body);
  const productObj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    priceid: req.body.priceId,
    stock: req.body.stock,
    featured: req.body.featured,
    secret: req.body.secret,
    type: req.body.type,
    // imageData: req.file.key,
  };
  const newProduct = await Product.create(productObj);

  res.status(201).json({
    status: "success",
    product: newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  // const productObj = {
  //   name: req.body.name,
  //   desc: req.body.desc,
  //   price: req.body.price,
  //   priceid: req.body.priceId,
  //   stock: req.body.stock,
  //   featured: req.body.featured,
  //   secret: req.body.secret,
  //   type: req.body.type,
  //   //    imageData: req.file.key,
  // };

  let id = req.params.id;
  console.log("req.params.id", req.params.id);
  console.log("req.boy", req.body);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: "true",
    validators: "true",
  });

  if (!product) {
    console.log("if !product = ", product);
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  //try {
  let id = req.params.id;
  console.log("req.params", req.params);
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
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
        avgRating: { $avg: "$rating" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
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

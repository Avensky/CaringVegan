// const AppError = require("../utils/appError");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require("./../models/product");
// const stripeController = require("./../controllers/stripe");
const crud = require("./crud");

exports.getProducts = crud.getAll(Product);
exports.getProduct = crud.getOne(Product);
// exports.createProduct = crud.createOne(Product);
// exports.updateProduct = crud.updateOne(Product);
exports.deleteProduct = crud.deleteOne(Product);

exports.archiveProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log("product id: ", id);

  try {
    const item = await Product.findByIdAndUpdate(id, { active: false });
    item.active = false;
    console.log("item: ", item);
    res.status(200).json({
      status: "success",
      message: "Archive product success",
      product: item,
    });
  } catch (err) {
    new AppError("Unable to Archive product", 401);
  }
});

exports.unarchiveProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log("product id: ", id);

  try {
    const item = await Product.findByIdAndUpdate(id, { active: true });
    item.active = true;
    console.log("item: ", item);

    res.status(200).json({
      status: "success",
      message: "Unarchive product success",
      product: item,
    });
  } catch (err) {
    new AppError("Unable to Unarchive product", 401);
  }
});

exports.migrateAllProducts = catchAsync(async (req, res, next) => {
  // console.log("migrate all products");
  console.log("migrate all products");
  // console.log("migrate all products", req.body);
  const products = req.body;

  for (let i = 0; products.length > i; i++) {
    const product = await Product.find({ id: products[i].id });
    console.log("products length: ", products.length);
    console.log("existing product ", product);
    console.log("existing product ", product.length);
    console.log("productId: ", products[i].id);
    const productObj = {
      id: products[i].id,
      object: products[i].object,
      active: products[i].active,
      attributes: products[i].attributes,
      created: new Date(products[i].created * 1000),
      default_price: {
        id: products[i].default_price.id,
        object: products[i].default_price.object,
        active: products[i].default_price.active,
        billing_scheme: products[i].default_price.billing_scheme,
        created: new Date(products[i].default_price.created * 1000),
        currency: products[i].default_price.currency,
        // custom_unit_amount: products[i].default_price.custom_unit_amount,
        livemode: products[i].default_price.livemode,
        // lookup_key: products[i].default_price.lookup_key,
        metadata: products[i].default_price.metadata,
        // nickname: products[i].default_price.nickname,
        product: products[i].default_price.product,
        recurring: products[i].default_price.recurring,
        tax_behavior: products[i].default_price.tax_behavior,
        // tiers_mode: products[i].default_price.tiers_mode,
        // transform_quantity: products[i].default_price.transform_quantity,
        type: products[i].default_price.type,
        unit_amount: products[i].default_price.unit_amount,
        unit_amount_decimal: products[i].default_price.unit_amount_decimal,
      },
      description: products[i].description,
      features: products[i].features,
      images: products[i].images,
      livemode: products[i].livemode,
      metadata: products[i].metadata,
      name: products[i].name,
      //   package_dimensions: products[i].package_dimensions,
      //   shippable: products[i].shippable,
      //   statement_descriptor: statement_descriptor,
      //   tax_code: products[i].tax_code,
      type: products[i].type,
      //   unit_label: products[i].unit_label,
      updated: new Date(products[i].updated * 1000),
      //   url: products[i].url,
    };

    if (product.length === 1) {
      console.log("update Product");
      const newProduct = await Product.findOneAndUpdate(
        { id: products[i].id },
        productObj
      );
      // product.save()
    } else {
      console.log("create new product");
      const newProduct = await Product.create(productObj);
    }
  }
  res.status(200).json({
    status: "success",
    products: products,
  });
});

exports.migrateProduct = catchAsync(async (req, res, next) => {
  //search id in database
  console.log("body", req.body);
  const existingProduct = await Product.find({ id: req.body.id });
  console.log("existing Product", existingProduct);
  const productObj = {
    id: req.body.id,
    object: req.body.object,
    active: req.body.active,
    attributes: req.body.attributes,
    created: new Date(req.body.created * 1000),
    default_price: {
      id: req.body.default_price.id,
      object: req.body.default_price.object,
      active: req.body.default_price.active,
      billing_scheme: req.body.default_price.billing_scheme,
      created: new Date(req.body.default_price.created * 1000),
      currency: req.body.default_price.currency,
      // custom_unit_amount: req.body.default_price.custom_unit_amount,
      livemode: req.body.default_price.livemode,
      // lookup_key: req.body.default_price.lookup_key,
      metadata: req.body.default_price.metadata,
      // nickname: req.body.default_price.nickname,
      product: req.body.default_price.product,
      recurring: req.body.default_price.recurring,
      tax_behavior: req.body.default_price.tax_behavior,
      // tiers_mode: req.body.default_price.tiers_mode,
      // transform_quantity: req.body.default_price.transform_quantity,
      type: req.body.default_price.type,
      unit_amount: req.body.default_price.unit_amount,
      unit_amount_decimal: req.body.default_price.unit_amount_decimal,
    },
    description: req.body.description,
    features: req.body.features,
    images: req.body.images,
    livemode: req.body.livemode,
    metadata: req.body.metadata,
    name: req.body.name,
    //   package_dimensions: req.body.package_dimensions,
    //   shippable: req.body.shippable,
    //   statement_descriptor: statement_descriptor,
    //   tax_code: req.body.tax_code,
    type: req.body.type,
    //   unit_label: req.body.unit_label,
    updated: new Date(req.body.updated * 1000),
    //   url: req.body.url,
  };

  if (existingProduct.length === 1) {
    console.log("update existing product");
    const newProduct = await Product.findOneAndUpdate(
      { id: req.body.id },
      productObj
    );
    console.log("newProduct", newProduct);
    const product = await Product.find({ id: req.body.id });
    console.log("Product", product[0]);
    res.status(201).json({
      status: "success",
      product: product[0],
    });
  } else {
    console.log("new product create");
    const newProduct = await Product.create(productObj);
    res.status(200).json({
      status: "success",
      product: newProduct,
    });
  }
});

// exports.getTopProducts = (req, res, next) => {
//   req.query.limit = "6";
//   req.query.sort = "price, rating";
//   // req.query.fields = "name, price, rating, desc, quantity";
//   next();
// };

// exports.getShop = catchAsync(async (req, res, next) => {
//   console.log("query: ", req.query);
//   console.log("active: ", req.query.active);
//   try {
//     const shop = await stripe.products.search({
//       expand: ["data.default_price", "total_count"],
//       query: `active:'${req.query.active}' AND metadata['default_price']:'4000'`,
//       // query: `active:'${req.query.active}' AND metadata['type']:'mug'`,
//     });
//     console.log("shop: ", shop);
//     res.status(200).json({
//       status: "success",
//       shop,
//     });
//   } catch (err) {
//     next(new AppError(err.message, err.statusCode, err.type));
//   }
// });

exports.getFeatured = catchAsync(async (req, res, next) => {
  try {
    const featured = await Product.find({
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

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1 CREATE NEW PRODUCT OBJ
  console.log("body ", req.body);
  console.log("req.file: ", req.file);

  let livemode = false;
  if (process.env.NODE_ENV === "production") {
    livemode = true;
  }

  const productObj = {
    active: true,
    // attributes:
    created: Date.now(),
    updated: Date.now(),
    default_price: {
      currency: "usd",
      unit_amount: req.body.unit_amount * 100,
      created: Date.now(),
    },
    description: req.body.description,
    livemode: livemode,
    metadata: {
      featured: req.body.featured,
      stock: req.body.stock,
      type: req.body.type,
      ratings_quantity: req.body.ratings_quantity,
      ratings_average: req.body.ratings_average,
    },
    name: req.body.name,
    // statement_descriptor: req.body.statement_descriptor,
    object: "Product",
  };
  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj

  // 2) CREATE PRODUCT
  try {
    const product = await Product.create(productObj);
    res.status(201).json({
      status: "success",
      data: { data: product },
    });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  // console.log("body: ", req.body);
  // console.log("metadata: ", req.body.metadata);
  // CREATE A PRODUCT OBJECT
  const productObj = {
    name: req.body.name,
    description: req.body.description,
    statement_descriptor: req.body.statement_descriptor,
    images: req.body.images,
    metadata: req.body.metadata,
  };

  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj

  const removeEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) newObj[key] = obj[key];
      // else if (obj[key] !== undefined) newObj[key] = obj[key];
      // if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
      // else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };

  let o = removeEmpty(productObj);

  // console.log("update object", productObj);
  console.log("updateProduct values", o);
  try {
    const product = await Product.updateOne({ _id: req.params.id }, o);
    // res.status(204).json({
    //   status: "success",
    //   data: {
    //     data: product,
    //   },
    // });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }

  let findProduct;
  try {
    findProduct = await Product.findById({ _id: req.params.id });
    console.log("product ", findProduct.metadata);
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: findProduct,
    },
  });
});

// exports.deleteProduct = catchAsync(async (req, res, next) => {
//   let id = req.params.id;
//   console.log("id = ", id);
//   const product = await Product.findById(id, { active: false });
//   if (!product) {
//     return next(new AppError("No product found with that ID", 404));
//   }

//   stripeProduct = await stripe.products.update(product.id);
//   console.log("stripe delete");

//   res.status(204).json({
//     status: "success",
//     data: stripeProduct.id,
//   });
// });

// exports.getProductStats = catchAsync(async (req, res, next) => {
//   const stats = await Product.aggregate([
//     {
//       $match: { rating: { $gte: 4 } },
//     },
//     {
//       $group: {
//         _id: "$type",
//         // avgRating: { $avg: "$rating" },
//         // minPrice: { $min: "$price" },
//         // maxPrice: { $max: "$price" },
//         // _id: { $toUpper: "$difficulty" },
//         // numTours: { $sum: 1 },
//         // numRatings: { $sum: "$ratingsQuantity" },
//         // avgRating: { $avg: "$ratingsAverage" },
//         // avgPrice: { $avg: "$price" },
//         // minPrice: { $min: "$price" },
//         // maxPrice: { $max: "$price" },
//       },
//     },
//     // {
//     //   $sort: { avgPrice: 1 },
//     // },
//     // {
//     //   $match: { _id: { $ne: 'EASY' } }
//     // }
//   ]);

//   res.status(200).json({
//     status: "success",
//     data: {
//       stats,
//     },
//   });
// });

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       stats,
//     },
//   });
// });

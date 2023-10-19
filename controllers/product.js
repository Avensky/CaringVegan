const Product = require("./../models/product");

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

exports.getProducts = async (req, res) => {
  try {
    console.log("req.query = ", req.query);
    // BUILD QUERY
    const queryObj = { ...req.query };
    // 1A) Filtering
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    // gte, gt, lte, lt must be rewriten
    // {type: 'mug', quantity: {gte: '10'}} //current string
    // {type: 'mug', quantity: {$gte: 10}} //mogoDB requirement
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    console.log("queryStr = ", queryStr);
    let query = Product.find(queryStr);

    // 2) Sorting
    if (req.query.sort) {
      console.log("sort ", req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      console.log("sortBy ", sortBy);
      query = query.sort(sortBy);
    } else {
      // default query
      console.log("sortBy Default");
      query = query.sort("-price");
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log("fields ", fields);
      // query = query.select("name desc price"); //syntax needed
      query = query.select(fields);
    } else {
      //default query
      console.log("default limit fields");
      query = query.select("-__v");
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    console.log("page ", page);
    const limit = req.query.limit * 1 || 2;
    console.log("limit ", limit);
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new Error("This page does not exist");
    }

    // EXECUTE QUERY
    const products = await query;
    // query.sort().select().skip().limit()

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  //try {
  console.log("req.params", req.params);
  const id = req.params.id;

  const product = await Product.find({ _id: id });
  res.status(200).json({
    status: "success",
    data: product,
  });

  // } catch (err) {
  //   res.status(500).json({
  //     status: false,
  //     error: err,
  //   });
  // }
};

exports.createProduct = async (req, res) => {
  console.log("req : ", req);
  console.log("createProduct : ", req.body);
  const productObj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    priceid: req.body.priceId,
    quantity: req.body.quantity,
    featured: req.body.featured,
    type: req.body.type,
    // imageData: req.file.key,
  };
  const newProduct = await Product.create(productObj);
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

exports.updateProduct = async (req, res) => {
  const productObj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    priceid: req.body.priceId,
    quantity: req.body.quantity,
    featured: req.body.featured,
    type: req.body.type,
    //    imageData: req.file.key,
  };

  let id = req.params.id;
  console.log("req.params", req.params);

  const updatedProduct = await Product.findByIdAndUpdate(id);
  res.status(204).json({
    status: "success",
    data: updatedProduct,
  });
};

exports.deleteProduct = async (req, res) => {
  //try {
  let id = req.params.id;
  console.log("req.params", req.params);
  await Product.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
  // } catch (err) {
  //   res.status(500).json({
  //     status: false,
  //     error: err,
  //   });
  // }
};

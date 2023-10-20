const Product = require("./../models/product");
const QueryAPI = require("./../utils/QueryAPI");
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
  // let filter = {};
  // if (req.params.id) filter = { product: req.params.id };

  try {
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
  } catch (err) {
    console.log("getProducts err = ", err);
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
    stock: req.body.stock,
    featured: req.body.featured,
    secret: req.body.secret,
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

exports.getProductStats = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getMonthlyPlan = async () => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

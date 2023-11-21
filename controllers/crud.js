const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const QueryAPI = require("../utils/QueryAPI");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("getAll: ", Model);
    // console.log("params: ", req.params);
    // To allow for nested GET reviews on product (hack)
    let filter = {};
    // if (req.params.productId) filter = { product: req.params.productId };

    const features = new QueryAPI(Model.find(filter), req.query)
      .filter()
      // .sort()
      // .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    let doc = await features.query;

    console.log("data TYPE: ", typeof doc);
    console.log("results: ", doc.length);
    console.log("doc: ", doc);

    console.log("query: ", req.query);
    const limit = req.query.limit;
    console.log("page: ", req.query.page);
    // const tot al_count = new QueryAPI(Model.count(filter));
    // doc = Object.entries(doc);
    // console.log("data TYPE: ", typeof doc);
    // console.log("data: ", doc);

    const count = new QueryAPI(Model.find(filter), req.query).countDocuments();
    const total_count = await count.query;
    console.log("total_count", total_count);
    let page = 1;
    if (req.query.page) {
      page = req.query.page * 1;
    }
    console.log("page ", page);
    console.log("total_count ", total_count);
    console.log("limit: ", limit);
    const total_pages = total_count / limit;
    console.log("total pages", total_pages);

    let has_more = false;

    let next_page = null;
    if (page < total_pages) {
      next_page = page + 1;
      has_more = true;
    }
    console.log("has_more, ", has_more);
    console.log("next_page ", next_page);

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      total_count,
      data: {
        data: doc,
        // starting_after,
        // ending_before,
        page,
        next_page,
        has_more,
      },
    });
  });

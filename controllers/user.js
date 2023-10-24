const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const QueryAPI = require("./../utils/QueryAPI");
const factory = require("./handlerFactory");

// =================================================================
// UPLOAD FOTO HELPERS =============================================
// =================================================================

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// =================================================================
// FILTER OBJECT ===================================================
// =================================================================

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// =================================================================
// Get Id ==========================================================
// =================================================================

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated like admin roles
  const filteredBody = filterObj(
    req.body,
    "username",
    "firstName",
    "middleName",
    "lastName",
    "email"
  );
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  console.log("delete me", req.user);
  const user = await User.findByIdAndUpdate(req.user._id, {
    $set: { "local.active": false },
  });
  console.log("user", user);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const queryAPI = new QueryAPI(User.findOne(), req.query);
  const user = await queryAPI.query;
  // query.sort().select().skip().limit()

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const queryAPI = new QueryAPI(User.find(req.params.id), req.query)
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

// Do NOT update passwords with this!
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
//factory.updateOne(User);

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

//factory.deleteOne(User);

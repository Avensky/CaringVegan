const AppError = require("./../utils/appError");
const aws = require("aws-sdk");
const aws3 = require("@aws-sdk/client-s3");
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;
const multer = require("multer");
const multerS3 = require("multer-s3");

// configure bucket
aws.config.update({ credentials: { accessKeyId, secretAccessKey, region } });

const s3 = new aws3.S3Client({
  credentials: { accessKeyId, secretAccessKey },
  region,
});

// set fileName and storage location
const storage = multerS3({
  s3: s3, // credentials, region
  acl: "public-read", // access control
  bucket: bucket, // storage bucket name
  // bucket: keys.bucket, // storage bucket name
  // bucket: process.env.BUCKET, // storage bucket name
  metadata: function (req, file, cb) {
    console.log("fieldName: ", file.fieldname);
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // console.log("file: ", file);
    const fileName = `${Date.now()}-${file.originalname}`; // filename
    console.log("fileName: ", fileName);
    cb(null, fileName);
  },
});

// check file type is image
const fileFilter = (req, file, cb) => {
  console.log("Checking file...");
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image.", 400), false);
  }
};

// ============================================================================
//  upload image
// ============================================================================
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 6 },
  fileFilter: fileFilter,
});

exports.uploadPhoto = (req, res, next) => {
  // Use multer upload instance
  upload.single("photo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

exports.uploadPhotos = (req, res, next) => {
  // Use multer upload instance
  upload.array("files", 8)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

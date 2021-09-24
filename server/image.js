const multer = require("multer");
const path = require("path");
let files
process.env.NODE_ENV === 'production'
    ? files = "./files/"
    : files = "./devFiles/"
 //image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, files);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname  + '-' + uniqueSuffix);
    }
});
// checking file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
//        cb(new Error('Not an image! Please upload an image.', 400), false);
        cb(null, false);
    }
};
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});
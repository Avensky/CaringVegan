// define constants
const aws               = require('aws-sdk');
const aws3              = require('@aws-sdk/client-s3')
const keys              = require('../config/keys')
const accessKeyId       = keys.s3_accessKeyId
const secretAccessKey   = keys.s3_secretAccessKey
const region            = keys.region
const multer            = require("multer");
const multerS3          = require('multer-s3')
//const s3       = new aws.S3({apiVersion: '2006-03-01'});

// configure bucket
aws.config.update({credentials : {accessKeyId,secretAccessKey,region}})
const s3 = new aws3.S3Client({
    credentials : {accessKeyId,secretAccessKey},
    region
});

// aws.config.update({
//     accessKeyId     : keys.s3_accessKeyId,
//     secretAccessKey : keys.s3_secretAccessKey,
//     region          : keys.region
// });

// set fileName and storage location
const storage = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: keys.bucket,
    metadata: function(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
});

// check file type
const fileFilter = (req, file, cb) => {
    console.log('Checking file...')
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
//        cb(new Error('Not an image! Please upload an image.', 400), false);
        cb(null, false);
    }
};

//configure multer
exports.upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 6},
    fileFilter: fileFilter
})
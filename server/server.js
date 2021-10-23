//==============================================================================
// set up server================================================================
//==============================================================================
const aws 		          = require('aws-sdk')
const keys                = require('./config/keys')
const express             = require('express')
const rateLimit           = require('express-rate-limit');
const helmet              = require('helmet');
const mongoSanitize       = require('express-mongo-sanitize');
const xss                 = require('xss-clean');
//const hpp                 = require('hpp');
const app                 = express()
const PORT                = process.env.PORT || 5000;
const LOCAL               = "127.0.0.1";
const bodyParser          = require('body-parser')
const compression         = require('compression');
//const cookieParser        = require('cookie-parser');
const cors                = require("cors");
const session             = require('cookie-session')
const passport            = require('passport')
const mongoose            = require('mongoose')
const multer              = require("multer");
const multerS3 		      = require('multer-s3')
const s3 		          = new aws.S3({apiVersion: '2006-03-01'});
const path                = require("path");
const shopController      = require("./controllers/shopController");
let   server              = app

aws.config.update({
    accessKeyId: keys.s3_accessKeyId,
    secretAccessKey: keys.s3_secretAccessKey,
    region: keys.region
});

if (process.env.NODE_ENV !== 'production') {
  // Development logging
  const morgan = require('morgan');
  app.use(morgan('dev'));

  // allow files to be stored in files directory
  app.use('/devFiles', express.static("devFiles"));
}

let files
process.env.NODE_ENV === 'production'
    ? files = "./files/"
    : files = "./devFiles/"

//image upload
const storage = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: keys.bucket,
//    destination: (req, file, cb) => { cb(null, files) },
//    metadata: function(req, file, cb) {
//        cb(null, {fieldName: file.fieldname});
//    },
    key: function(req, file, cb) {
        const uniqueSuffix = Date.now()+ '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix)
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

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 6},
    fileFilter: fileFilter
})

//==============================================================================
// configuration ===============================================================
//==============================================================================
require('./models/users');
require('./models/orders');
require('./models/shop');
require('./config/passport')(passport); // pass passport for configuration

mongoose.Promise = global.Promise;// connect to our database
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
  .then(connect => console.log('connected to mongodb'))
  .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}

// set up cors to allow us to accept requests from our client
app.use(cors());
app.options('*', cors());


// Set security HTTP headers
app.use(helmet());

// // Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// read cookies (needed for auth)
// app.use(cookieParser());

// required for passport
app.use(session({ 
  secret: 'ilovescotchscotchyscotchscotch',   // session secret
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 30*24*60*60*1000,
  }
})); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'price'
//     ]
//   })
// );
// 
app.use(compression());

// get information from html forms raw
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
	verify: (req, res, buf) => { req.rawBody = buf }
})) 

//==============================================================================
// routes ======================================================================
//==============================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/stripe.js')(app, passport); 
require('./routes/shop.js')(app);
//app.post("/api/addImage", upload.any(), shopController.createProduct);
//app.post("/api/addImage", upload.single('avatar'), shopController.createProduct);
const productRepository = require('./repository')
app.post("/api/addImage", upload.single('avatar'), async (req, res) => {
console.log('req = ',req)
console.log('body =',req.body)
try {
        let payload = {
            name        : req.body.name,
            desc        : req.body.desc,
            price       : req.body.price,
            priceid     : req.body.priceId,
            quantity    : req.body.quantity,
            featured    : req.body.featured,
            type        : req.body.type,
            imageData   : req.file.key
        }
        let product = await productRepository.createProduct({...payload});
        res.redirect('/shop')
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
})
//==============================================================================
// launch ======================================================================
//==============================================================================
if (process.env.NODE_ENV === 'production') {
// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static('../client/build'));

// Express will serve up the index.html file
// if it doesn't recognize the route
const path = require('path');
const filepath = path.join(__dirname, '../client/build/index.html');

app.get('*', (req, res) => {
    res.sendFile(filepath, function(err){
        if (err) {
            return res.status(err.status).end();
        } else {
            return res.status(200).end();
        }
    })

});
}


server.listen(PORT, LOCAL, (err) =>{
if(!err){
    console.log('server started running on: ' + PORT);
    console.log('server NODE_ENV: ' + process.env.NODE_ENV);
} else {
    console.log('unable to start server');}
})

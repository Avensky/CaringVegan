//==============================================================================
// set up server================================================================
//==============================================================================
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
const keys                = require('./config/keys')
let   server              = app

if (process.env.NODE_ENV !== 'production') {
  // const https = require('https');
  // const fs = require('fs');
  // 
  // const options = {
  //   "rejectUnauthorized": false,
  //   key: fs.readFileSync('../.cert/key.pem'), // Replace with the path to your key
  //   cert: fs.readFileSync('../.cert/cert.pem') // Replace with the path to your certificate
  // }
  // 
  // server = https.createServer(options, app)

  // Development logging
  const morgan = require('morgan');
  app.use(morgan('dev'));

  // allow files to be stored in files directory
  app.use('/devFiles', express.static("devFiles"));
}

app.use('/files', express.static("files"));
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

// allow files to be stored in files directory
app.use('/files', express.static("files"));

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
app.use(bodyParser.json({verify: (req, res, buf) => { req.rawBody = buf }})) 

//==============================================================================
// routes ======================================================================
//==============================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/stripe.js')(app, passport); 
require('./routes/shop.js')(app);

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

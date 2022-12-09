//define constants
const app       = require('./app');
const keys      = require('./config/keys')
const express   = require('express')

let local;
process.env.NODE_ENV === 'production' 
    ? local = "127.0.0.1"
    : local = keys.localPort 
    
const mongoose = require('mongoose')
const port     = process.env.port || 5000;

//connect to database
mongoose.Promise = global.Promise;// connect to our database
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
  .then(connect => console.log('Succesful connection to MongoDb'))
  .catch(err => console.log('💥Failure to connect to MongoDb', err))
module.exports = {mongoose}

// Serve production build 
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('./client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    const filepath = path.join(__dirname, './client/build/index.html');

    app.get('*', (req, res) => {
        res.sendFile(filepath, function(err){
            if (err) return res.status(err.status).end(); 
            else return res.status(200).end();
        })
    });
}

// start server
const server = app.listen(port, local, (err) =>{
    console.log('App running on port: ' + port);
//    console.log('server NODE_ENV: ' + process.env.NODE_ENV);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
  
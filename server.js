//define constants
const express = require("express");
const mongoose = require("mongoose");
console.log("No value for PORT yet:", process.env.PORT);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log("Now the value for PORT is:", process.env.PORT);
const app = require("./app");

//connect to database
mongoose.Promise = global.Promise; // connect to our database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connect) => console.log("Succesful connection to MongoDb"))
  .catch((err) => console.log("💥Failure to connect to MongoDb", err));
module.exports = { mongoose };

// Serve production build
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("./client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  const filepath = path.join(__dirname, "./client/build/index.html");

  app.get("*", (req, res) => {
    res.sendFile(filepath, function (err) {
      if (err) return res.status(err.status).end();
      else return res.status(200).end();
    });
  });
}

// start server
const server = app.listen(process.env.PORT, process.env.IP_ADDRESS, (err) => {
  console.log("App running on port: " + process.env.PORT);
  //    console.log('server NODE_ENV: ' + process.env.NODE_ENV);
});

// catch any and all unhandledRejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// shutdown after any failed try block due to unclean state
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
//   server.close(() => {
//     console.log("💥 Process terminated!");
//   });
// });

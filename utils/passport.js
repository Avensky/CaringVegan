// =============================================================================
// load all the things we need =================================================
// =============================================================================
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Email = require("../utils/email");
const crypto = require("crypto");

module.exports = function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================

  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function (req, email, password, done) {
        // asynchronous
        console.log("req ", req.body);
        process.nextTick(function () {
          User.findOne({ "local.email": email }, function (err, user) {
            // if there are any errors, return the error
            if (err) return done(err);

            // if no user is found, return the message
            if (!user)
              return done(null, false, { message: "Oops! Email not found." });

            console.log("user found: ", user);
            if (!user.verifyPassword(password, user.local.password))
              return done(null, false, { message: "Oops! Wrong password." });
            // all is well, return user
            else return done(null, user);
          }).select("+local.password");
        });
      }
    )
  );

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        //        proxy               : true
      },
      function (req, email, password, done) {
        console.log("user signup", req.body);

        // asynchronous
        process.nextTick(function () {
          //  Whether we're signing up or connecting an account, we'll need
          //  to know if the email address is in use.
          User.findOne({ "local.email": email }, (err, existingUser) => {
            // if there are any errors, return the error
            if (err) return done(err);

            // check to see if there's already a user with that email
            if (existingUser)
              return done(null, false, {
                message: "Oops! That email is already taken.",
              });

            //  If we're logged in, we're connecting a new local account.
            if (req.user) {
              // Create verify user token

              var user = req.user;
              const verifyToken = user.createVerifyToken();
              user.local.email = email;
              user.local.password = password;
              user.local.passwordConfirm = req.body.passwordConfirm;
              user.local.verifyToken = verifyToken;

              user.save(function (err) {
                if (err) throw err;
                console.log("save successful, sending verify email");
                let host;
                process.env.NODE_ENV
                  ? (host = req.get("host"))
                  : (host = "localhost:3000");
                const url = `${req.protocol}://${host}/profile/${verifyToken}`;
                console.log("email confirmation", url);

                new Email(email, url).sendWelcome();
                return done(null, user);
              });
            }
            //  We're not logged in, so we're creating a brand new user.
            else {
              // create the user
              var newUser = new User();

              const verifyToken = newUser.createVerifyToken();
              newUser.local.email = email;
              newUser.local.password = password;
              newUser.local.passwordConfirm = req.body.passwordConfirm;
              newUser.local.verifyToken;
              // save the user
              newUser.save(function (err) {
                if (err) throw err;
                // send welcome email / verify user

                console.log("sending email");
                let host;
                process.env.NODE_ENV
                  ? (host = req.get("host"))
                  : (host = "localhost:3000");
                const url = `${req.protocol}://${host}/profile/${verifyToken}`;
                console.log("email confirmation", url);

                new Email(email, url).sendWelcome();
                return done(null, newUser); // return the user
              });
            }
          });
        });
      }
    )
  );

  // =========================================================================
  // resetPassword ============================================================
  // =========================================================================
  passport.use(
    "local-reset",
    new LocalStrategy(
      {
        usernameField: "passwordConfirm",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        // proxy: true,
      },
      async function (req, passwordConfirm, password, done) {
        console.log("password = ", password);
        console.log("passwordConfirm", passwordConfirm);
        console.log("req.body", req.body);
        const hashedToken = crypto
          .createHash("sha256")
          .update(req.params.token)
          .digest("hex");
        console.log("hashedToken", hashedToken);

        // asynchronous
        process.nextTick(function () {
          //  Whether we're signing up or connecting an account, we'll need
          //  to know if the email address is in use.
          //  Get user based on the token
          User.findOne(
            {
              "local.passwordResetToken": hashedToken,
              "local.passwordResetExpires": { $gt: Date.now() },
            },
            (err, user) => {
              console.log("USER:", user);

              // if there are any errors, return the error
              if (err) return done(err);

              //  If no user then token was invalid
              if (!user) {
                console.log("no user");
                return done(null, false, {
                  message: "Oops! Token is invalid or has expired",
                });
              } else {
                // update password
                user.local.password = req.body.password;
                user.local.passwordConfirm = req.body.passwordConfirm;
                user.local.passwordResetToken = undefined;
                user.local.passwordResetExpires = undefined;
                // save the user
                user.save(function (err) {
                  if (err) throw err;
                  // send email
                  let host;
                  process.env.NODE_ENV
                    ? (host = req.get("host"))
                    : (host = "localhost:3000");
                  const url = `${req.protocol}://${host}/forgotPassword`;
                  console.log(url);
                  const email = user.local.email;
                  new Email(email, url).sendResetComfirmation();
                  return done(null, user); // return the user
                });
              }
            }
          );
        });
      }
    )
  );

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        profileFields: [
          "id",
          "displayName",
          "photos",
          "email",
          "first_name",
          "last_name",
        ],
        //        enableProof     : true,
        proxy: true,
      },
      function (req, token, refreshToken, profile, done) {
        // asynchronous
        console.log("req", req);
        process.nextTick(function () {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "facebook.id": profile.id }, function (err, user) {
              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err) return done(err);

              // if the user is found, then log them in
              if (user) {
                // if there is a user id already but no token (user was linked at one point and then removed)
                // just add our token and profile information
                if (!user.facebook.token) {
                  user.facebook.token = token;
                  user.facebook.name =
                    profile.name.givenName + " " + profile.name.familyName;
                  user.facebook.email = profile.emails[0].value;

                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user); // user found, return that user
              } else {
                // if there is no user, create them
                var newUser = new User();

                newUser.facebook.id = profile.id;
                newUser.facebook.token = token;
                newUser.facebook.name =
                  profile.name.givenName + " " + profile.name.familyName;
                newUser.facebook.email = profile.emails[0].value;

                newUser.save(function (err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session

            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name =
              profile.name.givenName + " " + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            user.save(function (err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );

  // =========================================================================
  // TWITTER =================================================================
  // =========================================================================
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function (req, token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function () {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "twitter.id": profile.id }, function (err, user) {
              if (err) return done(err);

              if (user) {
                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.twitter.token) {
                  user.twitter.token = token;
                  user.twitter.username = profile.username;
                  user.twitter.displayName = profile.displayName;

                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user); // user found, return that user
              } else {
                // if there is no user, create them
                var newUser = new User();

                newUser.twitter.id = profile.id;
                newUser.twitter.token = token;
                newUser.twitter.username = profile.username;
                newUser.twitter.displayName = profile.displayName;

                newUser.save(function (err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session

            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.username = profile.username;
            user.twitter.displayName = profile.displayName;

            user.save(function (err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function (req, token, refreshToken, profile, done) {
        // asynchronous
        console.log("profile", profile);
        process.nextTick(function () {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "google.id": profile.id }, function (err, user) {
              if (err) return done(err);

              if (user) {
                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.google.token) {
                  user.google.token = token;
                  user.google.name = profile.displayName;
                  user.google.email = profile.emails[0].value; // pull the first email

                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();

                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                newUser.save(function (err) {
                  if (err) throw err;
                });
                return done(null, newUser);
              }
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session

            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value; // pull the first email
            user.save(function (err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );
};

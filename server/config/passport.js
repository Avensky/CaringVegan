// =============================================================================
// load all the things we need =================================================
// =============================================================================
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy  = require('passport-twitter').Strategy;
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const mongoose         = require('mongoose')
const User             = mongoose.model('Users')
const keys             = require('./keys');

module.exports         = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message: 'Oops! Email not found.'});

                if (!user.validPassword(password))
                    return done(null, false, {message: 'Oops! Wrong password.'});
                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//        proxy               : true
    },
    function (req, email, password, done) {
        
        console.log('user signup');

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.email': email}, (err, existingUser) => {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, {message: 'Oops! That email is already taken.'});

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.user;
                    user.local.email    = email;
                    user.local.password = user.generateHash(password);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } 
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);
                    // save the user
                    console.log(newUser)
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    // =========================================================================
    // RESET PASSWORD ==========================================================
    // =========================================================================
    passport.use('reset-password', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        // define the parameter in req.body that passport can use as username and password
        usernameField : 'confirm_password',
        passwordField : 'password',
        passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log("req" + req.body)
        // console.log('email = ' + req.body.email)
        // console.log('password = ' + req.body.password)
        // asynchronous
        process.nextTick(function() {
            // 1) Get user based on the token
            //console.log('resetPassword start')
            //console.log('req.params.token',req.params.token)

            const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');
        
            //console.log('hashedToken',hashedToken)

            //User.findOne({ 'local.email' :  email }, function(err, user) {
            User.findOne({
                'local.passwordResetToken': hashedToken, 
                'local.passwordResetExpires': {$gt: Date.now() } 
            }, function(err, user) {
                //console.log('local email = ' + user.local.email)
                //console.log('local password = ' + user.local.password)
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message: 'Oops! Token is invalid or has expired'});

                else {
                    //console.log('user',user)
                    user.local.password = user.generateHash(req.body.password);
                    //user.local.passwordConfirm = req.body.confirm_password;
                    //console.log('req.body.password',req.body.password)
                    //console.log('req.body.confirm_password',req.body.confirm_password)
                    user.local.passwordResetToken = undefined;
                    user.local.passwordResetExpires = undefined;
                    user.save(function(err) {
                        if (err){
                            //throw err;
                            //console.log('user.save err',err)
                            return done(null, false, {message: err.message});
                        }
                        return done(null, user);
                    });
                    const url = `${req.protocol}://${req.get('host')}/authentication`;
                    //console.log(url);
                    const email = user.local.email
                    new Email(newUser, email, url).sendWelcome();
                }
            })
        });

    }));


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        clientID            : keys.facebookClientID,
        clientSecret        : keys.facebookClientSecret,
        callbackURL         : keys.facebookCallbackURL,
        passReqToCallback   : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        profileFields       : ['id', 'displayName', 'photos', 'email','first_name', 'last_name'],
//        enableProof     : true,
        proxy           : true
    },
    function (req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
        });
    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
        consumerKey       : keys.twitterConsumerKey,
        consumerSecret    : keys.twitterConsumerSecret,
        callbackURL       : keys.twitterCallbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new User();

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                 = req.user; // pull the user out of the session

                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID            : keys.googleClientID,
        clientSecret        : keys.googleClientSecret,
        callbackURL         : keys.googleCallbackURL,
        passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user          = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

};

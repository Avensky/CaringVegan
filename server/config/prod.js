const { region } = require("./dev");

module.exports = {
    emailUsername           : process.env.EMAIL_USERNAME,
    emailPassword           : process.env.EMAIL_PASSWORD,
    emailHost               : process.env.EMAIL_HOST,
    emailPort               : process.env.EMAIL_PORT,
    emailFrom               : process.env.EMAIL_FROM,
    
    sengridUsername         : process.env.SENDGRID_USERNAME,
    sengridPassword         : process.env.SENDGRID_PASSWORD,
    secretKey               : process.env.SECRET_KEY,

    checkoutSuccessUrl      : "https://www.uriza86.com/checkout",
    checkoutCancelUrl       : "https://www.uriza86.com/shop",

    secretKey               : process.env.SECRET_KEY,
    mongoURI                : process.env.MONGO_URI,
    cookieKey               : process.env.COOKIE_KEY,

    webhookSecret           : process.env.ENDPOINT_SECRET,
    stripePublishableKey    : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey         : process.env.STRIPE_SECRET_KEY,
    taxRates                : process.env.TAX_RATES,

    googleClientID          : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret      : process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackURL       : "https://www.uriza86.com/api/google/callback/",

    facebookClientID        : process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
    facebookCallbackURL     : "https://www.uriza86.com/api/facebook/callback/",

    twitterConsumerKey      : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret   : process.env.TWITTER_CONSUMER_SECRET,
    twitterCallbackURL      : "https://www.uriza86.com/api/twitter/callback/",
    
    accessKeyId             : process.env.S3_ACCESS_KEY_ID,
    secretAccessKey         : process.env.S3_SECRET_ACCESS_KEY,
    region                  : process.env.REGION,
    bucket                  : process.env.BUCKET,
}

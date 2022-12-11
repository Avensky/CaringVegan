module.exports = {
    stripePublishableKey    : process.env.STRIPE_PUBLISHABLE_KEY,
    taxRates                : process.env.TAX_RATES,

    proxyTarget: "http://localhost:3002" 
}

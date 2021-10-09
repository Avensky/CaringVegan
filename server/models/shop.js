//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose  = require('mongoose');

// define the schema for our user model
const productSchema = new mongoose.Schema({
    priceid: {
        type: String,
        required: [false, "Please include the product id"]
    },
    name: {
        type: String,
        required: [false, "Please include the product name"]
    },
    desc: {
        type: String,
        required: [false, "Please include the product description"]
    },
    price: {
        type: Number,
        required: [false, "Please include the product price"]
    },
    imageName: {
        type: String,
        required: false
    },
    imageData: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    sold: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    featured: {
        type: Boolean,
        required: false
    }
});

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

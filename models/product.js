const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    priceid: {
      type: String,
      required: [true, "Please include the product id"],
    },
    name: {
      type: String,
      required: [true, "Please include the product name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
    },
    slug: {
      type: String,
    },
    desc: {
      type: String,
      required: [false, "Please include the product description"],
    },
    price: {
      type: Number,
      required: [false, "Please include the product price"],
    },
    imageName: {
      type: String,
      required: false,
    },
    imageData: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    sold: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    secret: {
      type: Boolean,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//==========================================================================
// methods =================================================================
//==========================================================================

// Create a new virutal product attribute potentialCashout
productSchema.virtual("potentialCashout").get(function () {
  return this.stock * this.price;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("doc = ", doc);
  next();
});

// QUERY MIDDLEWARE
// Remove any product with secret attribute not equal to true
productSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });
  this.start = Date.now();
  next();
});

// Calculate how long it took for query to yield post
productSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// unshift any product with secret attribute not equal to true
productSchema.pre("aggregate", function (next) {
  console.log("aggregate", this);
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

// create the model for users and expose it to our app
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

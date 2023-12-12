const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    object: { type: String },
    active: { type: Boolean },
    // active: { type: Boolean, select: false },
    attributes: [String],
    created: { type: Date },
    default_price: {
      id: { type: String },
      object: { type: String },
      active: { type: Boolean },
      billing_scheme: { type: String },
      created: { type: Date },
      currency: { type: String },
      // custom_unit_amount: { type: String },
      livemode: { type: Boolean },
      // lookup_key: { type: String },
      metadata: { type: Object },
      // nickname: { type: String },
      product: { type: String },
      recurring: { type: Object },
      tax_behavior: { type: String },
      // tiers_mode: { type: String },
      // transform_quantity: { type: String },
      type: { type: String },
      unit_amount: { type: Number },
      unit_amount_decimal: { type: String },
    },
    description: {
      type: String,
      required: [false, "Please include the product description"],
      maxlength: [
        200,
        "product description should have less than or equal to 80 character",
      ],
    },
    features: { type: Array },
    images: { type: Array },
    livemode: { type: Boolean },
    metadata: {
      type: { type: String, required: false },
      stock: { type: Number, required: false },
      ratings_average: { type: Number },
      ratings_quantity: { type: Number, default: 0 },
      slug: { type: String },
      sold: { type: Number, required: false },
      featured: { type: Boolean, required: false, default: false },
      //   createdBy: [
      //     {
      //       type: mongoose.Schema.,
      //       ref: "User",
      //     },
      //   ],
    },
    name: {
      type: String,
      required: [true, "Please include the product name"],
      unique: false,
      trim: true,
      maxlength: [
        40,
        "A product name must have less or equal then 40 characters",
      ],
    },
    // package_dimensions: {
    //   height: { type: Number },
    //   length: { type: Number },
    //   weight: { type: Number },
    //   width: { type: Number },
    // },
    shippable: { type: Boolean },
    statement_descriptor: { type: String },
    tax_code: { type: String },
    type: { type: String },
    unit_label: { type: String },
    updated: { type: Date },
    url: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//==========================================================================
// methods =================================================================
//==========================================================================

// // tourSchema.index({ price: 1 });
// tourSchema.index({ price: 1, ratingsAverage: -1 });
// tourSchema.index({ slug: 1 });
// tourSchema.index({ startLocation: '2dsphere' });

// tourSchema.virtual('durationWeeks').get(function() {
//   return this.duration / 7;
// });

// // Virtual populate
// tourSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'tour',
//   localField: '_id'
// });

//==========================================================================
// methods =================================================================
//==========================================================================

// Create a new virutal product attribute potentialCashout
productSchema.virtual("potentialCashout").get(function () {
  return this.metadata.stock * this.metadata.price;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.metadata.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("doc = ", doc);
  next();
});

// QUERY MIDDLEWARE
// Remove any product with secret attribute not equal to true
productSchema.pre(/^find/, function (next) {
  this.find({ "metadata.secret": { $ne: true } });
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
  this.pipeline().unshift({ $match: { "metadata.secret": { $ne: true } } });
  console.log(this.pipeline());
  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Product", productSchema);

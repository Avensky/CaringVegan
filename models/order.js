const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String },
  object: { type: String },
  allow_promotion_codes: { type: Boolean },
  amount_subtotal: { type: Number },
  amount_total: { type: Number },
  billing_address_collection: { type: String },
  cancel_url: { type: String },
  client_reference_id: { type: String },
  currency: { type: String },
  customer: { type: String },
  customer_details: {
    email: { type: String },
    tax_exempt: { type: String },
    tax_ids: { type: Array },
  },
  customer_email: { type: String },
  livemode: { type: Boolean },
  locale: { type: String },
  metadata: { type: Array },
  mode: { type: String },
  payment_intent: { type: String },
  payment_method_types: [{ type: String }],
  payment_status: { type: String },
  setup_intent: { type: String },
  shipping: {
    address: {
      city: { type: String },
      country: { type: String },
      line1: { type: String },
      line2: { type: String },
      postal_code: { type: Number },
      state: { type: String },
    },
    name: { type: String },
  },
  shipping_address_collection: {
    allowed_countries: [{ type: String }],
  },
  submit_type: { type: String },
  subscription: { type: String },
  success_url: { type: String },
  total_details: {
    amount_discount: { type: Number },
    amount_tax: { type: Number },
  },
  sessionid: { type: String },
  userid: { type: String },
  line_items: [
    {
      id: { type: String },
      object: { type: String },
      amount_subtotal: { type: Number },
      amount_total: { type: Number },
      currency: { type: String },
      description: { type: String },
      price: {
        id: { type: String },
        object: { type: String },
        active: { type: Boolean },
        billing_scheme: { type: String },
        //created                 : {type          : Number},
        currency: { type: String },
        livemode: { type: Boolean },
        //lookup_key              : null,
        metadata: { type: Array },
        //nickname                : null,
        product: { type: String },
        //recurring               : null,
        // tiers_mode              : null,
        // transform_quantity      : null,
        type: { type: String },
        unit_amount: { type: Number },
        unit_amount_decimal: { type: String },
      },
      quantity: { type: Number },
    },
  ],
  date: { type: Date },
  //  object                : { type: String},
  //  desc                  : { type: String},
  //  price                 : { type: Number},
  //  image                 : { type: String},
  //  quantity              : { type: Number  },
  //  date                  : { type: Date},
  //  purchaseId            : { type: Number},
  //  customerId            : { type: Number },
  //
});

//==============================================================================
// methods =====================================================================
//==============================================================================

// create the model for users and expose it to our app
//const Orders = mongoose.model("Orders", ordersSchema);
module.exports = mongoose.model("Order", orderSchema);

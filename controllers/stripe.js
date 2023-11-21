// const Products = mongoose.model("Product");
const Email = require("../utils/email");
const AppError = require("../utils/appError");
const Stripe = require("stripe");
const catchAsync = require("./../utils/catchAsync");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET;
const orderController = require("./order");

// =============================================================================
// checkout ====================================================================
// =============================================================================

exports.checkout = catchAsync(async (req, res) => {
  console.log("checkout");
  // let body = req.body;

  const session = await stripe.checkout.sessions.create({
    // ui_mode: "embedded",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    payment_method_types: ["card"],
    line_items: req.body.items,
    mode: "payment",
    // success_url:`${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID`},
    success_url: process.env.CHECKOUT_SUCCESS_URL,
    cancel_url: process.env.CHECKOUT_CANCEL_URL,
  });

  if (!session)
    new AppError("stripe failed to create session", 400, "stripe error");

  let userid;
  req.body.userid ? (userid = req.body.userid) : null;
  // console.log("userid = ", userid);

  orderController.createOrder(res, session, userid);
});

exports.fulfillOrder = (req, session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);

  const url = `${req.protocol}://${req.get("host")}/home`;
  //console.log(url);
  const email = session.customer_details.email;
  const name = session.customer_details.name;

  // orderController.fulfillOrder(session);
  new Email(name, email, url).sendReceipt();
};

exports.emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

exports.webhook = catchAsync(async (req, res) => {
  console.log("webhook");
  // choco install stripe-cli
  // stripe listen --forward-to
  const payload = req.rawBody;
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    // console.log("event: ", event);
  } catch (err) {
    // console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("checkout.session.completed ", session.payment_status);
      // Save an order in your database, marked as 'awaiting payment'
      this.updateSession(req, res, session);

      // Check if the order is paid (e.g., from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's account.
      if (session.payment_status === "paid") {
        console.log("payment_status ", session.payment_status);
        this.fulfillOrder(req, session);
      }
      res.status(200).end();
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      console.log("session async_payment_succeeded");
      const session = event.data.object;

      // Fulfill the purchase...

      //console.log('session',session)
      const url = `${req.protocol}://${req.get("host")}/home`;
      //console.log(url);
      const email = session.customer_details.email;
      const name = session.customer_details.name;

      // orderController.fulfillOrder(session);
      new Email(name, email, url).sendReceipt();

      // TODO: fill me in
      console.log("Fulfilling order, sending email to ", email);
      res.status(200).end();
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      console.log("session async_payment_failed");

      // Send an email to the customer asking them to retry their order

      // emailCustomerAboutFailedPayment(session);

      //console.log('session',session)
      const url = `${req.protocol}://${req.get("host")}/cart`;
      //console.log(url);

      const email = session.customer_details.email;
      const name = session.customer_details.name;
      new Email(name, email, url).sendFailure();

      // TODO: fill me in
      console.log("Emailing customer failed payment", session);
      res.status(200).end();
      break;
    }
    default: {
      console.log("default");
      res.status(200).end();
    }
  }
});

// =============================================================================
//  ======================================================================
// =============================================================================

exports.updateSession = async (req, res, session) => {
  // TODO: fill me in
  //console.log("Creating order", session);
  const sessionRetrieve = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });
  console.log("sessionRetrieve ", sessionRetrieve);
  //console.log("sessionRetrieve line_items", sessionRetrieve.line_items);
  let line_items = sessionRetrieve.line_items.data.map((item) => {
    let line_item = {
      id: item.id,
      object: item.object,
      amount_subtotal: item.amount_subtotal,
      amount_total: item.amount_total,
      currency: item.currency,
      description: item.description,
      price: {
        id: item.price.id,
        object: item.price.object,
        active: item.price.active,
        billing_scheme: item.price.billing_scheme,
        //created                 : item.price.created,
        currency: item.price.currency,
        livemode: item.price.livemode,
        //lookup_key              : null,
        //metadata                : {},
        //nickname                : null,
        product: item.price.product,
        //recurring               : null,
        //tiers_mode              : null,
        //transform_quantity      : null,
        type: item.price.type,
        unit_amount: item.price.unit_amount,
        unit_amount_decimal: item.price.unit_amount_decimal,
      },
      quantity: item.quantity,
    };
    return line_item;
  });

  //    let products_update = line_items.map( item => {
  //      let product = Products.find({
  //          priceid : item.id
  //        },(err,doc)=>{
  //            if(doc)
  //                res.send('Product updated successfully!');
  //            else {
  //                res.err(err.message);
  //            }
  //        })
  //      return product
  //    })

  // increase items sold;
  // productsSold(line_items)

  // console.log('line_items = ' + JSON.stringify(line_items))
  orderController.updateOrder(req, res, session, line_items);
};

// =============================================================================
// Products ======================================================================
// =============================================================================

exports.getShop = catchAsync(async (req, res, next) => {
  console.log("query: ", req.query);
  console.log("active: ", req.query.active);
  try {
    const shop = await stripe.products.search({
      expand: ["data.default_price", "total_count"],
      query: `active:'${req.query.active}' AND metadata['default_price']:'4000'`,
      // query: `active:'${req.query.active}' AND metadata['type']:'mug'`,
    });
    console.log("shop: ", shop);
    res.status(200).json({
      status: "success",
      shop,
    });
  } catch (err) {
    next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.getFeatured = catchAsync(async (req, res, next) => {
  try {
    const featured = await stripe.products.search({
      expand: ["data.default_price", "total_count"],
      query: "metadata['featured']:'true'",
    });
    console.log("featured: ", featured);
    res.status(200).json({
      status: "success",
      featured,
    });
  } catch (err) {
    next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.getProducts = catchAsync(async (req, res, next) => {
  console.log("req.query", req.query);
  // console.log("req.query.starting_after", req.query.starting_after);

  const queryParams = {
    // include: ["data.prices"],
    expand: ["data.default_price", "total_count"],
    limit: req.query.limit,
    active: req.query.active,
    starting_after: req.query.starting_after,
    ending_before: req.query.ending_before,
    // shippable: true,
    // url: '',
  };

  console.log("queryParams ", queryParams);

  let prev = queryParams.ending_before;
  let getNext = queryParams.starting_after;

  let index = req.query.index * 1;
  console.log("index start= ", index);
  if (!queryParams.starting_after && !queryParams.ending_before) {
    index = 1;
  }

  if (queryParams.starting_after && req.query.has_more) {
    index += 1;
  }
  if (queryParams.ending_before && req.query.has_more) {
    index -= 1;
  }

  console.log("index= ", index);
  try {
    const products = await stripe.products.list(queryParams);

    let starting_after, ending_before;
    if (products) {
      starting_after = products.data.slice(-1).map((item) => item.id)[0];
      ending_before = products.data.slice(0).map((item) => item.id)[0];
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.data.length,
      products,
      starting_after,
      ending_before,
      index,
    });
  } catch (err) {
    // console.log("err ", err.message);
    // console.log("err ", err.statusCode);
    // console.log("err ", err.type);
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // console.log("req.params", req.params);
  // changed to findById to return error on wrong id
  // const product = await Product.findById(req.params.id);
  // console.log("product = ", product);

  try {
    const product = await stripe.products.retrieve(req.params.id, {
      expand: ["default_price"],
    });
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    console.log("err: ", err);
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1 CREATE NEW PRODUCT OBJ
  console.log("body ", req.body);
  console.log("req.file: ", req.file);

  const productObj = {
    name: req.body.name,
    description: req.body.description,
    default_price_data: {
      currency: req.body.currency,
      unit_amount_decimal: req.body.unit_amount_decimal,
    },
    statement_descriptor: req.body.statement_descriptor,
    metadata: {
      stock: req.body.stock,
      featured: req.body.featured,
      type: req.body.type,
      ratings_quantity: req.body.ratings_quantity,
      ratings_average: req.body.ratings_average,
    },
  };
  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj

  // 2) CREATE PRODUCT IN STRIPE
  try {
    const product = await stripe.products.create(productObj);
    if (!product) next(new AppError("PROBLEM CREATING PRODUCT", 500, "Error"));
    console.log("stripe product: ", stripeProduct);

    res.status(201).json({
      status: "success",
      product,
    });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  console.log("body: ", req.body);
  // CREATE A PRODUCT OBJECT
  const productObj = {
    name: req.body.name,
    description: req.body.description,
    default_price_data: {
      currency: req.body.currency,
      unit_amount_decimal: req.body.unit_amount_decimal,
    },
    statement_descriptor: req.body.statement_descriptor,
    images: req.body.images,
    metadata: {
      stock: req.body.stock,
      featured: req.body.featured,
      type: req.body.type,
      ratings_quantity: req.body.ratings_quantity,
      ratings_average: req.body.ratings_average,
    },
  };
  req.file ? (productObj.images = req.file.location) : null; // Add image url to Obj
  try {
    const product = await stripe.products.update(req.params.id, productObj);
    // console.log("stripeProduct ", product);
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    return next(new AppError(err.message, err.statusCode, err.type));
  }
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  console.log("id = ", id);
  const product = await Product.findById(id, { active: false });
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  stripeProduct = await stripe.products.update(product.id);
  console.log("stripe delete");

  res.status(204).json({
    status: "success",
    data: stripeProduct.id,
  });
});

// =============================================================================
// orders ======================================================================
// =============================================================================

exports.getOrders = (req, res) => {
  // let id = req.body;
  //console.log( 'id = ' + JSON.stringify(id))
  // Order.find(
  //   { $and: [{ userid: id._id }, { payment_status: "paid" }] },
  //   {},
  //   (err, doc) => {
  //     if (doc) res.json(doc);
  //     else {
  //       //res.err(err.message);
  //       res.status(404).send("Ops! Order not found");
  //     }
  //   }
  // ).sort({ date: -1 });
};

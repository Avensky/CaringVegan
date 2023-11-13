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

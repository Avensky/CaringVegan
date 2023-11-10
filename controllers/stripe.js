// const mongoose = require("mongoose");
const Order = require("./../models/order");
// const Products = mongoose.model("Product");
const Email = require("../utils/email");
const AppError = require("../utils/appError");
const Stripe = require("stripe");
const catchAsync = require("./../utils/catchAsync");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET;

exports.createOrder = catchAsync(async (session) => {
  // TODO: fill me in
  console.log("Creating order");
  // const sessionRetrieve = await stripe.checkout.sessions.retrieve(session.id, {
  //   expand: ["line_items"],
  // });
  // console.log("sessionRetrieve ", sessionRetrieve);
  // console.log("sessionRetrieve line_items", sessionRetrieve.line_items);
  // let line_items = sessionRetrieve.line_items.data.map((item) => {
  //   let line_item = {
  //     id: item.id,
  //     object: item.object,
  //     amount_subtotal: item.amount_subtotal,
  //     amount_total: item.amount_total,
  //     currency: item.currency,
  //     description: item.description,
  //     price: {
  //       id: item.price.id,
  //       object: item.price.object,
  //       active: item.price.active,
  //       billing_scheme: item.price.billing_scheme,
  //       //created                 : item.price.created,
  //       currency: item.price.currency,
  //       livemode: item.price.livemode,
  //       //lookup_key              : null,
  //       metadata: item,
  //       //nickname                : null,
  //       product: item.price.product,
  //       //recurring               : null,
  //       //tiers_mode              : null,
  //       //transform_quantity      : null,
  //       type: item.price.type,
  //       unit_amount: item.price.unit_amount,
  //       unit_amount_decimal: item.price.unit_amount_decimal,
  //     },
  //     quantity: item.quantity,
  //   };
  //   return line_item;
  // });
});
// =============================================================================
// checkout ====================================================================
// =============================================================================

exports.checkout = catchAsync(async (req, res, next) => {
  let body = req.body.items;
  console.log("checkout body = " + JSON.stringify(body));
  let userid = req.body.userid;

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    payment_method_types: ["card"],
    line_items: body,
    mode: "payment",
    success_url: process.env.CHECKOUT_SUCCESS_URL,
    cancel_url: process.env.CHECKOUT_CANCEL_URL,
  });

  // this.createOrder(res, session, userid);

  // } catch (err) {
  //   return next(
  //     new AppError(`${err.code}: ${err.message}`, err.statusCode, err.type)
  //   );
  // }

  //res.json({ id: session.id });
  // const orderObj = new Order({
  //   sessionid: session.id,
  //   userid: userid || null,
  //   date: new Date(),
  //   payment_status: "unpaid",
  // });

  // orderObj.save((err) => {
  //   if (err) {
  //     //console.log(err);
  //     res.send("Unable to save order data!");
  //   }
  //   //res.send('order data saved successfully!');
  //   else res.json({ id: session.id });
  // });
});

exports.fulfillOrder = (req, session) => {
  //console.log('session',session)
  const url = `${req.protocol}://${req.get("host")}/authentication`;
  //console.log(url);
  const email = session.customer_details.email;
  new Email(req.user, email, url).sendReceipt();
  // TODO: fill me in
  //console.log("Fulfilling order", session);
};

exports.emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

exports.webhook = catchAsync(async (req, res) => {
  // choco install stripe-cli
  // stripe listen --forward-to localhost:5000/webhook
  // stripe listen --forward-to 192.168.1.19:5000/webhook
  // stripe listen --forward-to 192.168.0.236:5000/webhook
  const payload = req.rawBody;
  console.log("payload", payload);

  const sig = req.headers["stripe-signature"];
  console.log("sig", sig);

  // let event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Successfully constructed event
  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("session completed");
      // Save an order in your database, marked as 'awaiting payment'
      //   shopController.updateSession(req, res, session);

      // Check if the order is paid (e.g., from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        //shopController.updateSession(req,res, session);
        // shopController.fulfillOrder(req, res, session);
      }

      break;
    }

    case "checkout.session.async_payment_succeeded": {
      console.log("session async_payment_succeeded");
      const session = event.data.object;

      // Fulfill the purchase...
      //fulfillOrder(session);

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      console.log("session async_payment_failed");
      // Send an email to the customer asking them to retry their order
      //emailCustomerAboutFailedPayment(session);

      break;
    }
    default: {
      res.status(200).json({
        status: "success",
        session,
      });
    }
  }

  res.status(200).json({
    status: "success",
    session,
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

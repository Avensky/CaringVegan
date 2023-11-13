const AppError = require("../utils/appError");
const Order = require("./../models/order");
const catchAsync = require("./../utils/catchAsync");

exports.createOrder = catchAsync(async (res, session, userid) => {
  // TODO: fill me in
  console.log("Creating order");
  const OrderObj = {
    sessionid: session.id,
    userid: userid || null,
    date: new Date(),
    payment_status: "unpaid",
  };

  const newOrder = await Order.create(OrderObj);
  if (!newOrder) new AppError("Unable to create order", 400, "db error");
  console.log(newOrder);

  res.json({ id: session.id });
});

exports.updateOrder = catchAsync(async (req, res, session, line_items) => {
  const OrderObj = {
    // id                            : session.id,
    // userid                        : body.id,
    date: new Date(),
    line_items: line_items,
    object: session.object,
    allow_promotion_codes: session.allow_promotion_codes,
    amount_subtotal: session.amount_subtotal,
    amount_total: session.amount_total,
    billing_address_collection: session.billing_address_collection,
    cancel_url: session.cancel_url,
    client_reference_id: session.client_reference_id,
    currency: session.currency,
    customer: session.customer,
    customer_details: {
      email: session.customer_details.email,
      tax_exempt: session.customer_details.tax_exempt,
      tax_ids: session.customer_details.tax_ids,
    },
    customer_email: session.customer_email,
    livemode: session.livemode,
    locale: session.locale,
    //metadata                      : session.metadata,
    mode: session.mode,
    payment_intent: session.payment_intent,
    payment_method_types: session.payment_method_types,
    payment_status: session.payment_status,
    setup_intent: session.setup_intent,
    //shipping                    : session.shipping,
    shipping: {
      address: {
        city: session.shipping.address.city,
        country: session.shipping.address.country,
        line1: session.shipping.address.line1,
        line2: session.shipping.address.line2,
        postal_code: session.shipping.address.postal_code,
        state: session.shipping.address.state,
      },
      name: session.shipping.name,
    },
    shipping_address_collection: session.shipping_address_collection,
    submit_type: session.submit_type,
    subscription: session.subscription,
    success_url: session.success_url,
    total_details: {
      amount_discount: session.total_details.amount_discount,
      amount_tax: session.total_details.amount_tax,
    },
  };

  const updateOrder = await Order.findOneAndUpdate(
    { sessionid: session.id },
    { $set: { OrderObj } }
  );

  if (!updateOrder)
    new AppError("Unable to update order data!", 400, "db error");
  console.log(updateOrder);

  res.send();
});

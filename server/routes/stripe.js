// load all the things we need
const mongoose          = require('mongoose')
const Orders            = mongoose.model('Orders')
const Products           = mongoose.model('Product')
const Stripe            = require('stripe')
const keys              = require('../config/keys')
const webhookSecret     = keys.webhookSecret
const stripe            = Stripe(keys.stripeSecretKey)
const Email             = require('../utils/email');

module.exports = function(app, passport) {
  const fulfillOrder = (req,session) => {
		//console.log('session',session)
		const url = `${req.protocol}://${req.get('host')}/authentication`;
		//console.log(url);
		const email = session.customer_details.email
		new Email(req.user, email, url).sendReceipt();
		// TODO: fill me in
		//console.log("Fulfilling order", session);
	}

  const createOrder =  async (session) => {
    // TODO: fill me in
    //console.log("Creating order", session);
    const sessionRetrieve = await stripe.checkout.sessions.retrieve(
      session.id, { expand: ['line_items'],},
    );
    console.log("sessionRetrieve ", sessionRetrieve);
    console.log("sessionRetrieve line_items", sessionRetrieve.line_items);
    let line_items = sessionRetrieve.line_items.data.map( item => {
      let line_item = {
        id                        : item.id,
        object                    : item.object,
        amount_subtotal           : item.amount_subtotal,
        amount_total              : item.amount_total,
        currency                  : item.currency,
        description               : item.description,
        price: {
          id                      : item.price.id,
          object                  : item.price.object,
          active                  : item.price.active,
          billing_scheme          : item.price.billing_scheme,
          //created                 : item.price.created,
          currency                : item.price.currency,
          livemode                : item.price.livemode,
          //lookup_key              : null,
          //metadata                : {},
          //nickname                : null,
          product                 : item.price.product,
          //recurring               : null,
          //tiers_mode              : null,
          //transform_quantity      : null,           
          type                    : item.price.type,
          unit_amount             : item.price.unit_amount,
          unit_amount_decimal     : item.price.unit_amount_decimal,
        },
        quantity                  : item.quantity
      }
      return line_item
    })

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

    const productsSold = (line_items) => {
      // console.log('line_items'+JSON.stringify(line_items))
      console.log('line_items length'+line_items.length)
      const length = line_items.length
      for (let i = 0; i < length; i++) {
        console.log('i = ',i)
        console.log('price.id = ',line_items[i].price.id)
        console.log('quantity = ',line_items[i].quantity)
        console.log('item = '+JSON.stringify(line_items[i]))
        let inc = line_items[i].quantity
        Products.findOneAndUpdate(
          { priceid : line_items[i].price.id }, 
          { $inc: { 
              sold : inc
            }
          },
          { new: true, useFindAndModify: false },(err,doc)=>{
            if(doc)
                console.log('Product updated successfully!');
            else {
              console.log(err.message);
            }
        }
        )
      }
    }
    productsSold(line_items)

    // console.log('line_items = ' + JSON.stringify(line_items))

    Orders.findOneAndUpdate({'sessionid' : session.id},{
    $set:{
      // id                            : session.id,
      //  userid                        : body.id,
        date                          : new Date(),
        line_items                    : line_items,
        object                        : session.object,                
        allow_promotion_codes         : session.allow_promotion_codes,
        amount_subtotal               : session.amount_subtotal,       
        amount_total                  : session.amount_total,          
        billing_address_collection    : session.billing_address_collection,
        cancel_url                    : session.cancel_url,            
        client_reference_id           : session.client_reference_id,
        currency                      : session.currency,              
        customer                      : session.customer,              
        customer_details : {
          email                       : session.customer_details.email,              
          tax_exempt                  : session.customer_details.tax_exempt,        
          tax_ids                     : session.customer_details.tax_ids              
        },
        customer_email                : session.customer_email,        
        livemode                      : session.livemode,
        locale                        : session.locale,                
        //metadata                      : session.metadata,
        mode                          : session.mode,
        payment_intent                : session.payment_intent,        
        payment_method_types          : session.payment_method_types,  
        payment_status                : session.payment_status,        
        setup_intent                  : session.setup_intent,          
        //shipping                    : session.shipping,
        shipping : {
          address: {
            city    	                : session.shipping.address.city, 
            country		                : session.shipping.address.country,
            line1	                    : session.shipping.address.line1,
            line2	                    : session.shipping.address.line2,
            postal_code 	            : session.shipping.address.postal_code,
            state   	                : session.shipping.address.state
          },
          name    	                  : session.shipping.name, 
        },        
        shipping_address_collection   : session.shipping_address_collection,
        submit_type                   : session.submit_type,
        subscription                  : session.subscription,       
        success_url                   : session.success_url,           
        total_details: { 
          amount_discount             : session.total_details.amount_discount,      
          amount_tax                  : session.total_details.amount_tax          
        }
      }
    },(err, doc) => {
      if(doc){
        //res.redirect('/profile')
        //res.send('updated successfully!');
      }
      else {
        console.log(err.message)
        //res.err(err.message);
      }
    })
  }
      
      const emailCustomerAboutFailedPayment = (session) => {
      // TODO: fill me in
      console.log("Emailing customer", session);

      }
  
        
      //app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
      app.post('/webhook', (req, res) => {
        // choco install stripe-cli
        // stripe listen --forward-to localhost:5000/webhook
        const payload = req.rawBody;
        //const payload = JSON.stringify(request.body);
        //const payload = request.rawBody;
        //console.log('rawBody' + JSON.stringify(payload))
        //console.log('webhook body' + JSON.stringify(req.body))
        //console.log('body' + JSON.stringify(req.body))
        //console.log('user = ' + req.user)
        const sig = req.headers['stripe-signature'];
        let event;
        try {
          //console.log('rawBody = ' + JSON.stringify(payload))
          //console.log('rawBody = ' + payload)
          //console.log('sig = ' + sig)
          //console.log('webhookSecret  = ' + webhookSecret )
          event = stripe.webhooks.constructEvent(payload, sig, webhookSecret )
        } catch (err) {
          console.log('Webhook Error = '+ err.message)
          return res.status(400).send(`Webhook Error: ${err.message}`)
      }
        
        // Successfully constructed event
        console.log('✅ Success:', event.id);
          
          switch (event.type) {
              case 'checkout.session.completed': {
            const session = event.data.object;
            // let body = req.body
            // let userid = req.body.userid
            // let shipping = req.body.address
            // console.log('webhook session = ' + JSON.stringify(session))
            // console.log('webhook userid = ' + JSON.stringify(userid))
            // console.log('webhook shipping = ' + JSON.stringify(shipping))
                // Save an order in your database, marked as 'awaiting payment'
            createOrder(session);
      
                // Check if the order is paid (e.g., from a card payment)
                //
                // A delayed notification payment will have an `unpaid` status, as
                // you're still waiting for funds to be transferred from the customer's
                // account.
                if (session.payment_status === 'paid') {
                  fulfillOrder(req, session);
                }
          
                break;
              }
          
              case 'checkout.session.async_payment_succeeded': {
                const session = event.data.object;
                                                                                                                                                                                                                                      
                // Fulfill the purchase...
                fulfillOrder(session);
          
                break;
              }
          
              case 'checkout.session.async_payment_failed': {
                const session = event.data.object;
          
                // Send an email to the customer asking them to retry their order
                emailCustomerAboutFailedPayment(session);
          
                break;
              }
            }
      });
  
  	//get all orders info from db
      app.post('/api/orders', (req,res) => {
          let id = req.body
          //console.log( 'id = ' + JSON.stringify(id))		
          Orders.find({$and:[
              { 'userid' : id._id},
              { 'payment_status' : 'paid'}
          ]},{}, (err,doc)=>{
              if(doc)
                  res.json(doc);
              else {
                  //res.err(err.message);
                  res.status(404).send('Ops! Order not found');
              }
          }).sort({ date: -1 })
      });
  
  // =============================================================================
  // checkout ===============================================================
  // =============================================================================
  
  app.post('/api/checkout', async (req, res) => {
      let body = req.body.items
      // console.log('checkout body = ' + JSON.stringify(body))
      let userid = req.body.userid
      // let shipping = req.body.address
      // let body = JSON.stringify(req.body.items)
      // console.log('checkout items = ' + JSON.stringify(body))
      // console.log('server userid = ' + JSON.stringify(userid))
      // console.log('server shipping = ' + JSON.stringify(shipping))
      
      const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',
          shipping_address_collection: {
              allowed_countries: ['US'],
          },
          payment_method_types: ['card'],
          line_items: body,
          mode: 'payment',
          success_url: keys.checkoutSuccessUrl,
          cancel_url: keys.checkoutCancelUrl,
      });
      //res.json({ id: session.id });
      const orderObj = new Orders({
          sessionid                     : session.id,
          userid                        : userid || null,
          date                          : new Date(),
          payment_status                : "unpaid",  
        })
        orderObj.save((err)=>{
          if(err){
          //console.log(err);
          res.send('Unable to save order data!');
          }
          else
          //res.send('order data saved successfully!');
          res.json({ id: session.id });
      })
      
  });

}

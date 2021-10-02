import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise;
process.env.NODE_ENV === 'production'
	? stripePromise = loadStripe('pk_live_51J8eeGGhmYf089672u6NJwvMPcEER5uaLCQ3eejbU8FNjl6MCe4JKK5DPp5AJF7OpAHFhgK2uhit046XhSnZUqMG00MQjPQoKZ')
	: stripePromise = loadStripe('pk_test_51J8eeGGhmYf08967atQfhNcWSsJpgUNfFCbL49tWBsPRhe30UedjKbYJDGkv1RI2tlRFmL1UbHxzSkOxDYQb0ufO00UU3w8gGA');
let taxRates;
process.env.NODE_ENV === 'production'
	? taxRates = 'txr_1JDZnwGhmYf08967zBVwcLgB'
	: taxRates = 'txr_1JB319GhmYf089678Co4Kjze'

export const purchaseContinueHandler = async (addedItems, isAuth, event) => {
    console.log('checkout start')        // Get Stripe.js instance
    const stripe = await stripePromise;
    let line_items = addedItems.map( item => {
        let data = {
            price       : item.priceid,
            quantity    : item.amount,
            tax_rates   : [taxRates]
        }
//        console.log('data = '+JSON.stringify(data))
        return data
    })

    let body 
    isAuth 
    ? body = JSON.stringify({items: line_items,userid: isAuth['_id']})
    : body = JSON.stringify({items: line_items})

    // Call your backend to create the Checkout Session
    const response = await fetch('/api/checkout', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body
    })

    const session = await response.json()
    console.log(session);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({sessionId: session.id});

    if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    console.log(result.error.message)
    }
};

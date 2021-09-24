import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_v4y6jC0D3v8NiKZpKLfjru4300g9fG6D5X');


export const purchaseContinueHandler = async (addedItems, isAuth, event) => {
    console.log('checkout start')        // Get Stripe.js instance
    const stripe = await stripePromise;

    let line_items = addedItems.map( item => {
        let data = {
            //currency    : 'usd',
            price       : item.priceid,
            //amount      : item.price*100,
            quantity    : item.amount,
            //name        : item.name,
            tax_rates: ['txr_1IFmGYELbEgFNgrjLX2kMXq6']
        }
//        console.log('data = '+JSON.stringify(data))
        return data
    })

    // Call your backend to create the Checkout Session
    const response = await fetch('/api/checkout', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            //currency: 'usd',
            items: line_items,
            userid: isAuth['_id']
        })
    })

    const session = await response.json()
    console.log(session);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
    sessionId: session.id,
    });

    if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    console.log(result.error.message)
    }
};

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Shop.module.css';
import Item from './Items/Item/Item'
import * as actions from '../../../store/actions/index';
import NewItem from './NewItem/NewItem'
import {useHistory} from 'react-router-dom'
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader'
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
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

const Purchase = props => { 
   
    const purchaseContinueHandler = async (addedItems, isAuth, event) => {
        console.log('checkout start')        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        let line_items = addedItems.map( item => {
            let data = {
                price       : item.priceid,
                quantity    : item.amount,
                tax_rates: [taxRates]
            }
             console.log('data = '+JSON.stringify(data))
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
    
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory()
    const addToCart = (id) => {props.addToCart(id)}
    const purchaseHandler = () => {
        props.isAuth ? setPurchasing(true) :history.push('/authentication')
    }
    const purchaseCancelHandler = () => {setPurchasing(false)}
    const viewCartHandler = () => {history.push('/cart')}
    let orderSummary = null
    if (props.addedItems) {
        orderSummary = <OrderSummary 
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={() => purchaseContinueHandler(props.addedItems, props.isAuth)}
        />;
    }
    let myShop 
    if(props.shop){
        myShop = props.items.map( item => {
        return( 
            <Item
                image       = {item.imageData}
                key         = {item._id}
                id          = {item._id}
                alt         = {item.title}
                title       = {item.title}
                link        = {"/shop/"}
                to          = "/"
                clicked     = {() => addToCart(item._id)}
                name        = {item.name}
                desc        = {item.desc}
                price       = {item.price}
                quantity    = {item.amount||0}
                add         = {true}
            />
        )}
    )}
    
    useEffect(() => {
        const getItems = async () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('Fetching Items')
            getItems() 
        }
    }, [])


    let view
    props.totalItems > 0
        ? view = viewCartHandler
        : view = null

    let checkout
    props.totalItems > 0
        ? checkout = purchaseHandler
        : checkout = null



    return(
        <div className='page-wrapper'>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
            {/* Title */}
            <div className="text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>
            <NewItem />
            <div className={classes.filterbar}>
                <div className={classes.Orderbar}>
                    <ul>
                        <li className={classes.OrderbarItem} id="#all"      onClick={()=> props.getItems()}                ><a href="#all"      >All      </a></li>
                        <li className={classes.OrderbarItem} id="#hat"      onClick={()=> props.getItemByType('hat')}      ><a href="#hat"      >Hats     </a></li>
                        <li className={classes.OrderbarItem} id="#shirt"    onClick={()=> props.getItemByType('shirt')}    ><a href="#shirt"    >Shirts   </a></li>
                        <li className={classes.OrderbarItem} id="#hoodie"   onClick={()=> props.getItemByType('hoodie')}   ><a href="#hoodie"   >Hoodies  </a></li>
                        <li className={classes.OrderbarItem} id="#stickers" onClick={()=> props.getItemByType('stickers')} ><a href="#stickers" >Stickers </a></li>
                        <li className={classes.OrderbarItem} id="#mug"      onClick={()=> props.getItemByType('mug')}      ><a href="#mug"      >Mugs     </a></li>
                    </ul>
                </div>
                
                <div className={classes.orderby} >
                
                    {/* <input className={classes.Search} type='text' placeholder="search the store" /> */}
                
                    <form className={classes.orderbyform}>
                        <select name="orderby" id="orderby">
                            <option disabled selected defaultValue='disabled' value='disabled'> -- Order By -- </option>
                            <option value="pricelo">Lowest price</option>
                            <option value="pricehi">Highest price</option>
                            <option value="date">Most recent</option>
                            <option value="sold">Most Popular</option>
                        </select>
                    </form>
                </div>
            </div>
            <CheckoutHeader
                totalItems={props.totalItems}
                total={props.total}
                viewTitle='View Cart'
                view={view}
                checkout={checkout}
                isAuth={props.isAuth}
            />
            <div className='page-body'>
                {myShop}
                {props.totalItems > 0
                    ?  (<button 
                            className='btn-primary btn'
                            type="button" role="link"
                            onClick={purchaseHandler}>{
                                props.isAuth 
                                    ? 'CONTINUE TO CHECKOUT' 
                                    : 'SIGN IN TO ORDER'}
                        </button>)
                    : null
                }
            </div>
        </div>
    )
} 

const mapStateToProps = state => {
    return {
        addedItems  : state.shop.addedItems,
        totalItems  : state.shop.totalItems,
        items       : state.shop.items,
        total       : state.shop.total,
        shop        : state.shop.shop,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (id)   =>{ dispatch(actions.addToCart(id))},
        getItems            : ()     =>{ dispatch(actions.getItems())},
        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
        loadShop            : (cart) =>{ dispatch(actions.loadShop(cart))},
        getItemByType       : (type) =>{ dispatch(actions.getItemByType(type))}
     }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);

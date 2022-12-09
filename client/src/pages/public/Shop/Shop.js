import React, { useState }  from 'react';
import { connect }          from 'react-redux';
import classes              from './Shop.module.css';
import Item                 from './Items/Item/Item';
import * as actions         from '../../../store/actions/index';
import {useHistory}         from 'react-router-dom';
import CheckoutHeader       from '../Checkout/CheckoutHeader/CheckoutHeader';
import OrderSummary         from '../OrderSummary/OrderSummary';
import Modal                from '../../../components/UI/Modal/Modal';
import { loadStripe }       from '@stripe/stripe-js';
import Dropdown             from 'react-dropdown';
import NewItem              from './NewItem/NewItem';
import Wrapper              from '../../../components/Wrapper/Wrapper';
import keys from '../../../config/keys';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
console.log('stipe key')
let stripePromise = loadStripe(keys.stripePublishableKey)

const Shop = props => { 
   
    const purchaseContinueHandler = async (addedItems, isAuth, event) => {
        console.log('checkout start')        // Get Stripe.js instance
        const stripe = await stripePromise;
        console.log('stripePromise')   
        let line_items = addedItems.map( item => {
            let data = {
                price       : item.priceid,
                quantity    : item.amount,
                tax_rates   : [keys.taxRates]
            }
             console.log('data = '+JSON.stringify(data))
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
        const result = await stripe.redirectToCheckout({sessionId: session.id,});
    
        if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message)
        }
    };
    
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory()

    const addToCart             = (id) => {props.addToCart(id)}
    const subtractQuantity      = (id) => {props.subtractQuantity(id);}
    const purchaseHandler       = ()   => {setPurchasing(true)}
    const purchaseCancelHandler = ()   => {setPurchasing(false)}
    const viewCartHandler       = ()   => {history.push('/cart')}

    let orderSummary = null
    if (props.addedItems) {
        orderSummary = <OrderSummary 
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={() => purchaseContinueHandler(props.addedItems, props.isAuth)}
        />;
    }

    let checkout
    props.totalItems > 0
        ? checkout = purchaseHandler
        : checkout = null

    const options = ['Lowest price', 'Highest price', 'Most recent', 'Most Popular'];
    const defaultOption = '-- Order By --';

    console.log(props.isAuth)
    let newitem
    if (props.isAuth){
        props.isAuth.role === 'admin' 
        ? newitem = <NewItem />
        : newitem = null
    }
    return(
        <Wrapper>
        <div className={['page-wrapper', classes.Shop].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>

            {/* Title */}
            <div className="text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>

            <CheckoutHeader
                totalItems={props.totalItems}
                total={props.total}
                viewTitle='View Cart'
                view={viewCartHandler}
                checkout={purchaseHandler}
                isAuth={props.isAuth}
            />

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
                <br />
                <Dropdown
                    options={options} 
                    //onClick={()=> props.orderBy(this.onSelect)}
                    onChange={(val)=> props.loadShop(val)}
                    value={defaultOption} 
                    placeholder="Select an option"
                />
            </div>
            {newitem}
            <div className='page-body'>
                {props.shop.map( item => {
                    return( 
                        <Item
                            image               = {item.imageData}
                            key                 = {item._id}
                            id                  = {item._id}
                            alt                 = {item.title}
                            title               = {item.title}
                            link                = {"/shop/"}
                            to                  = "/"
                            clicked             = {() => addToCart(item._id)}
                            addToCart           = {() => addToCart(item._id)}
                            subtractQuantity    = {() => subtractQuantity(item._id)}
                            name                = {item.name}
                            desc                = {item.desc}
                            price               = {item.price}
                            quantity            = {item.amount | 0}
                            add                 = {true}
                        />
                    )})}
                {props.totalItems > 0
                    ?  (<button 
                            className='btn-primary btn'
                            type="button" role="link"
                            onClick={purchaseHandler}>CONTINUE TO CHECKOUT</button>)
                    : null
                }
            </div>
        </div>
        </Wrapper>
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
        getItemByType       : (type) =>{ dispatch(actions.getItemByType(type))},
        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
        loadShop            : (cart) =>{ dispatch(actions.loadShop(cart))},
        orderBy             : (type) =>{ dispatch(actions.orderBy(type))},
        subtractQuantity    : (id)   =>{ dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Shop);

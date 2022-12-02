import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './ItemFull.module.css';
import * as actions from '../../../../store/actions/index';
//import Details from '../Details/Details';    
import {useHistory}     from 'react-router-dom'                                                         
import Item from './ItemDetails/ItemDetails'
import CheckoutHeader   from '../../Checkout/CheckoutHeader/CheckoutHeader'
import Review from '../ItemFull/Review/Review'
import Modal from '../../../../components/UI/Modal/Modal';
import OrderSummary from '../../OrderSummary/OrderSummary';
import {purchaseContinueHandler} from '../../../../utility/stripe'

const ItemFull = props => {
    //const [id, setId]       = useState(null);
    const [item, setItem]   = useState(null);
    //console.log('all items ', props.shop)

    const loadData = (paramId) =>{
        // console.log('pong')
        // console.log('all items ', props.shop)
        if (props.shop) {
            const itemId = props.shop.find(el => el._id === paramId);
            setItem(itemId);
        }
    }

    useEffect(() => {
        //console.log('params',props.match.params.itemId)
        if (props.cartLoaded===true){
            //console.log('ping')
            console.log('search for item')
            loadData(props.match.params.itemId)
        } 
    },[props.shop])

    const [purchasing, setPurchasing] = useState(false);

    const history = useHistory()
    
    const handleClick           = (id) => {props.addToCart(id); }
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
            purchaseContinued={()=>purchaseContinueHandler(props.addedItems, props.isAuth)}
        />;
    }
 
    let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
    if ( props.match.params.id ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;}

    if (item) {
        details = <Item
            class               = 'ItemFull'
            myClass             = 'ItemFullColumn'
            imgClass            = 'ItemFullImg'
            image               = {item.imageData}
            id                  = {item._id}
            key                 = {item._id}
            alt                 = {item.title}
            title               = {item.title}
            link                = {"/shop/itemfull/" + item.id}
            to                  = "/"
            clicked             = {() => handleClick(item.id)}
            addToCart           = {() =>addToCart(item._id)}
            subtractQuantity    = {() =>subtractQuantity(item._id)}
            name                = {item.name}
            desc                = {item.desc}
            price               = {item.price}
            quantity            = {item.amount||0}
            stock               = {item.quantity}
            sold                = {item.sold}
        />
    }

    let reviews 
    let rating = 4.65
    item
        ? reviews = <Review 
                        username    = 'Poly'
                        rating      = {rating}
                        date        = ''
                        item        = 'Bee yourself T-shirt'
                        review      = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'                    
                    />
        : reviews = <p>Be the first to review this product.</p>

    let checkout
    props.totalItems > 0
        ? checkout = purchaseHandler
        : checkout = null

    return(
        <div className={['page-wrapper', classes.ItemFull].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
        
            <div className="text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>
            <CheckoutHeader
                totalItems={props.totalItems}
                total={props.total}
                viewTitle='View Cart'
                view={viewCartHandler}
                checkout={checkout}
                isAuth={props.isAuth}
            />
            
            <div className='page-body'>
                {details}
            </div>
            <div className={classes.Bar}>
                <b>Reviews ({props.review || 0})</b>
                <button className={classes.reviewBtn}>
                    Add Review
                </button>
            </div>
            <div className={classes.Reviews}>
                {reviews}
            </div>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        items       : state.shop.items,
        addedItems  : state.shop.addedItems,
        totalItems  : state.shop.totalItems,
        total       : state.shop.total,
        shop        : state.shop.shop,
        isAuth      : state.auth.payload,
        cartLoaded  : state.shop.cartLoaded,
        shopLoaded  : state.shop.shopLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) },
        subtractQuantity    : (id)     =>{ dispatch(actions.subtractQuantity(id))}

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);
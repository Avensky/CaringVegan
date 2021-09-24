import React, {useState} from 'react';
import { connect } from 'react-redux'
import classes from './Cart.module.css'
//import Item from '../Shop/Items/Item/Item'
import CartItem from './CartItem/CartItem';
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader';
import {purchaseContinueHandler} from '../../../utility/stripe'

const Cart = props => {
    const [purchasing, setPurchasing]   = useState(false);
    const history                       = useHistory()
    const handleRemove                  = (id)=>{ props.removeItem(id)}
    const addToCart                     = (id)=>{ props.addToCart(id)}
    const subtractQuantity              = (id)=>{ props.subtractQuantity(id);}
    const viewCartHandler               = () => {history.push('/shop')}
    const purchaseHandler = () => {
        props.isAuth ? setPurchasing(true) :history.push('/authentication')
    }
    const purchaseCancelHandler         = () => {setPurchasing(false)}
    
    let orderSummary = null
    if (props.addedItems) {
        orderSummary = <OrderSummary 
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={()=>purchaseContinueHandler(props.addedItems, props.isAuth)}
        />;
    }

    let cartList = props.addedItems;
        let myCart 
        if(cartList.length){
            myCart = cartList.map( item => {
            return( 
                <CartItem
                    image               = {item.imageData}
                    handleRemove        = {() =>handleRemove(item._id)}
                    addToCart           = {() =>addToCart(item._id)}
                    subtractQuantity    = {() =>subtractQuantity(item._id)}
                    key                 = {item._id}
                    id                  = {item._id}
                    alt                 = {item.title}
                    title               = {item.title}
                    link                = {"/shop/"}
                    to                  = "/"
                    desc                = {item.desc}
                    name                = {item.name}
                    price               = {item.price}
                    quantity            = {item.amount||0}
                    add                 = {true}
                />
            )}
        )}
        
        return(
            <div className={['page-wrapper', classes.Cart].join(' ')}>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
            
                {/* Title */}
                <div className="text-center">
                    <h1><a href="/cart">Shopping Cart</a></h1>
                </div>
                <CheckoutHeader
                    totalItems={props.totalItems}
                    total={props.total}
                    viewTitle='View Shop'
                    view={viewCartHandler}
                    checkout={purchaseHandler}
                    isAuth={props.isAuth}
                />
                <div className='page-body'>
                    {myCart}
            
                    {props.total ? <div className='header'><h3>Subtotal = ${props.total}</h3></div> : null}
                    {props.totalItems  > 0
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



const mapStateToProps = (state)=>{
    return{
        addedItems   : state.shop.addedItems,
        total        : state.shop.total,
        totalItems   : state.shop.totalItems,
        isAuth       : state.auth.payload
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadCart         : (cart)   =>{ dispatch(actions.loadCart(cart))},
        removeItem       : (id)     =>{ dispatch(actions.removeItem(id))},
        addToCart        : (id)     =>{ dispatch(actions.addToCart(id))},
        subtractQuantity : (id)     =>{ dispatch(actions.subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
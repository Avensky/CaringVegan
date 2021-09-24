import React, {useState} from 'react';
import { connect } from 'react-redux'
import classes from './Cart.module.css'
//import Item from '../Shop/Items/Item/Item'
import Auxiliary from '../../../hoc/Auxiliary'
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader';
import {purchaseContinueHandler} from '../../../utility/stripe'

const Cart = props => {
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory()
    const handleRemove              = (id)=>{ props.removeItem(id)}
    const addToCart                 = (id)=>{ props.addToCart(id)}
    const handleSubtractQuantity    = (id)=>{ props.subtractQuantity(id);}
    const viewCartHandler = () => {history.push('/shop')}
    const purchaseHandler = () => {
        props.isAuth ? setPurchasing(true) :history.push('/authentication')
    }
    const purchaseCancelHandler = () => {setPurchasing(false)}
    
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
    //console.log("cartList"+cartList)
    let addedItems = cartList.length ?
        (  
            cartList.map(item=>{
                return(
                    <div className={classes.Cart} key={item._id}>
                        {/* Product */}
                        <div className={classes.Item}>
                            {/* Remove */}
                            <div className={classes.Remove}>
                                <i className="material-icons" onClick={()=>{handleRemove(item._id)}}>clear</i>
                            </div>

                            {/* Image */}
                            <div className={classes.CardThumbnail}>
                                <img src={'http://localhost:5000/'+item.imageData} alt={item.alt} />
                            </div>
                            
                            {/* Description */}
                            <div className={classes.CardDescription}>
                                <b><span className="title">{item.title}</span></b>
                                <p>{item.desc}</p>
                            </div>

                            {/* Quantity */}
                            <div className={classes.CardQuantity}>
                                <i className={["material-icons", classes.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleSubtractQuantity(item._id)}}>arrow_drop_down</i>
                                <p><b>{item.amount}</b></p>
                                <i className={["material-icons", classes.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{addToCart(item._id)}}>arrow_drop_up</i>                                   
                            </div>

                            {/* Price */}
                            <div className={classes.CardPrice}><b> ${item.price}</b></div>
                        </div>
                    </div>
                )
            })
        )
        :null


        
        return(
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                <div className={[classes.Card, classes.Shop].join(' ')}>
                    <div className={classes.Cart}>
                        {/* Title */}
                        <div className={["page-header text-center"].join(' ')}>
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
                        <div className={classes.Collection}>
                            {addedItems}
                            {props.total ? <h3>Subtotal = ${props.total}</h3> : null}
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
                </div>
            </Auxiliary>
       )
    }



const mapStateToProps = (state)=>{
    return{
        addedItems   : state.cart.addedItems,
        total        : state.cart.total,
        totalItems   : state.cart.totalItems,
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
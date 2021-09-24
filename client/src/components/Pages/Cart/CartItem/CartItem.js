import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CartItem.module.css';

//{classes.CardThumbnail}
const CartItem = props => {
    return  (
    <div className={classes.Item} key={props.id}>
        {/* Product */}

            {/* Remove */}
            <div className={classes.Remove}>
                <h2><i className="fa fa-trash" onClick={props.handleRemove} /></h2>
            </div>
            
            {/* Image */}
            <div className={classes.CardThumbnail}>
                <Link to={'/shop/itemfull/' + props.id}>
                    <img src={'http://localhost:5000/'+props.image} alt={props.alt}/>
                </Link>
            </div>
            
            {/* Description */}
            <div className={classes.CardDescription}>
                <p>{props.desc}</p>
            </div>

            {/* Name */}
            <div className={classes.CardName}>
                <b>{props.name}</b>
            </div>

            {/* Quantity */}
            <div className={classes.CardQuantity}>
                <i className={["material-icons", classes.MaterialIcons, classes.noselect].join(' ')} 
                    onClick={props.subtractQuantity}>arrow_drop_down</i>
                <p><b>{props.quantity}</b></p>
                <i className={["material-icons", classes.MaterialIcons, classes.noselect].join(' ')} 
                    onClick={props.addToCart}>arrow_drop_up</i>                                   
            </div>

            {/* Price */}
            <div className={["text-center", classes.CardPrice].join(' ')}><p><b>${props.price.toFixed(2)}</b></p></div>
        
    </div>
)}

export default CartItem;
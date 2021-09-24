import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Item.module.css';

//{classes.CardThumbnail}
const item = props => {
    let url
    process.env.NODE_ENV === 'production'
        ? url = 'https://localhost:3000/'
        : url = 'http://localhost:5000/'
      
    return  (
    <div className={classes.Item} key={props.id}>
        {/* Image */}
        <div className={classes.CardThumbnail}>
            <Link to={'/shop/itemfull/' + props.id}>
                <img src={url+props.image} alt={props.alt}/>
            </Link>
        </div>
        
        {/* Description */}
        <div className={classes.CardDescription}>
            <p className={classes.CardTitle}><b>{props.name}</b></p>
            <p>{props.desc}</p>
        </div>

        {/* Quantity */}
        <div className={classes.CardQuantity}>
            <p><b>{props.quantity}</b></p>
            {props.add === true
                ? <i className={["material-icons", classes.MaterialIcons, classes.noselect].join(' ')}onClick={props.clicked}>add</i>
                : null
            }
        </div>

        {/* Price */}
        <div className={["text-center", classes.CardPrice].join(' ')}><p><b>${props.price}</b></p></div>
    </div>
)}
export default item;
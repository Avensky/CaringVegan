import React from 'react';
import { connect }      from 'react-redux'
import classes from './Home.module.css';
import * as actions     from '../../../store/actions/index'
import myImg from '../../../assets/images/bike-stickers-image-3.jpg';
import Item from '../Shop/Items/Item/Item';
import { NavLink } from 'react-router-dom';
const Home = (props) => {
    const addToCart             = (id) => {props.addToCart(id)}
    const subtractQuantity      = (id) => {props.subtractQuantity(id);}

    let shop = props.shop.filter(item => item.featured === true)
    let featured = shop.map( item => {
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
        )})
    
    return(
        <div className={[classes.Home].join(' ')}>
            <div class={classes.centered}>
                <div className={classes.title}><b>CHANGE THE WORLD WITH CARING HEARTS.</b></div>
                <div className={classes.description}>Help spread awareness with our products. Show the world what we stand for. 
                </div>
                <div className={classes.shop}>
                    <NavLink to="/shop"><b>Shop Now</b></NavLink>
                </div>
            </div>
            <div className={classes.BackgroundWrapper}>
            <img src={myImg} />
            </div>
            <div className={classes.statement}>
                <p>Lets work together to make this a better world for everyone.</p>
            </div>
            <div className={['page-wrapper', classes.PageWrapper].join(' ')}> 
                <div className="text-center">
                    <h1>Featured Products</h1>
                </div>
                <div className='page-body'>
                    {featured}
                </div>
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
        getItemByType       : (type) =>{ dispatch(actions.getItemByType(type))},
        orderBy             : (type) =>{ dispatch(actions.orderBy(type))},
        subtractQuantity    : (id)   =>{ dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);
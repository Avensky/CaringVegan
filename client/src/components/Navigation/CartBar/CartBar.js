import React from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import PropTypes from "prop-types";
import classes from "./CartBar.module.css";
import { NavLink } from "react-router-dom";

const CartBar = (props) => {
  let attachedClasses = [classes.CartBar, classes.Close];
  if (props.open) {
    attachedClasses = [classes.CartBar, classes.Open];
  }
  let cart = <p>Cart is empty. So sad</p>;
  if (props.cart && props.cart.length > 0) {
    cart = props.cart.map((item) => {
      return (
        <div key={item._id} className={classes.item}>
          <div className={classes.image}>
            <img
              src={
                "https://caring-vegan.s3.us-west-2.amazonaws.com/" +
                item.imageData
              }
            />
          </div>
          <div className={classes.details}>
            <div>{item.name}</div>
            <div>{item.desc}</div>
            <div>Qty:{item.orderAmt}</div>
            <div>${item.price}</div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <Backdrop
        show={props.open}
        clicked={props.closed}
        marginTop={props.marginTop}
      />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.content}>
          <div className={classes.heading}>
            <div className={classes.title}>Shopping Cart</div>
            <div className={classes.x} onClick={props.closed}>
              X
            </div>
          </div>
          <div className={classes.cartWrapper}>{cart}</div>
          <div className={classes.buttons}>
            <button
              className={
                props.cart.length === 0
                  ? [classes.button, classes.disabled, classes.checkout].join(
                      " "
                    )
                  : [classes.button, classes.checkout].join(" ")
              }
              disabled={props.cart.length == 0 ? true : false}
              onClick={props.checkout}
            >
              Checkout
            </button>
            <NavLink
              className={[classes.button].join(" ")}
              to="/cart"
              onClick={props.closed}
            >
              <button className={classes.viewCart}>View Cart</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

CartBar.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
  marginTop: PropTypes.string,
  cart: PropTypes.array,
  checkout: PropTypes.func,
};

export default CartBar;

import React from "react";
import classes from "./CheckoutHeader.module.css";
import PropTypes from "prop-types";

const CheckoutHeader = (props) => {
  let itemString = "item";
  if (props.totalItems !== 1) {
    itemString = "items";
  }
  let totalItems = props.totalItems || 0;
  let total = props.total || 0;
  const header = (
    <div className={classes.dualGrid}>
      <div className={[classes.dualBtn, classes.dualLeft].join(" ")}>
        {props.totalItems ? (
          <p className="one-line">
            Cart Subtotal ({totalItems} {itemString}): ${total}
          </p>
        ) : null}

        {/*<p className='one-line'>Add $5.21 to get FREE U.S. Shipping</p>*/}
      </div>
      <div className={[classes.dualBtn, classes.dualRight].join(" ")}>
        <button className="btn-primary btn one-line" onClick={props.view}>
          {props.viewTitle}
        </button>
        {totalItems > 0 ? (
          <button className="btn-primary btn one-line" onClick={props.checkout}>
            Checkout
          </button>
        ) : null}
      </div>
    </div>
  );
  return header;
};
CheckoutHeader.propTypes = {
  totalItems: PropTypes.number,
  viewTitle: PropTypes.string,
  total: PropTypes.number,
  view: PropTypes.func,
  checkout: PropTypes.func,
};
export default CheckoutHeader;

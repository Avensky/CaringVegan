import React, { useState } from "react";
import classes from "./Cart.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../components/UI/Modal/Modal";

const Cart = (props) => {
  // define functions
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const showModal = (id) => {
    console.log("id", id);
    setModal(true);
    setId(id);
  };
  const hideModal = () => {
    setModal(false);
    setId("");
  };

  const addToCart = async (id) => await props.addToCart(id);

  const subQuantity = async (id, cartAmount) => {
    if (cartAmount === 1) {
      showModal(id);
    } else await props.subQuantity(id);
  };

  const removeFromCart = async () => {
    hideModal();
    await props.removeFromCart(id);
  };
  const onCheckout = async (cart, user) => props.onCheckout(cart, user);

  let orderSummary = <></>;

  props.cart.length > 0
    ? (orderSummary = (
        <div className={classes.OrderSummary}>
          <div className={classes.OrderDetails}>
            <div className={classes.OrderDetailsSection}>
              <div className={classes.SubtotalLabel}>Subtotal</div>
              <div className={classes.SubTotal}>
                ${(props.total / 100).toFixed(2)}
              </div>
            </div>
            <div className={classes.OrderDetailsSection}>
              <div className={classes.ShippingLabel}>Shipping</div>
              <div className={classes.Shipping}></div>
            </div>
            <div className={classes.OrderDetailsTotal}>
              <div className={classes.TotalLabel}>TOTAL (USD)</div>
              <div className={classes.Total}>
                ${(props.total / 100).toFixed(2)}
              </div>
            </div>
            <div
              className={classes.Checkout}
              onClick={() => onCheckout(props.cart, props.user)}
            >
              CHECKOUT
            </div>
          </div>
        </div>
      ))
    : null;

  let cart = <p>Nothing here. So sad.</p>;

  if (props.cart.length > 0) {
    cart = props.cart.map((item) => {
      return (
        <div key={item.id} className={classes.Item}>
          {/* Item Data */}
          <div className={classes.ItemData}>
            <div className={classes.ImageWrapper}>
              {/* Image */}
              <NavLink
                to={"/product/" + item.id}
                className={classes.ImageContainer}
              >
                <img src={item.images[0]} />
              </NavLink>
            </div>
            {/* Details */}
            <div className={classes.Details}>
              {/* Name */}
              <div className={classes.Name}>{item.name}</div>
              {/* Description */}
              <div className={classes.Description}>{item.description}</div>
              {/* Price */}
              <div className={classes.PriceWrapper}>
                <span className={classes.Price}>Price:</span>
                <span>
                  {"$"}
                  {(item.default_price.unit_amount / 100).toFixed(2)}
                </span>
              </div>
              <div className={classes.PriceWrapper}>
                <span className={classes.ItemTotal}>Total:</span>
                <span>
                  {"$"}
                  {(
                    (item.default_price.unit_amount * item.cartAmount) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing section */}
          <div className={classes.Pricing}>
            {/* Quantity */}
            <div className={classes.QuantityWrapper}>
              <div className={classes.Quantity}>
                <div
                  className={classes.QuantityModifierL}
                  onClick={() => subQuantity(item.id, item.cartAmount)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-minus" />
                </div>
                <div className={classes.QuantityAmount}>{item.cartAmount}</div>
                <div
                  className={classes.QuantityModifierR}
                  onClick={() => addToCart(item)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </div>
              </div>
            </div>
            <div className={classes.Options}>
              <div
                className={classes.Remove}
                onClick={() => showModal(item.id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                <span className={classes.delete}>Delete</span>
              </div>
              <div className={classes.save}>Save for later</div>
            </div>
            {/* Remove Item*/}
          </div>
        </div>
      );
    });
  }
  return (
    <div className={["page-wrapper", classes.Cart].join(" ")}>
      <Modal show={modal} modalClosed={hideModal}>
        <div className={classes.Modal}>
          <h1>Are you sure you want to delete this item?</h1>
          <div className={classes.buttonsWrapper}>
            <div
              className={[classes.Button, classes.RemoveButton].join(" ")}
              onClick={(id) => removeFromCart(id)}
            >
              OK
            </div>
            <div
              className={[classes.Button, classes.CancelButton].join(" ")}
              onClick={hideModal}
            >
              CANCEL
            </div>
          </div>
        </div>
      </Modal>
      <div className="page-title">Cart</div>
      <div className={classes.CartWrapper}>{cart}</div>
      {/* <div className={classes.Bar}></div> */}
      {orderSummary}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
    total: state.product.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
    subQuantity: (id) => {
      dispatch(actions.subQuantity(id));
    },
    removeFromCart: (id) => {
      dispatch(actions.removeFromCart(id));
    },
    onCheckout: (cart, user) => {
      dispatch(actions.checkout(cart, user));
    },
  };
};

Cart.propTypes = {
  cart: PropTypes.array,
  addToCart: PropTypes.func,
  subQuantity: PropTypes.func,
  removeFromCart: PropTypes.func,
  total: PropTypes.number,
  onCheckout: PropTypes.func,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

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
  const subQuantity = async (id) => await props.subQuantity(id);
  const removeFromCart = async () => {
    hideModal();
    await props.removeFromCart(id);
  };
  // const onCheckout = async (cart, user) => props.onCheckout(cart, user);

  // let orderSummary = <></>;

  // props.cart.length > 0
  //   ? (orderSummary = (
  //       <div className={classes.OrderSummary}>
  //         <div className={classes.OrderDetails}>
  //           <div className={classes.OrderDetailsSection}>
  //             <div className={classes.SubtotalLabel}>Subtotal</div>
  //             <div className={classes.SubTotal}>${props.totalPrice}</div>
  //           </div>
  //           <div className={classes.OrderDetailsSection}>
  //             <div className={classes.ShippingLabel}>Shipping</div>
  //             <div className={classes.Shipping}></div>
  //           </div>
  //           <div className={classes.OrderDetailsTotal}>
  //             <div className={classes.TotalLabel}>TOTAL(USD)</div>
  //             <div className={classes.Total}>${props.totalPrice}</div>
  //           </div>
  //           <div
  //             className={classes.Checkout}
  //             onClick={() => onCheckout(props.cart, props.user)}
  //           >
  //             CHECKOUT
  //           </div>
  //         </div>
  //       </div>
  //     ))
  //   : null;

  let cart = <p>Nothing here. So sad.</p>;

  if (props.cart.length > 0) {
    cart = props.cart.map((item) => {
      return (
        <div key={item.id} className={classes.Item}>
          {/* Item Data */}
          <div className={classes.ItemData}>
            {/* Remove Item*/}
            <div className={classes.Remove} onClick={() => showModal(item.id)}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </div>

            {/* Image */}
            <NavLink
              to={"/product/" + item.id}
              className={classes.ImageWrapper}
            >
              <img src={item.images[0]} />
            </NavLink>
            {/* Details */}
            <div className={classes.Details}>
              {/* Name */}
              <div className={classes.Name}>{item.name}</div>
              {/* Description */}
              <div className={classes.Description}>{item.description}</div>
            </div>
          </div>

          {/* Pricing section */}
          <div className={classes.Pricing}>
            {/* Price */}
            <div className={classes.Price}>Price ${item.price.unit_amount}</div>

            {/* Quantity */}
            <div className={classes.QuantityWrapper}>
              <div className={classes.QuantityLabel}>Qty:</div>
              <div className={classes.Quantity}>
                <div
                  className={classes.QuantityModifier}
                  onClick={() => subQuantity(item.id)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-minus" />
                </div>
                <div className={classes.QuantityAmount}>{item.cartAmount}</div>
                <div
                  className={classes.QuantityModifier}
                  onClick={() => addToCart(item)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className={classes.ItemTotal}>
              Total ${item.price.unit_amount * item.cartAmount}
            </div>
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
      {/* {orderSummary} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
    totalPrice: state.product.totalPrice,
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
  totalPrice: PropTypes.number,
  onCheckout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

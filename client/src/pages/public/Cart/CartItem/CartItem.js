import React from "react";
import { Link } from "react-router-dom";
import classes from "./CartItem.module.css";
import PropTypes from "prop-types";

//{classes.CardThumbnail}
const CartItem = (props) => {
  const url = "https://caring-vegan.s3.us-west-2.amazonaws.com/";

  return (
    <div className={classes.Item} key={props.id}>
      {/* Product */}

      {/* Remove */}
      <div className={classes.Remove}>
        <h2>
          <i className="fa fa-trash" onClick={props.handleRemove} />
        </h2>
      </div>

      {/* Image */}
      <div className={classes.CardThumbnail}>
        <Link to={"/shop/itemfull/" + props.id}>
          <img src={url + props.image} alt={props.alt} />
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
        <i
          className={[
            "material-icons",
            classes.MaterialIcons,
            classes.noselect,
          ].join(" ")}
          onClick={props.subtractQuantity}
        >
          arrow_drop_down
        </i>
        <p>
          <b>{props.quantity}</b>
        </p>
        <i
          className={[
            "material-icons",
            classes.MaterialIcons,
            classes.noselect,
          ].join(" ")}
          onClick={props.addToCart}
        >
          arrow_drop_up
        </i>
      </div>

      {/* Price */}
      <div className={["text-center", classes.CardPrice].join(" ")}>
        <p>
          <b>${props.price.toFixed(2)}</b>
        </p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.any,
  handleRemove: PropTypes.any,
  image: PropTypes.any,
  alt: PropTypes.any,
  desc: PropTypes.any,
  name: PropTypes.any,
  subtractQuantity: PropTypes.any,
  quantity: PropTypes.any,
  addToCart: PropTypes.any,
  price: PropTypes.any,
};
export default CartItem;

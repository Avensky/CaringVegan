import React from "react";
import { Link } from "react-router-dom";
import classes from "./Item.module.css";

//{classes.Thumbnail}

const item = (props) => {
  //   const url = "https://caring-vegan.s3.us-west-2.amazonaws.com/";

  let stock;
  if (props.stock > 11) {
    stock = (
      <p>
        <b>In Stock:</b> 10+
      </p>
    );
  }
  if (props.stock < 11 && props.stock > 0) {
    stock = (
      <p>
        <b>In Stock:</b> {props.stock}
      </p>
    );
  }
  if (props.stock === 0) {
    stock = (
      <p>
        <b>Out of stock:</b>
      </p>
    );
  }

  let sold;
  props.sold
    ? (sold = (
        <div className={classes.Sold}>
          <p>Sold: {props.sold}</p>
        </div>
      ))
    : (sold = null);
  let mystock;
  props.stock
    ? (mystock = <div className={classes.Stock}>{stock}</div>)
    : (mystock = null);

  // quantity = (<div className={classes.QuantityWrapper}>
  //                 <b><p>Quantity: </p></b>
  //                 <div className={classes.Quantity}>
  //                     <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')}
  //                         onClick={props.subtractQuantity}>arrow_drop_down</i>
  //                     <p>{props.quantity}</p>
  //                     <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')}
  //                         onClick={props.addToCart}>arrow_drop_up</i>
  //                 </div>
  //             </div>)
  //    let reviews = <div className={classes.Reviews}>
  //        <p className={classes.Title}>{rating} Reviews({props.reviews || 0})</p>
  //    </div>

  return (
    <div className={[classes.Item, props.class].join(" ")}>
      {/* Name */}
      <div className={[classes.Name, props.class, "Name"].join(" ")}>
        <Link to={props.link + "/" + props.id}>{props.name}</Link>
      </div>
      {/* Image */}
      {props.url ? (
        <div className={classes.Thumbnail}>
          {/* <Link to={props.link + "/" + props.id}> */}
          <img className={props.imgClass} src={props.url} alt={props.alt} />
          {/* </Link> */}
        </div>
      ) : null}

      <div className={props.myClass}>
        {/* Description */}
        {props.description ? (
          <div className={[classes.Description, props.class].join(" ")}>
            {props.description}
          </div>
        ) : null}

        {/* Price */}
        {props.price ? (
          <div className={classes.Price}>
            ${(props.price.unit_amount / 100).toFixed(2)} {props.price.currency}
          </div>
        ) : null}

        {/* Reviews */}

        {/* Quantity */}

        {/* Stock */}
        {mystock ? mystock : null}

        {/* Sold */}
        {props.sold ? sold : null}

        {/* Select */}
        {props.options ? (
          <div
            className={[classes.SelectWrapper]} /*onClick={props.addToCart}*/
          >
            <Link to={props.link + "/" + props.id}>
              <div
                className={["text-center noselect", classes.Select].join(" ")}
              >
                Select Options
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default item;

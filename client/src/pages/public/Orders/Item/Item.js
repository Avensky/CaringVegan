import React from "react";
import classes from "./Item.module.css";

//{classes.CardThumbnail}
const item = (props) => {
  return (
    <div className={classes.Item} key={props.id}>
      {/* Description */}
      <div className={classes.CardDescription}>
        <p className={classes.CardTitle}>{props.title}</p>
      </div>

      {/* Quantity */}
      <div className={classes.CardQuantity}>
        <p>x{props.quantity}</p>
        {props.add === true ? (
          <i
            className={[
              "material-icons",
              classes.MaterialIcons,
              classes.noselect,
            ].join(" ")}
            onClick={props.clicked}
          >
            add
          </i>
        ) : null}
      </div>

      {/* Price */}
      <div className={["text-center", classes.CardPrice].join(" ")}>
        <p>${props.price}</p>
      </div>
    </div>
  );
};
export default item;

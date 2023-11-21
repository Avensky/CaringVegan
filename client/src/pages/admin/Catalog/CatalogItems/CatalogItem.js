import React from "react";
import PropTypes from "prop-types";
import classes from "./CatalogItems.module.css";
import { formatPrice, formatDate } from "../../../../utility/utility";
import { Tooltip } from "react-tooltip";
const CatalogItem = (props) => {
  const noImage =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/iStock-1416208685.jpg";
  return (
    <div key={props.id} className={classes.itemWrapper}>
      <div className={classes.imageWrapper}>
        <img className={classes.image} src={props.images[0] || noImage} />
      </div>
      <div className={classes.details}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{formatPrice(props.price)}</div>
      </div>
      <div className={classes.created}>{formatDate(props.created)}</div>
      <div className={classes.updated}>{formatDate(props.updated)}</div>
      <div className={classes.edit}>
        <Tooltip content="Tooltip Content" style={classes.tooltip}>
          ...
        </Tooltip>
      </div>
    </div>
  );
};

CatalogItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  name: PropTypes.string,
  unit_amount: PropTypes.number,
  price: PropTypes.number,
  created: PropTypes.string,
  updated: PropTypes.string,
};

export default CatalogItem;

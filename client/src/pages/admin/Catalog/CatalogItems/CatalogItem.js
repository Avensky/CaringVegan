import React from "react";
import PropTypes from "prop-types";
import classes from "./CatalogItems.module.css";
import { formatPrice, formatDate } from "../../../../utility/utility";
import { NavLink } from "react-router-dom";

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
      <div className={classes.editWrapper}>
        <NavLink to={props.editLink} className={classes.edit}>
          Edit
        </NavLink>
        {/* <div>Archive</div> */}
        <div onClick={props.continue}>Archive</div>
        <div onClick={() => {}} className={classes.delete}>
          Delete
        </div>
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
  created: PropTypes.any,
  updated: PropTypes.any,
  delete: PropTypes.func,
  editLink: PropTypes.string,
  continue: PropTypes.func,
};

export default CatalogItem;

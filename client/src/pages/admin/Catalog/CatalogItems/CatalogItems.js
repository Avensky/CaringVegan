import React from "react";
import PropTypes from "prop-types";
import classes from "./CatalogItems.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import CatalogItem from "./CatalogItem";

const CatalogItems = (props) => {
  let items = <p className={classes.items}>Nothing to show.</p>;
  if (props.loading) {
    items = <Spinner />;
  }

  // console.log("items: ", props.items);
  if (props.items.length > 0) {
    items = props.items.map((item) => {
      let price;
      if (item.price) {
        price = item.price;
      }
      if (item.default_price) {
        price = item.default_price.unit_amount;
      }

      let id;
      if (item.id) {
        id = item.id;
      }
      if (item._id) {
        id = item._id;
      }

      return (
        <CatalogItem
          key={id}
          id={id}
          editLink={`${props.product}${id}`}
          images={item.images}
          name={item.name}
          details={item.details}
          created={item.created}
          updated={item.updated}
          price={price}
          continue={props.continue}
          type={props.type}
          archive={props.archive}
          delete={props.delete}
        />
      );
    });
  }
  return (
    <div className={classes.CatalogItemsWrapper}>
      <div className={[classes.itemWrapper, classes.table].join(" ")}>
        <div className={classes.imageWrapper} />
        <div className={classes.details}>Details</div>
        <div className={classes.created}>Created</div>
        <div className={classes.updated}>Updated</div>
        <div className={classes.edit}></div>
      </div>
      {items}
    </div>
  );
};

CatalogItems.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  delete: PropTypes.func,
  deleteHandler: PropTypes.func,
  product: PropTypes.string,
  continue: PropTypes.func,
  type: PropTypes.string,
  archive: PropTypes.func,
};

export default CatalogItems;

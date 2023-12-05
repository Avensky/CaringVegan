import React from "react";
import classes from "./ImageRow.module.css";
import ImageSlider from "../../../../components/ImageSlider/ImageSlider";
import { formatPrice } from "../../../../utility/utility";
import PropTypes from "prop-types";
import Button from "../../../../components/UI/Button/Button";

const ImageRow = (props) => {
  return (
    <div className={classes.HeaderWrapper}>
      <div className={classes.left}>
        <div className={classes.thumbnail}>
          {props.item.images.length > 0 ? (
            <ImageSlider images={props.item.images} />
          ) : null}
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.details}>
          {props.item.name ? (
            <div className={classes.name}>{props.item.name}</div>
          ) : null}
          {props.item.default_price ? (
            <div className={classes.price}>
              {formatPrice(props.item.default_price.unit_amount)}
            </div>
          ) : null}
        </div>
        <div className={classes.copy}>
          {" "}
          <Button type="rounded" onClick={() => {}}>
            Copy to MongoDB
          </Button>
        </div>

        <div className={classes.edit}>Edit</div>
        <div
          className={classes.archive}
          onClick={() => props.setShowModal(true)}
        >
          Archive
        </div>
        <div className={classes.delete} onClick={() => {}}>
          Delete
        </div>
      </div>
    </div>
  );
};

ImageRow.propTypes = {
  setShowModal: PropTypes.func,
  item: PropTypes.object,
};

export default ImageRow;

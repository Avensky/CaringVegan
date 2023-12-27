import React from "react";
import classes from "./Pricing.module.css";
import { formatPrice, formatDate } from "../../../../utility/utility";
import PropTypes from "prop-types";
import Button from "../../../../components/UI/Button/Button";

const Pricing = (props) => {
  let content;
  if (props.item.default_price) {
    content = (
      <div className={classes.priceSubWrapper}>
        <div className={classes.row}>
          <div className={classes.label}>Price</div>
          <div className={classes.price}>
            $
            {props.item.default_price.unit_amount
              ? formatPrice(props.item.default_price.unit_amount)
              : null}
          </div>
        </div>

        {props.item.default_price.id ? (
          <div className={classes.row}>
            <div className={classes.label}>App Id</div>

            <div className={classes.priceId}>{props.item.default_price.id}</div>
          </div>
        ) : null}
        {props.item.default_price.created ? (
          <div className={classes.row}>
            <div className={classes.label}>Created</div>
            <div className={classes.priceCreated}>
              {formatDate(props.item.default_price.created, props.type)}
            </div>
          </div>
        ) : null}

        {props.item.admin ? (
          <div className={classes.row}>
            <div className={classes.label}>Admin</div>
            <div className={classes.priceAdmin}>Admin</div>
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={classes.priceWrapper}>
      <div className={classes.detailsWrapper}>
        <div className={classes.detailsLeft}>Pricing</div>
        <div className={classes.detailsRight}>
          <Button
            type="rounded"
            onClick={() => {}}
            disabled={true}
            style="Disabled"
          >
            + Add another price
          </Button>
        </div>
      </div>
      {content}
    </div>
  );
};

Pricing.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default Pricing;

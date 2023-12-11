import React from "react";
import classes from "./Pricing.module.css";
import { formatPrice, formatDate } from "../../../../utility/utility";
import PropTypes from "prop-types";
import Button from "../../../../components/UI/Button/Button";

const Pricing = (props) => {
  //   let pricing;
  //   if (props.item) {
  //     pricing = (
  //       <div className={classes.priceSubWrapper}>
  //         <div className={classes.Price}>
  //           {formatPrice(props.item.default_price.unit_amount)}
  //         </div>
  //         <div className={classes.priceId}>{props.item.default_price.id}</div>
  //         <div className={classes.priceCreated}>
  //           {formatDate(props.item.default_price.created)}
  //         </div>
  //         <div className={classes.priceAdmin}>
  //           <div className={classes.priceLabel}>Pricing</div>
  //           <div className={classes.priceLabel}>Edit</div>
  //           <div className={classes.priceLabel}>Arvhice price</div>
  //           <div className={classes.priceLabel}>Delete</div>
  //           <div className={classes.priceLabel}>Accept Payments</div>
  //           <div className={classes.priceLabel}>{"Create payment link ->"}</div>
  //         </div>
  //       </div>
  //     );
  //   }

  let modifier = 1;
  if (props.type === "stripe") {
    modifier = 1000;
  }
  return (
    <div className={classes.priceWrapper}>
      <div className={classes.detailsWrapper}>
        <div className={classes.detailsLeft}>Pricing</div>
        <div className={classes.detailsRight}>
          <Button type="rounded" onClick={() => {}}>
            + Add another price
          </Button>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Price</div>
        <div className={classes.price}>
          {props.item.default_price
            ? formatPrice(props.item.default_price.unit_amount)
            : null}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>App Id</div>
        {props.item.default_price ? (
          <div className={classes.priceId}>{props.item.default_price.id}</div>
        ) : null}
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Created</div>
        <div className={classes.priceCreated}>
          {props.item.default_price
            ? formatDate(props.item.default_price.created * modifier)
            : null}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Admin</div>
        <div className={classes.priceAdmin}>Admin</div>
      </div>
    </div>
  );
};

Pricing.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default Pricing;

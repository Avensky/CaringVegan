import React from "react";
import PropTypes from "prop-types";
import classes from "./Details.module.css";
import Button from "../../../../components/UI/Button/Button";
import { formatDate, formatPrice } from "../../../../utility/utility";

const Details = (props) => {
  let modifier = 1;
  if (props.type === "stripe") {
    modifier = 1000;
  }
  return (
    <div className={classes.details}>
      <div className={classes.detailsWrapper}>
        <div className={classes.detailsLeft}>Details</div>
        <div className={classes.detailsRight}>
          <Button type="rounded" onClick={() => {}}>
            Edit
          </Button>
        </div>
      </div>
      <div className={classes.Content}>
        <div className={classes.row}>
          <div className={classes.label}>Name</div>
          <div className={classes.input}>{props.item.name}</div>
        </div>

        {props.item.description ? (
          <div className={classes.row}>
            <div className={classes.label}>Description</div>
            <div className={classes.input}>{props.item.description}</div>
          </div>
        ) : null}
        {props.item.default_price ? (
          <div className={classes.row}>
            <div className={classes.label}>Default Price</div>
            <div className={classes.input}>
              {formatPrice(props.item.default_price.unit_amount)}
              <span className={classes.Currency}>
                {props.item.default_price.currency}
              </span>
            </div>
          </div>
        ) : null}
        {props.item.created ? (
          <div className={classes.row}>
            <div className={classes.label}>Created</div>
            <div className={classes.input}>
              {formatDate(props.item.created * modifier)}
            </div>
          </div>
        ) : null}
        {props.item.statement_descriptor ? (
          <div className={classes.row}>
            <div className={classes.label}>Statement Descriptor</div>
            <div className={classes.input}>
              {props.item.statement_descriptor || "none"}
            </div>
          </div>
        ) : null}

        <div className={classes.row}>
          <div className={classes.label}>Features List</div>
          {props.item.features.map((feature) => {
            // console.log("feature: ", feature);
            const feat = (
              <div key={Math.random()} className={classes.input}>
                {feature.name}
              </div>
            );
            return feat;
          })}
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default Details;

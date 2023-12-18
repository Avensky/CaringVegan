import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import classes from "./Pricing.module.css";
import { Field, ErrorMessage } from "formik";

const Pricing = () => {
  const [recurring, setRecurring] = useState(false);
  const [oneOff, setOneOff] = useState(true);
  return (
    <div className={classes.pricingWrapper}>
      <div className={classes.paymentWrapper}>
        <Button
          onClick={() => {
            setOneOff(true);
            setRecurring(false);
          }}
          type="select"
          selected={oneOff}
        >
          One-off
        </Button>
        <Button
          onClick={() => {
            setRecurring(true);
            setOneOff(false);
          }}
          type="select"
          selected={recurring}
        >
          Recurring
        </Button>
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.label}>{`Amount (required)`}</div>
        <div className={classes.content}>
          <div className={classes.pricing}>
            <span className={classes.dollar}>$</span>
            <Field name="unit_amount" type="number" placeholder="0.00" />
            <div className={classes.ErrorMessage}>
              <ErrorMessage name="unit_amount" component="div" />
            </div>
          </div>
          <div className={classes.currency}>USD</div>
        </div>
      </div>
      {/* <div className={classes.more}>More pricing options</div> */}
    </div>
  );
};

// Pricing.propTypes = {};

export default Pricing;

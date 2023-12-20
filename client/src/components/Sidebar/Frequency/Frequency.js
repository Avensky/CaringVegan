import React, { useState } from "react";
// import PropTypes from 'prop-types'
import classes from "./Frequency.module.css";
import Button from "../../UI/Button/Button";

const Frequency = () => {
  const [recurring, setRecurring] = useState(false);
  const [oneOff, setOneOff] = useState(true);
  return (
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
        disabled={true}
        style="Disabled"
        selected={recurring}
      >
        Recurring
      </Button>
    </div>
  );
};

Frequency.propTypes = {};

export default Frequency;

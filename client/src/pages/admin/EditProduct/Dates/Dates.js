import React from "react";
import PropTypes from "prop-types";
import classes from "./Dates.module.css";
import { formatDate } from "../../../../utility/utility";

const Dates = (props) => {
  let modifier = 1;
  if (props.type === "stripe") {
    modifier = 1000;
  }
  return (
    <div className={classes.Dates}>
      <div className={classes.datesHeader}>
        <div className={classes.updated}>Updated</div>
        <div className={classes.created}>Created</div>
      </div>
      <div className={classes.dates}>
        <div className={classes.updated}>
          {formatDate(props.item.updated * modifier)}
        </div>
        <div className={classes.created}>
          {formatDate(props.item.created * modifier)}
        </div>
      </div>
    </div>
  );
};

Dates.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default Dates;

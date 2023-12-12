import React from "react";
import PropTypes from "prop-types";
import classes from "./Dates.module.css";
import { formatDate } from "../../../../utility/utility";

const Dates = (props) => {
  return (
    <div className={classes.Dates}>
      <div className={classes.datesHeader}>
        <div className={classes.updated}>Updated</div>
        <div className={classes.created}>Created</div>
      </div>
      <div className={classes.dates}>
        <div className={classes.updated}>
          {formatDate(props.item.updated, props.type)}
        </div>
        <div className={classes.created}>
          {formatDate(props.item.created, props.type)}
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

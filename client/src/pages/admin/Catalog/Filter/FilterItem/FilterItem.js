import React from "react";
// import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./FilterItem.module.css";

const FilterItem = (props) => {
  //   const [active, setActive] = useState(false);
  //   const activate = () => {
  // console.log("active", active);
  // console.log("setactive", props.active);
  // setActive(!active);
  //   };

  // console.log("active", active);
  return (
    <div
      className={
        props.active
          ? [classes.FilterItem, classes.Active].join(" ")
          : classes.FilterItem
      }
      onClick={props.activate}
    >
      {props.name}
    </div>
  );
};

FilterItem.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  activate: PropTypes.func,
};

export default FilterItem;

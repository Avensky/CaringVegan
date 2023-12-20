import React from "react";
import PropTypes from "prop-types";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.heading}>
      <div className={classes.title}>{props.title}</div>
      <div onClick={props.clicked} className={classes.close}>
        Close X
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  clicked: PropTypes.func,
};

export default Header;

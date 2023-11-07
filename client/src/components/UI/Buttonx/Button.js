import React, { useState } from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
  // const animation = false;
  const [animation, setAnimation] = useState(false);
  // console.log("animation ", animation);
  const click = () => {
    setAnimation(true);
    props.click();
  };

  const button = props.children;
  // console.log("click ", click);
  return (
    <button
      disabled={props.disabled}
      className={
        animation
          ? [classes.Button, classes[props.type], classes.Animation].join(" ")
          : [classes.Button, classes[props.type]].join(" ")
      }
      onClick={click}
      onAnimationEnd={() => setAnimation(false)}
    >
      {button}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  click: PropTypes.func,
};

export default Button;

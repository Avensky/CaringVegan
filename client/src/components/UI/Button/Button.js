import React, { useState } from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { updateArray } from "../../../utility/utility";

const Button = (props) => {
  const [animation, setAnimation] = useState(false);
  const clicked = () => {
    setAnimation(true);
    props.onClick ? props.onClick() : null;
  };

  let style = [classes.Button, classes[props.style], classes[props.type]];

  props.selected ? style.push(classes.Selected) : null;
  animation ? style.push(classes.Animation) : null;
  // props.disabled === false ? style.push(classes.Disabled) : null;
  // console.log("disabled", props.disabled);

  return (
    <div
      type={props.type}
      // disabled={props.submit}
      className={style.join(" ")}
      onClick={props.disabled ? () => {} : clicked}
      onAnimationEnd={() => setAnimation(false)}
    >
      <Link to={props.editLink}>{props.children}</Link>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  editLink: PropTypes.string,
};

export default Button;

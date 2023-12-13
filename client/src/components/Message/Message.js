import React from "react";
// import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classes from "./Message.module.css";
const Message = (props) => {
  // const [animation, setAnimation] = useState(false);

  // useEffect(() => {
  //   setAnimation(false);
  //   setAnimation(true);
  // }, [props.message]);

  // console.log("message", props.message);
  return (
    <div
      className={[classes.message, classes[props.type], classes.animation].join(
        " "
      )}
      // className={
      //   animation
      //     ? [classes.message, classes[props.type], classes.animation].join(" ")
      //     : [classes.message, classes[props.type], classes.animation].join(" ")
      // }
      // onAnimationEnd={() => setAnimation(false)}
    >
      {props.message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Message;

import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={[classes.title, "page-wrapper"].join(" ")}>
      Oops! Page Not Found
    </div>
  );
};

export default NotFound;

import React from "react";
import classes from "./Background.module.css";
// import myVid from '../../../assets/videos/myVid.mp4';
import myImg from "../../../assets/images/background.jpg";

const background = () => {
  return (
    <div className={classes.BackgroundWrapper}>
      <img src={myImg} />
    </div>
  );
};

export default background;

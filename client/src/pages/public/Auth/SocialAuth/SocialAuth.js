import React from "react";
import classes from "./SocialAuth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialAuth = () => {
  return (
    <div className={classes.SocialAuth}>
      <br />
      <div className="text-left">Or continue with:</div>
      <br />
      <button type="submit" className={[classes.Btn, "btn-primary"].join(" ")}>
        <a href="/api/facebook">
          <div className={classes.BtnDiv}>
            <FontAwesomeIcon icon="fa-brands fa-facebook" /> Facebook
          </div>
        </a>
      </button>
      <button className={[classes.Btn, "btn-danger"].join(" ")}>
        <a href="/api/google">
          <div className={classes.BtnDiv}>
            <FontAwesomeIcon icon="fa-brands fa-google-plus" /> Google+
          </div>
        </a>
      </button>
    </div>
  );
};

export default SocialAuth;

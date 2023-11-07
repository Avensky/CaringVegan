import React from "react";
import classes from "./Review.module.css";
import PropTypes from "prop-types";
import Rating from "../../../../components/UI/Rating/Rating";

const Review = (props) => {
  let review = (
    <div className={classes.ReviewContianer} key={props._id}>
      <div className={classes.rating}>
        <div className={classes.username}>{props.username}</div>
        <Rating rating={props.rating} />
      </div>

      <div className={classes.title}>
        <b>{props.title}</b>
      </div>
      <div className={classes.review}>{props.review}</div>
      <div className={classes.date}>{props.date}</div>
    </div>
  );
  return review;
};

Review.propTypes = {
  rating: PropTypes.number,
  username: PropTypes.string,
  date: PropTypes.string,
  review: PropTypes.string,
  title: PropTypes.string,
  _id: PropTypes.string,
};

export default Review;

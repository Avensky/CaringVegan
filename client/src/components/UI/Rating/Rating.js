import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Rating.module.css";
import PropTypes from "prop-types";

const Rating = ({ rating }) => {
  let ratingArray;
  //const  = <FontAwesomeIcon className={classes.starBorder} icon="fa fa-star" />;
  // const star = <FontAwesomeIcon icon="fa-solid fa-star" />;
  // const star_half = <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />;
  // const star_border = <FontAwesomeIcon icon="fa-regular fa-star" />;

  //console.log('rating ', rating);

  switch (true) {
    case rating == 5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
        </span>
      );
      break;
    case rating >= 4.5 && rating < 5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
        </span>
      );
      break;
    case rating >= 4 && rating < 4.5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 3.5 && rating < 4:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 3 && rating < 3.5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 2.5 && rating < 3:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 2 && rating <= 2.5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 1.5 && rating < 2:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 1 && rating < 1.5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 0.5 && rating < 1:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    case rating >= 0 && rating < 0.5:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
      break;
    default:
      ratingArray = (
        <span>
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <FontAwesomeIcon icon="fa-regular fa-star" />
        </span>
      );
  }

  return <div className={classes.Rating}>{ratingArray}</div>;
};

Rating.propTypes = {
  rating: PropTypes.number,
  key: PropTypes.string,
};

export default Rating;

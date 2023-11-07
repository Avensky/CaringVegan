import React from "react";
import Review from "./Review/Review";
import classes from "./Reviews.module.css";

const Reviews = () => {
  let reviewsArray = [
    {
      _id: "lskjd;lfkasd",
      title: "Great Gift!",
      username: "poly",
      rating: 3.5,
      date: "November 30th 2022",
      // item: 'be yourself',
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      _id: "lskjd;lsd",
      title: "Great Gift!",
      username: "poly",
      rating: 4.5,
      date: "November 30th 2022",
      // item: 'be yourself',
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  let reviews;
  if (reviewsArray) {
    reviews = reviewsArray.map((review) => {
      return (
        <Review
          key={review._id}
          _id={review._id}
          title={review.title}
          username={review.username}
          rating={review.rating}
          date={review.date}
          // item={review.item}
          review={review.review}
        />
      );
    });
  }
  return (
    <div className={classes.Reviews}>
      <div className={classes.ReviewsHeading}>REVIEWS</div>
      {reviews}
    </div>
  );
};
export default Reviews;

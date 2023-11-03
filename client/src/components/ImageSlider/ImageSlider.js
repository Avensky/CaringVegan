import React, { useState } from "react";
import classes from "./ImageSlider.module.css";
import PropTypes from "prop-types";

const ImageSlider = (props) => {
  // const url = "https://caring-vegan.s3.us-west-2.amazonaws.com/";
  const myCollection = [props.images];
  console.log("imagedata = ", myCollection);
  // const myCollection = [
  //   {
  //     label: "First Image",
  //     url: url + collection,
  //   },
  //   {
  //     label: "Second Image",
  //     url: url + collection,
  //   },
  //   {
  //     label: "Third Image",
  //     url: url + collection,
  //   },
  // ];

  const [index, setIndex] = useState(0);

  const next = () => {
    const isLastsSlide = index === myCollection.length - 1;
    const newIndex = isLastsSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const previous = () => {
    // const isFirstSlide = index === 0;
    // const newIndex = isFirstSlide ? myCollection.length - 1 : 0;
  };

  const goToSlide = (collectionIndex) => {
    setIndex(collectionIndex);
  };

  const slideStylesWithImage = {
    backgroundImage: `url(${myCollection[index]})`,
  };

  const dots = myCollection.map((slide, index) => {
    return (
      <div className={classes.Dot} key={index} onClick={() => goToSlide(index)}>
        ●
      </div>
    );
  });

  //  console.log('dots = ', dots);

  return (
    <div className={classes.ImageSlider}>
      <div>
        <div
          className={[classes.Arrow, classes.LeftArrow].join(" ")}
          onClick={previous}
        >
          ❰
        </div>
        <div
          className={[classes.Arrow, classes.RightArrow].join(" ")}
          onClick={next}
        >
          ❱
        </div>
      </div>
      <div className={classes.SlideWrapper}>
        <div className={classes.Slide} style={slideStylesWithImage} />
      </div>
      <div className={classes.DotsContainer}>{dots}</div>
    </div>
  );
};

ImageSlider.propTypes = {
  collection: PropTypes.any,
  images: PropTypes.array,
};

export default ImageSlider;

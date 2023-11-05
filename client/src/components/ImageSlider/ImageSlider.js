import React, { useState } from "react";
import classes from "./ImageSlider.module.css";
import PropTypes from "prop-types";

const ImageSlider = (props) => {
  const gallery = props.images;
  // set currIndex to first slide, use function to set which slide you want
  const [currIndex, setIndex] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [animatedRight, setAnimatedRight] = useState(false);
  const [animatedDot, setAnimatedDot] = useState(false);

  // =========================================================================
  // Functions ===============================================================
  // =========================================================================

  // move to next slide
  const next = () => {
    setAnimatedRight(true);
    setAnimatedDot(false);
    setAnimated(false);
    // check if your in the last slide by comparing the currIndex to the amount of images minus 1
    const isLastsSlide = currIndex === gallery.length - 1;
    // if its the last slide set currIndex to 0, otherwise keep going
    const newIndex = isLastsSlide ? 0 : currIndex + 1;
    setIndex(newIndex);
  };

  // got to previous slide
  const previous = () => {
    setAnimated(true);
    setAnimatedDot(false);
    setAnimatedRight(false);
    // check if currIndex is set to the first slide
    const isFirstSlide = currIndex === 0;
    // if your in the first slide go to the end of gallery, else go to previous slide
    const newIndex = isFirstSlide ? gallery.length - 1 : currIndex - 1;
    setIndex(newIndex);
  };

  // go to any slide
  const goToSlide = (currIndex) => {
    setAnimatedDot(true);
    setAnimatedRight(false);
    setAnimated(false);
    setIndex(currIndex);
  };

  // =============================================================================
  // Variables ===================================================================
  // =============================================================================

  const slide = gallery[currIndex];
  // console.log("slideStylesWithImage: ", slideStylesWithImage);

  const dots = gallery.map((slide, index) => {
    let style = [];
    if (currIndex === index) {
      style = classes.ActiveDot;
    }
    if (currIndex === index && animatedDot) {
      style = [classes.ActiveDot, classes.AnimatedDot].join(" ");
    }

    return (
      <span
        className={style}
        key={index}
        onClick={() => goToSlide(index)}
        onAnimationEnd={() => setAnimatedDot(false)}
      >
        ●
      </span>
    );
  });

  //  console.log('dots = ', dots);

  return (
    <div className={classes.ImageSlider}>
      <div className={classes.Arrows}>
        <div
          // className={[classes.ArrowWrapperLeft].join(" ")}
          onClick={previous}
          onAnimationEnd={() => setAnimated(false)}
          className={classes.ArrowWrapperLeft}
        >
          <span className={animated ? classes.Animated : null}>❰</span>
          <span className={animated ? classes.Animated : null}>❰</span>
          <span className={animated ? classes.Animated : null}>❰</span>
        </div>
        <div
          onAnimationEnd={() => setAnimatedRight(false)}
          className={
            animatedRight
              ? [classes.ArrowWrapperRight, classes.AnimatedRight].join(" ")
              : classes.ArrowWrapperRight
          }
          onClick={next}
        >
          <span className={animatedRight ? classes.AnimatedRight : null}>
            ❱
          </span>
          <span className={animatedRight ? classes.AnimatedRight : null}>
            ❱
          </span>
          <span className={animatedRight ? classes.AnimatedRight : null}>
            ❱
          </span>
        </div>
      </div>
      <div className={classes.SlideWrapper}>
        <img className={classes.Slide} src={slide} alt="product image" />
      </div>
      <div className={classes.Dots}>{dots}</div>
    </div>
  );
};

ImageSlider.propTypes = {
  collection: PropTypes.any,
  images: PropTypes.array,
};

export default ImageSlider;

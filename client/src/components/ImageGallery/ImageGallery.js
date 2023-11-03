import React, { useState } from "react";
import classes from "./ImageGallery.module.css";
import PropTypes from "prop-types";

const ImageGallery = ({ collection }) => {
  const url = "https://caring-vegan.s3.us-west-2.amazonaws.com/";
  console.log("imagedata = ", collection);
  const myCollection = [
    {
      label: "First Image",
      url: url + collection,
    },
    {
      label: "Second Image",
      url: url + collection,
    },
    {
      label: "Third Image",
      url: url + collection,
    },
  ];
  const [index, setIndex] = useState(0);
  const goToSlide = (collectionIndex) => {
    setIndex(collectionIndex);
  };

  const slideStylesWithImage = {
    backgroundImage: `url(${myCollection[index].url})`,
  };

  const preview = myCollection.map((slide, i) => {
    return (
      <img className={classes.preview} key={i} src={myCollection[i].url} />
    );
  });

  return (
    <div className={classes.ImageGallery}>
      <div className={classes.SlideWrapper}>
        <div className={classes.Slide} style={slideStylesWithImage} />
      </div>
      <div className={classes.PreviewWrapper}>{preview}</div>
      <div onClick={goToSlide}>Got to slide</div>
    </div>
  );
};

ImageGallery.propTypes = {
  collection: PropTypes.array,
};

export default ImageGallery;

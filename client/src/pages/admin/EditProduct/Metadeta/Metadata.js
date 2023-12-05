import React from "react";
import PropTypes from "prop-types";
import classes from "./Metadata.module.css";
import Button from "../../../../components/UI/Button/Button";

const Metadata = (props) => {
  let metadata;
  if (props.metadata) {
    // console.log("metadata: ", props.metadata);

    const entries = Object.entries(props.metadata);
    metadata = entries.map(([key, val]) => {
      console.log(`${key}: ${val}`);
      console.log("metadata:");
      console.log("key:", key);
      console.log("value:", val);
      return (
        <div className={classes.row} key={Math.random()}>
          <div className={classes.label}>{key}</div>
          <div className={classes.input}>{val}</div>
        </div>
      );
    });
  }

  // console.log("metadata: ", props.metadata);
  return (
    <div className={classes.Metadata}>
      <div className={classes.heading}>
        <div className={classes.left}>Metadata</div>
        <div className={classes.right}>
          <Button type="rounded" onClick={() => {}}>
            Edit Metadata
          </Button>
        </div>
      </div>
      <div className={classes.content}>{metadata}</div>
    </div>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.array,
};

export default Metadata;

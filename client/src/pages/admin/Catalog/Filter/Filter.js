import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FilterItem from "./FilterItem/FilterItem";
import classes from "./Filter.module.css";

const Filter = (props) => {
  const [all, setAll] = useState(false);
  const [archived, setArchived] = useState(false);
  const [available, setAvailable] = useState(false);

  const getAll = async () => {
    setAll(true);
    setArchived(false);
    setAvailable(false);
    props.setIsActive();
    const params = {
      limit: 5,
    };
    await props.getProducts(params);
  };
  const getArchvied = async () => {
    const params = {
      limit: 5,
      active: false,
    };
    setAll(false);
    setArchived(true);
    setAvailable(false);
    props.setIsActive(false);
    await props.getProducts(params);
  };
  const getAvailable = async () => {
    const params = {
      limit: 5,
      active: true,
    };
    setAll(false);
    setArchived(false);
    setAvailable(true);
    props.setIsActive(true);
    await props.getProducts(params);
  };

  useEffect(() => {
    if (props.isActive === undefined) {
      setAll(true);
      setArchived(false);
      setAvailable(false);
    }
    if (props.isActive === false) {
      setArchived(true);
      setAll(false);
      setAvailable(false);
    }
    if (props.isActive === true) {
      setAvailable(true);
      setAll(false);
      setArchived(false);
    }
  }, [props.isActive]);

  return (
    <div className={classes.filter}>
      <FilterItem activate={() => getAll()} active={all} name="All" />
      <FilterItem
        activate={() => getAvailable()}
        active={available}
        name="Available"
      />
      <FilterItem
        activate={() => getArchvied()}
        active={archived}
        name="Archived"
      />
    </div>
  );
};

Filter.propTypes = {
  all: PropTypes.any,
  available: PropTypes.bool,
  archived: PropTypes.bool,
  getProducts: PropTypes.func,
  setIsActive: PropTypes.func,
  searchAvailable: PropTypes.func,
  isActive: PropTypes.any,
};

export default Filter;

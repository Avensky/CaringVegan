import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterItem from "./FilterItem/FilterItem";
import classes from "./Filter.module.css";

const Filter = (props) => {
  const [all, setAll] = useState(true);
  const [archived, setArchived] = useState(false);
  const [available, setAvailable] = useState(false);

  const getAll = async () => {
    if (all) {
      return;
    } else {
      setAll(true);
      setAvailable(false);
      setArchived(false);
      props.setIsActive();
      console.log("all ", all);
      const params = {
        limit: 5,
      };
      await props.getProducts(params);
    }
  };
  const getArchvied = async () => {
    if (archived) {
      return;
    } else {
      setAll(false);
      setAvailable(false);
      setArchived(true);
      console.log("archived ", archived);
      const params = {
        limit: 5,
        active: false,
      };
      props.setIsActive(false);
      await props.getProducts(params);
    }
  };
  const getAvailable = async () => {
    if (available) {
      return;
    } else {
      setAll(false);
      setAvailable(true);
      setArchived(false);
      console.log("available ", available);
      const params = {
        limit: 5,
        active: true,
      };
      props.setIsActive(true);
      await props.getProducts(params);
    }
  };
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

import React, { useState, useEffect } from "react";
import classes from "./Filter.module.css";
import PropTypes from "prop-types";
import Button from "../../../../components/UI/Button/Button";

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
      <Button type="select" onClick={() => getAll()} selected={all}>
        All
      </Button>
      <Button type="select" onClick={() => getAvailable()} selected={available}>
        Available
      </Button>
      <Button type="select" onClick={() => getArchvied()} selected={archived}>
        Archive
      </Button>
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
  page: PropTypes.any,
};

export default Filter;

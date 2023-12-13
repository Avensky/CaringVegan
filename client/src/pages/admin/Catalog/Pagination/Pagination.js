import React from "react";
import PropTypes from "prop-types";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const page = props.page;

  let totalPages = props.total_count / props.limit;
  let viewing = <div className={classes.left}>No results...</div>;
  let resultCount;

  console.log("is Active: ", props.active);
  const next = async () => {
    if (page < totalPages && !props.loading) {
      const params = {
        active: props.active,
        limit: 5,
        starting_after: props.starting_after,
        results: props.results,
        has_more: props.has_more,
        page: props.next_page,
        index: props.index,
      };
      await props.getProducts(params);
    }
  };

  const prev = async () => {
    if (page > 1 && !props.loading) {
      const params = {
        active: props.active,
        limit: 5,
        ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        page: props.page,
        index: props.index,
      };
      await props.getProducts(params);
    }
  };

  // if (props.results < props.limit) {
  //   resultCount = props.results;
  // }

  if (page * props.limit > props.total_count) {
    resultCount = props.total_count;
  } else {
    resultCount = page * props.limit;
  }

  const starting = props.limit * page - (props.limit - 1);
  if (props.results * 1 > 0) {
    viewing = (
      <div className={classes.left}>
        Viewing {starting}-{resultCount} out of {props.total_count}
      </div>
    );
  }

  return (
    <div className={classes.paginate}>
      {viewing}
      <div className={classes.right}>
        <div
          className={
            page === 1
              ? [classes.prev, classes.disabled].join(" ")
              : classes.prev
          }
          onClick={prev}
          disabled={props.loading}
        >
          previous
        </div>
        <div
          className={
            props.has_more || page < totalPages
              ? [classes.next].join(" ")
              : [classes.next, classes.disabled].join(" ")
          }
          onClick={next}
          disabled={props.loading}
        >
          Next
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  loading: PropTypes.bool,
  has_more: PropTypes.bool,
  active: PropTypes.bool,
  page: PropTypes.number,
  index: PropTypes.number,
  next_page: PropTypes.number,
  total_count: PropTypes.number,
  results: PropTypes.number,
  limit: PropTypes.number,
  ending_before: PropTypes.string,
  starting_after: PropTypes.string,
  getProducts: PropTypes.func,
};

export default Pagination;

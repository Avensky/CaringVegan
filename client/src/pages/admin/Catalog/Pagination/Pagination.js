import React from "react";
import PropTypes from "prop-types";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const page = props.page;
  let totalPages = props.total_count / props.limit;

  let viewing = <div className={classes.left}>No results...</div>;

  if (props.results * 1 > 0) {
    viewing = (
      <div className={classes.left}>
        Viewing {(page - 1) * props.limit + 1}-
        {page * 5 > props.total_count ? props.total_count : page * props.limit}{" "}
        out of {props.total_count}
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
          onClick={props.prev}
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
          onClick={props.next}
          disabled={props.loading}
        >
          Next
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  loading: PropTypes.bool,
  has_more: PropTypes.bool,
  page: PropTypes.number,
  total_count: PropTypes.number,
  results: PropTypes.number,
  limit: PropTypes.number,
};

export default Pagination;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import CatalogItems from "./CatalogItems/CatalogItems";
import FilterItem from "./FilterItem/FilterItem";
import Pagination from "./Pagination/Pagination";

const Catalog = (props) => {
  const page = props.page;
  // console.log(props.page, "page");
  const [all, setAll] = useState(true);
  const [archived, setArchived] = useState(false);
  const [available, setAvailable] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    const params = { limit: 5 };
    const getProducts = async () => await props.getProducts(params);
    getProducts();
  }, []);

  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  // console.log("home ", props.products);

  const getAll = async () => {
    if (all) {
      return;
    } else {
      setAll(true);
      setAvailable(false);
      setArchived(false);
      setIsActive();
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
      setIsActive(false);
      console.log("archived ", archived);
      const params = {
        active: false,
        limit: 5,
      };
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
      setIsActive(true);
      console.log("available ", available);
      const params = {
        active: true,
        limit: 5,
      };
      await props.getProducts(params);
    }
  };
  // const [executing, setExecuting] = useState(false);
  // const onRealClick = async (event) => {
  //   setExecuting(true);
  //   try {
  //     await onClick();
  //   } finally {
  //     setExecuting(false);
  //   }
  // };
  // console.log("has_more", props.has_more);
  // console.log("results", props.results);
  // console.log("total_count", props.total_count);
  // console.log("page: ", page);

  let totalPages = props.total_count / 5;
  // const remainder = props.total_count % 5;
  // if (remainder) totalPages = totalPages + 1/;
  // console.log("remainder: ", remainer);

  const next = async () => {
    console.log("loading: ", props.loading);
    if (page < totalPages && !props.loading) {
      const params = {
        active: isActive,
        limit: 5,
        // starting_after: props.starting_after,
        results: props.results,
        has_more: props.has_more,
        page: props.next_page,
      };
      await props.getProducts(params);
    }
  };

  const prev = async () => {
    if (page > 1 && !props.loading) {
      const params = {
        active: isActive,
        limit: 5,
        // ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        page: props.page - 1,
      };
      await props.getProducts(params);
    }
  };
  const filter = (
    <div className={classes.filter}>
      <FilterItem activate={getAll} active={all} name="All" />
      <FilterItem activate={getAvailable} active={available} name="Available" />
      <FilterItem activate={getArchvied} active={archived} name="Archived" />
    </div>
  );

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <div className={classes.Products}>
        <div className="page-title">Product Catalog</div>
        {filter}
        <CatalogItems loading={props.loading} items={props.products} />
      </div>
      <Pagination
        prev={() => prev()}
        next={() => next()}
        page={props.page}
        limit={5}
        total_count={props.total_count}
        has_more={props.has_more}
        results={props.results}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.product.addedItems,
    totalItems: state.product.totalItems,
    total: state.product.total,
    products: state.product.products,
    has_more: state.product.has_more,
    ending_before: state.product.ending_before,
    starting_after: state.product.starting_after,
    results: state.product.results,
    total_count: state.product.total_count,
    isAuth: state.auth.payload,
    page: state.product.page,
    next_page: state.product.next_page,
    loading: state.product.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getInternalProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
  };
};

Catalog.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  ending_before: PropTypes.string,
  starting_after: PropTypes.string,
  products: PropTypes.instanceOf(Object),
  results: PropTypes.number,
  total_count: PropTypes.number,
  has_more: PropTypes.bool,
  loading: PropTypes.bool,
  page: PropTypes.number,
  getProducts: PropTypes.func,
  next_page: PropTypes.number,
  // params: PropTypes.obj,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

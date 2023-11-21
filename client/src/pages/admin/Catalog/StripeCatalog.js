import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "../Catalog/Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import FilterItem from "./FilterItem/FilterItem";
import Pagination from "./Pagination/Pagination";
import CatalogItems from "./CatalogItems/CatalogItems";

const StripeCatalog = (props) => {
  const index = props.index;
  // console.log(props.index, "index");
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

  let totalPages = props.total_count / 5;
  const next = async () => {
    if (index < totalPages && !props.loading) {
      const params = {
        active: isActive,
        limit: 5,
        starting_after: props.starting_after,
        results: props.results,
        has_more: props.has_more,
        index: props.index,
      };
      await props.getProducts(params);
    }
  };

  const prev = async () => {
    if (index > 1 && !props.loading) {
      const params = {
        active: isActive,
        limit: 5,
        ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        index: props.index,
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
        page={props.index}
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
    addedItems: state.stripe.addedItems,
    totalItems: state.stripe.totalItems,
    total: state.stripe.total,
    products: state.stripe.products,
    has_more: state.stripe.has_more,
    ending_before: state.stripe.ending_before,
    starting_after: state.stripe.starting_after,
    results: state.stripe.results,
    total_count: state.stripe.total_count,
    isAuth: state.auth.payload,
    index: state.stripe.index,
    loading: state.stripe.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
  };
};

StripeCatalog.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  ending_before: PropTypes.string,
  starting_after: PropTypes.string,
  products: PropTypes.array,
  results: PropTypes.number,
  total_count: PropTypes.number,
  has_more: PropTypes.bool,
  loading: PropTypes.bool,
  index: PropTypes.number,
  getProducts: PropTypes.func,
  // params: PropTypes.obj,
};
export default connect(mapStateToProps, mapDispatchToProps)(StripeCatalog);

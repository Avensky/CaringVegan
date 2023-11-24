import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "../Catalog/Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import Pagination from "./Pagination/Pagination";
import CatalogItems from "./CatalogItems/CatalogItems";
import Filter from "./Filter/Filter";

const StripeCatalog = (props) => {
  const index = props.index;
  // console.log(props.index, "index");

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

  let totalPages = props.total_count / 5;
  const next = async () => {
    if (index < totalPages && !props.loading) {
      const params = {
        active: props.isActive,
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
        active: props.isActive,
        limit: 5,
        ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        index: props.index,
      };
      await props.getProducts(params);
    }
  };

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <div className={classes.Products}>
        <div className="page-title">Product Catalog</div>
        <Filter
          isActive={props.isActive}
          setIsActive={props.setIsActive}
          getProducts={props.getProducts}
        />
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
    setIsActive: (isActive) => dispatch(actions.setIsActive(isActive)),
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
  setIsActive: PropTypes.func,
  isActive: PropTypes.bool,

  // params: PropTypes.obj,
};
export default connect(mapStateToProps, mapDispatchToProps)(StripeCatalog);

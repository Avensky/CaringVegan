import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import CatalogItems from "./CatalogItems/CatalogItems";
import Pagination from "./Pagination/Pagination";
import Filter from "./Filter/Filter";

const Catalog = (props) => {
  const [items, setItems] = useState([]);
  // console.log("isActive ", props.isActive);
  const page = props.page;
  // console.log(props.page, "page");

  useEffect(() => {
    const params = { limit: 5 };
    const getProducts = async () => await props.getProducts(params);
    getProducts();
  }, [props.total_count]);

  useEffect(() => {
    if (props.products) {
      setItems(props.products);
    }
  }, [props.products]);

  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  // console.log("home ", props.products);

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
        active: props.isActive,
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
        active: props.isActive,
        limit: 5,
        // ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        page: props.page - 1,
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
        <CatalogItems
          loading={props.loading}
          items={items}
          delete={props.delete}
        />
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
    isActive: state.product.isActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getInternalProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
    setIsActive: (isActive) => dispatch(actions.setIsActive(isActive)),
    delete: (id) => dispatch(actions.deleteInternalProduct(id)),
  };
};

Catalog.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  ending_before: PropTypes.string,
  starting_after: PropTypes.string,
  products: PropTypes.array,
  results: PropTypes.number,
  total_count: PropTypes.number,
  has_more: PropTypes.bool,
  loading: PropTypes.bool,
  page: PropTypes.number,
  getProducts: PropTypes.func,
  next_page: PropTypes.number,
  isActive: PropTypes.any,
  setIsActive: PropTypes.func,
  delete: PropTypes.func,
  // params: PropTypes.obj,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

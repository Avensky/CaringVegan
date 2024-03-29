import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "../Catalog/Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import Pagination from "./Pagination/Pagination";
import CatalogItems from "./CatalogItems/CatalogItems";
import Filter from "./Filter/Filter";
import Modal from "../../../components/UI/Modal/Modal";
import Button from "../../../components/UI/Button/Button";

const StripeCatalog = (props) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const archive = (id) => {
    props.archive(id);
    setShowModal(false);
  };

  useEffect(() => {
    props.setIsActive();
    const params = { limit: 5 };
    const getProducts = async () => await props.getProducts(params);
    getProducts();
  }, []);

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

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <div className={classes.Products}>
        <Modal
          show={showModal}
          modalClosed={() => setShowModal(false)}
          title="Archive product"
          message="Archive will hide this product from purchases. Are you sure you want
        to archive this product?"
          cancel="Cancel"
          continue="Archive Product"
          archive={(id) => archive(id)}
        />
        <div className="page-title">Stripe Catalog</div>
        <Filter
          isActive={props.isActive}
          setIsActive={props.setIsActive}
          getProducts={props.getProducts}
        />
        <CatalogItems
          loading={props.loading}
          items={items}
          product="/stripe-product/"
          archive={props.archive}
          unarchive={props.unarchive}
          delete={() => {}}
          type="stripe"
        />
      </div>
      <div>
        <div className={classes.copy}>
          <Button
            onClick={() => {
              props.migrateAll(items);
            }}
            type="rounded"
          >
            Copy to MongoDB
          </Button>
        </div>
        <Pagination
          page={props.index}
          index={props.index}
          limit={5}
          total_count={props.total_count}
          has_more={props.has_more}
          results={props.results}
          starting_after={props.starting_after}
          ending_before={props.ending_before}
          active={props.isActive}
          getProducts={props.getProducts}
        />
      </div>
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
    isActive: state.stripe.isActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
    setIsActive: (isActive) => dispatch(actions.setStripeActive(isActive)),
    archive: (id) => dispatch(actions.archiveStripeProduct(id)),
    unarchive: (id) => dispatch(actions.unarchiveStripeProduct(id)),
    migrateAll: (products) => dispatch(actions.migrateAllProducts(products)),
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
  archive: PropTypes.func,
  unarchive: PropTypes.func,
  migrateAll: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(StripeCatalog);

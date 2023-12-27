import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Catalog.module.css";
import * as actions from "../../../store/actions/index";
import PropTypes from "prop-types";
import CatalogItems from "./CatalogItems/CatalogItems";
import Pagination from "./Pagination/Pagination";
import Filter from "./Filter/Filter";
import Modal from "../../../components/UI/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
// import Dropdown from "./Dropdown/Dropdown";
// import Message from "./../../../components/Message/Message";

const Catalog = (props) => {
  const [items, setItems] = useState(props.products);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.setIsActive();
    const params = { limit: 5 };
    const getProducts = async () => await props.getProducts(params);
    getProducts();
  }, []);

  useEffect(() => {
    if (props.products) {
      setItems(props.products);
      // console.log("setItems: ", props.products);
    }
  }, [props.products]);

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <Modal
        show={showModal}
        modalClosed={() => setShowModal(false)}
        title="Export to Stripe"
        message="Exporting these products will update the Stripe Database, do you wish to Continue?"
        cancel="Cancel"
        continue="Export Products"
        continueHandler={() => props.migrateAll(items)}
      />
      <div className={classes.Products}>
        <div className="page-title">Product Catalog</div>
        <div className={classes.copy}>
          <Button
            onClick={() => {}}
            type="rounded"
            style="Disabled"
            disabled={true}
          >
            Filter
          </Button>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            type="rounded"
          >
            Export to Stripe
          </Button>
          <Button
            onClick={() => {
              props.setShow(true, "addProduct");
            }}
            type="rounded"
            style="Purple"
          >
            + Add Product
          </Button>
        </div>
        <Filter
          isActive={props.isActive}
          setIsActive={props.setIsActive}
          getProducts={props.getProducts}
        />
        {/* {messageBar} */}

        <CatalogItems
          loading={props.loading}
          items={items}
          product="/internal-product/"
          archive={props.archive}
          unarchive={props.unarchive}
          delete={props.delete}
          type="internal"
        />
      </div>
      <Pagination
        page={props.page}
        next_page={props.next_page}
        limit={5}
        total_count={props.total_count}
        has_more={props.has_more}
        results={props.results}
        active={props.isActive}
        getProducts={props.getProducts}
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
    message: state.product.message,
    show: state.product.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getInternalProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
    setIsActive: (isActive) => dispatch(actions.setIsActive(isActive)),
    delete: (id) => dispatch(actions.deleteInternalProduct(id)),
    archive: (id) => dispatch(actions.archiveInternalProduct(id)),
    unarchive: (id) => dispatch(actions.unarchiveInternalProduct(id)),
    migrateAll: (products) =>
      dispatch(actions.migrateAllStripeProducts(products)),
    setShow: (bool, sidebar) => dispatch(actions.showSidebar(bool, sidebar)),
  };
};

Catalog.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  ending_before: PropTypes.string,
  message: PropTypes.string,
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
  archive: PropTypes.func,
  unarchive: PropTypes.func,
  migrateAll: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool,
  // params: PropTypes.obj,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

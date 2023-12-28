import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./EditProduct.module.css";
import * as actions from "../../../store/actions/index";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PropTypes from "prop-types";
import Navigate from "./Navigate/Navigate";
import ImageRow from "./ImageRow/ImageRow";
import Pricing from "./Pricing/Pricing";
import Details from "./Details/Details";
import Dates from "./Dates/Dates";
import Metadata from "./Metadata/Metadata";

const StripeProduct = (props) => {
  const [item, setItem] = useState(props.product);
  const [showModal, setShowModal] = useState(false);
  const id = useParams().id;
  const { product } = props;
  const getProduct = async (id) => await props.getProduct(id);

  useEffect(() => {
    if (!product.id) {
      console.log("getProduct, no product detected");
      getProduct(id);
    } else if (product.id !== id) {
      console.log("getProduct, route id does not match saved product");
      getProduct(id);
    }
  }, []);

  useEffect(() => {
    if (product.id === id) {
      console.log("setItem product: ", product);
      setItem(product);
    }
  }, [product]);

  // let width = window.innerWidth;
  // console.log('width = ',width);
  // console.log('size = ',props.width);

  useLayoutEffect(() => {
    window.addEventListener("resize", props.resize);
  }, []);

  const archive = async (id) => {
    setShowModal(false);
    await props.archive(id);
  };

  let imageRow, dates, details, pricing, metadata;

  if (props.loading) {
    details = <Spinner />;
  }

  if (item.id) {
    imageRow = (
      <ImageRow
        item={item}
        id={id}
        showSidebar={props.showSidebar}
        archive={props.archive}
        unarchive={() => props.unarchive(item.id)}
        migrate={() => props.migrate(item)}
        continue={() => setShowModal(true)}
        delete={() => {}}
        type="stripe"
      />
    );
    dates = <Dates item={item} type="stripe" />;
    details = <Details item={item} type="stripe" />;
    pricing = <Pricing item={item} type="stripe" />;
    metadata = (
      <Metadata
        metadata={item.metadata}
        product={item}
        updateProduct={props.updateProduct}
      />
    );
  }

  return (
    <div className="page-wrapper">
      <div className={classes.Product}>
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
        <Navigate id={item.id} to="/stripe-catalog" back="Stripe" />
        {imageRow}
        {dates}
        {details}
        {pricing}
        {metadata}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.stripe.product,
    loading: state.stripe.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (values, id) =>
      dispatch(actions.updateStripeProduct(values, id)),
    getProduct: (id) => dispatch(actions.getProduct(id)),
    archive: (id) => dispatch(actions.archiveStripeProduct(id)),
    unarchive: (id) => dispatch(actions.unarchiveStripeProduct(id)),
    migrate: (product) => dispatch(actions.migrateProduct(product)),
    showSidebar: (bool, sidebar) =>
      dispatch(actions.showSidebar(bool, sidebar)),
  };
};

StripeProduct.propTypes = {
  resize: PropTypes.func,
  product: PropTypes.object,
  getProduct: PropTypes.func,
  addToCart: PropTypes.func,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  loading: PropTypes.bool,
  archive: PropTypes.func,
  unarchive: PropTypes.func,
  migrate: PropTypes.func,
  updateProduct: PropTypes.func,
  showSidebar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StripeProduct);

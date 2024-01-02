import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./EditProduct.module.css";
import * as actions from "../../../store/actions/index";
import Modal from "../../../components/UI/Modal/Modal";
import PropTypes from "prop-types";
import Navigate from "./Navigate/Navigate";
import Spinner from "../../../components/UI/Spinner/Spinner";
import ImageRow from "./ImageRow/ImageRow";
import Pricing from "./Pricing/Pricing";
import Details from "./Details/Details";
import Dates from "./Dates/Dates";
import Metadata from "./Metadata/Metadata";

const Product = (props) => {
  const [item, setItem] = useState(props.product);
  // console.log("item", item);
  const [showModal, setShowModal] = useState(false);
  const id = useParams().id;
  const { product } = props;
  const getProduct = async (id) => await props.getProduct(id);

  useEffect(() => {
    if (!product._id) getProduct(id);
    else if (product.id !== id) getProduct(id);
  }, []);

  useEffect(() => {
    if (product) setItem(product);
  }, [product]);

  let imageRow, dates, details, pricing, metadata;
  // details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

  if (props.loading) details = <Spinner />;

  if (item._id) {
    imageRow = (
      <ImageRow
        item={item}
        id={id}
        showSidebar={props.showSidebar}
        archive={props.archive}
        unarchive={() => props.unarchive(id)}
        migrate={() => props.migrate(item)}
        delete={props.delete}
        type="internal"
      />
    );
    dates = <Dates item={item} type="internal" />;
    details = <Details item={item} type="internal" />;
    pricing = <Pricing item={item} type="internal" />;
    metadata = <Metadata product={item} updateProduct={props.updateProduct} />;
  }
  // let width = window.innerWidth;
  // console.log('width = ',width);
  // console.log('size = ',props.width);

  // useLayoutEffect(() => {
  //   window.addEventListener("resize", props.resize);
  // }, []);

  return (
    <div className="page-wrapper">
      <div className={classes.Product}>
        <Modal show={showModal} modalClosed={() => setShowModal(false)}>
          {/* {orderSummary} */}
        </Modal>
        <Navigate id={item._id} to="/catalog" back="Products" />
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
    product: state.product.product,
    loading: state.product.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (values, id) =>
      dispatch(actions.updateInternalProduct(values, id)),
    getProduct: (id) => dispatch(actions.getInternalProduct(id)),
    archive: (id) => dispatch(actions.archiveInternalProduct(id)),
    unarchive: (id) => dispatch(actions.unarchiveInternalProduct(id)),
    delete: (id) => dispatch(actions.deleteInternalProduct(id)),
    migrate: (item) => dispatch(actions.migrateStripeProduct(item)),
    showSidebar: (bool) => dispatch(actions.showUpdateProductSidebar(bool)),
  };
};

Product.propTypes = {
  resize: PropTypes.func,
  archive: PropTypes.func,
  unarchive: PropTypes.func,
  delete: PropTypes.func,
  product: PropTypes.object,
  getProduct: PropTypes.func,
  addToCart: PropTypes.func,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  loading: PropTypes.bool,
  message: PropTypes.string,
  migrate: PropTypes.func,
  showSidebar: PropTypes.func,
  updateProduct: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

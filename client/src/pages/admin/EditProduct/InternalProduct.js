import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
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
import Metadata from "./Metadeta/Metadata";

const Product = (props) => {
  const id = useParams().id;
  // console.log("id = ", id);
  // console.log("product price = ", props.price);
  const [item, setItem] = useState({});
  // console.log("item: ", item);
  const [showModal, setShowModal] = useState(false);
  const { product } = props;

  const cancelHandler = () => setShowModal(false);
  const getProduct = async (id) => await props.getProduct(id);
  //   const [index, setActiveStep] = useState(0);
  //   const goToNextPicture = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };
  // const history = useHistory();
  //const handleClick = (id) => {props.addToCart(id)};
  // const addToCart = (price) => {props.addToCart(price)};
  // const subtractQuantity = (id) => {props.subtractQuantity(id)};
  // const purchaseHandler = () => {setPurchasing(true)};
  // const viewCartHandler = () => {history.push('/cart');};
  // console.log("product = ", props.price);

  useEffect(() => {
    if (!product._id) {
      console.log("getProduct, no product detected");
      getProduct(id);
    } else if (product.id !== id) {
      console.log("getProduct, route id does not match saved product");
      getProduct(id);
    }
  }, []);

  useEffect(() => {
    if (product) {
      console.log("setItem product: ", product);

      setItem(product);
    }
  }, [product]);

  let summary, dates, details, pricing, metadata;
  // details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

  if (props.loading) details = <Spinner />;

  if (item._id) {
    summary = (
      <ImageRow
        item={item}
        id={id}
        // setShowModal={() => setShowModal}
        archive={props.archive}
        delete={props.delete}
      />
    );
    dates = <Dates item={item} />;
    details = <Details item={item} />;
    pricing = <Pricing item={item} />;
    metadata = <Metadata metadata={item.metadata} />;
  }
  // let width = window.innerWidth;
  // console.log('width = ',width);
  // console.log('size = ',props.width);

  useLayoutEffect(() => {
    window.addEventListener("resize", props.resize);
  }, []);

  return (
    <div className="page-wrapper">
      <div className={classes.Product}>
        <Modal show={showModal} modalClosed={cancelHandler}>
          {/* {orderSummary} */}
        </Modal>
        <Navigate id={item._id} to="/catalog" />
        {summary}
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
    getProduct: (id) => dispatch(actions.getInternalProduct(id)),
    addToCart: (product) => dispatch(actions.addToCart(product)),
    archive: (id) => dispatch(actions.archiveInternalProduct(id)),
    delete: (id) => dispatch(actions.deleteInternalProduct(id)),
  };
};

Product.propTypes = {
  resize: PropTypes.func,
  archive: PropTypes.func,
  delete: PropTypes.func,
  product: PropTypes.object,
  getProduct: PropTypes.func,
  addToCart: PropTypes.func,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

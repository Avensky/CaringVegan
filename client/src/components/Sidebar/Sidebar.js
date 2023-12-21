import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import AddProduct from "./AddProduct/AddProduct";
import UpdateProduct from "./UpdateProduct/UpdateProduct";

const Sidebar = (props) => {
  let styles = [classes.AddProduct, classes.Close].join(" ");

  props.show ? (styles = [classes.AddProduct, classes.Open].join(" ")) : null;

  let sidebar;
  if (props.sidebar == "addProduct") {
    sidebar = (
      <AddProduct
        show={props.show}
        closed={props.closed}
        clicked={props.clicked}
      />
    );
  }
  if (props.sidebar == "updateProduct" && props.product.name) {
    sidebar = (
      <UpdateProduct
        product={props.product}
        show={props.show}
        closed={props.closed}
        clicked={props.clicked}
      />
    );
  }

  console.log("props.show", props.show);
  console.log("props.sidebar", props.sidebar);
  return (
    <>
      <Backdrop show={props.show} clicked={props.clicked} zIndex="200" />
      <div className={styles}>{sidebar}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.product.page,
    limit: state.product.limit,
    product: state.product.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (values) => dispatch(actions.addInternalProduct(values)),
    getProducts: () => dispatch(actions.getInternalProducts()),
  };
};

Sidebar.propTypes = {
  show: PropTypes.bool,
  closed: PropTypes.func,
  clicked: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.any,
  addProduct: PropTypes.func,
  getProducts: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  sidebar: PropTypes.string,
  product: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

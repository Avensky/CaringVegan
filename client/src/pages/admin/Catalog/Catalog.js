import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Catalog.module.css";
import * as actions from "../../../store/actions/index";
// import myImg from "../../../assets/images/home.jpg";
// import Item from "../../../components/Item/Item";
// import { NavLink } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PropTypes from "prop-types";
import { formatDate, formatPrice } from "../../../utility/utility";
import FilterItem from "./FilterItem/FilterItem";

const Catalog = (props) => {
  const [items, setItems] = useState(null);
  const [all, setAll] = useState(true);
  const [archived, setArchived] = useState(false);
  const [available, setAvailable] = useState(false);
  const products = props.products;

  useEffect(() => {
    const getProducts = async () => await props.getProducts();
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (products.length) setItems(products);
  }, [products]);

  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  // console.log("home ", props.products);

  let catalog = <Spinner />;

  const getAll = async () => {
    if (all) {
      return;
    } else {
      setAll(true);
      setAvailable(false);
      setArchived(false);
      console.log("all ", all);
      await props.getProducts("");
    }
  };
  const getArchvied = async () => {
    if (archived) {
      return;
    } else {
      setAll(false);
      setAvailable(false);
      setArchived(true);
      console.log("archived ", archived);
      await props.getProducts("active=false");
    }
  };
  const getAvailable = async () => {
    if (available) {
      return;
    } else {
      setAll(false);
      setAvailable(true);
      setArchived(false);
      console.log("available ", available);
      await props.getProducts("active=true");
    }
  };
  const filter = (
    <div className={classes.filter}>
      <FilterItem activate={getAll} active={all} name="All" />
      <FilterItem activate={getAvailable} active={available} name="Available" />
      <FilterItem activate={getArchvied} active={archived} name="Archived" />
    </div>
  );

  const table = (
    <div className={[classes.itemWrapper, classes.table].join(" ")}>
      <div className={classes.imageWrapper}></div>
      <div className={classes.details}>Details</div>
      <div className={classes.created}>Created</div>
      <div className={classes.updated}>Updated</div>
      <div className={classes.edit}></div>
    </div>
  );
  if (items) {
    catalog = items.map((item) => {
      return (
        <div key={item.id} className={classes.itemWrapper}>
          <div className={classes.imageWrapper}>
            <img className={classes.image} src={item.images[0]} />
          </div>
          <div className={classes.details}>
            <div className={classes.name}>{item.name}</div>
            <div className={classes.price}>
              {formatPrice(item.default_price.unit_amount)}
            </div>
          </div>
          <div className={classes.created}>{formatDate(item.created)}</div>
          <div className={classes.updated}>{formatDate(item.updated)}</div>
          <div className={classes.edit}>...</div>
        </div>
      );
    });
  }

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <div className={classes.Products}>
        <div className="page-title">Product Catalog</div>
        {filter}
        {table}
        {catalog}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.product.addedItems,
    totalItems: state.product.totalItems,
    total: state.product.total,
    products: state.product.products,
    // shop: state.product.shop,
    isAuth: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: (params) => dispatch(actions.getProducts(params)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
  };
};

Catalog.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  // shop: PropTypes.any,
  products: PropTypes.array,
  getProducts: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

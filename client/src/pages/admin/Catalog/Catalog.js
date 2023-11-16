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
  const index = props.index;
  const products = props.products;
  // console.log(props.index, "index");
  const [items, setItems] = useState(null);
  const [all, setAll] = useState(true);
  const [archived, setArchived] = useState(false);
  const [available, setAvailable] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    const params = { limit: 5 };
    const getProducts = async () => await props.getProducts(params);
    getProducts();
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
  // console.log("index: ", index);

  let totalPages = props.total_count / 5;
  // const remainder = props.total_count % 5;
  // if (remainder) totalPages = totalPages + 1/;
  // console.log("remainder: ", remainer);

  const next = async (event) => {
    // const starting_after = props.starting_after;
    console.log("starting_after", props.starting_after);
    console.log("totatlPages: ", totalPages);
    console.log("event", event);
    console.log("index", index);

    if (index < totalPages && !props.loading) {
      console.log("page index smaller than total pages");
      // if (!props.has_more || !starting_after) return;
      console.log("has more, get next");
      // setExecuting(true);
      const params = {
        active: isActive,
        limit: 5,
        starting_after: props.starting_after,
        results: props.results,
        has_more: props.has_more,
        index: props.index,
      };
      try {
        await props.getProducts(params);
      } finally {
        // setExecuting(false);
      }
    }
  };

  const prev = () => {
    if (index > 1) {
      const params = {
        active: isActive,
        limit: 5,
        ending_before: props.ending_before,
        results: props.results,
        has_more: props.has_more,
        index: props.index,
      };
      props.getProducts(params);
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

  let paginate;
  if (items) {
    paginate = (
      <div className={classes.paginate}>
        <div className={classes.left}>
          Viewing {(index - 1) * 5 + 1}-
          {index * 5 > props.total_count ? props.total_count : index * 5} out of{" "}
          {props.total_count}
        </div>
        <div className={classes.right}>
          <div
            className={
              index === 1
                ? [classes.prev, classes.disabled].join(" ")
                : classes.prev
            }
            onClick={prev}
            disabled={props.loading}
          >
            previous
          </div>
          <div
            className={
              props.has_more || props.index < totalPages
                ? [classes.next].join(" ")
                : [classes.next, classes.disabled].join(" ")
            }
            onClick={next}
            disabled={props.loading}
          >
            Next
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[classes.Catalog, "page-wrapper"].join(" ")}>
      <div className={classes.Products}>
        <div className="page-title">Product Catalog</div>
        {filter}
        {table}
        {catalog}
      </div>
      {paginate}
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
    index: state.product.index,
    loading: state.product.loading,
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
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Home.module.css";
import * as actions from "../../../store/actions/index";
import myImg from "../../../assets/images/home.jpg";
import Item from "../../../components/Item/Item";
// import { NavLink } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PropTypes from "prop-types";

const Home = (props) => {
  const [items, setItems] = useState(null);
  // console.log("Items : ", items);
  // console.log("APP props.products : ", props.products);
  const products = props.products;
  const prices = props.prices;

  // console.log("App ", products);
  // get Products
  useEffect(() => {
    async function getProducts() {
      // console.log("get products");
      await props.getProducts();
    }
    if (products.length === 0) {
      console.log("getProducts, no product detected");
      getProducts();
    }
  }, []);

  useEffect(() => {
    async function getPrices(products) {
      console.log("get prices");
      for (let i = 0; i < products.length; i++) {
        // console.log("get prices ", products[i].id);
        await props.getPrice(
          products[i].default_price,
          products[i].id,
          "products"
        );
      }
    }
    if (prices.length === 0) {
      getPrices(products);
    }
  }, [products]);

  useEffect(() => {
    if (prices.length === products.length && prices.length > 0) {
      console.log("setItems ", prices);
      setItems(prices);
    }
  }, [prices]);

  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  // console.log("home ", props.products);

  let shop = <Spinner />;

  if (items) {
    shop = items.map((item) => {
      return (
        <Item
          key={item.id}
          id={item.id}
          url={item.images[0]}
          name={item.name}
          description={item.description}
          price={item.price}
          link={"/product"}
          // to="/"
          // clicked={() => addToCart(item._id)}
          // addToCart={() => addToCart(item._id)}
          // subtractQuantity={() => subtractQuantity(item._id)}
        />
      );
    });
  }

  return (
    <div className={[classes.Home, "page-wrapper"].join(" ")}>
      <div className={classes.headerWrapper}>
        <img src={myImg} />
        <div className={classes.header}>
          <div className={classes.title}>
            I <span className="fa fa-heart" /> MY PUG
          </div>
        </div>
      </div>

      <div className={classes.statement}>
        Together, we make a better world. <span className="fa fa-heart" />
      </div>
      <div className={classes.Products}>
        <div className="page-title">Featured</div>
        {shop}
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
    prices: state.product.prices,
    // shop: state.product.shop,
    isAuth: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(actions.addToCart(id)),
    getProducts: () => dispatch(actions.getProducts()),
    getPrice: (priceid, productid, mode) =>
      dispatch(actions.getPrice(priceid, productid, mode)),
    loadCart: (cart) => dispatch(actions.loadCart(cart)),
    loadShop: (cart) => dispatch(actions.loadShop(cart)),
    subQuantity: (id) => dispatch(actions.subQuantity(id)),
  };
};

Home.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  // shop: PropTypes.any,
  products: PropTypes.array,
  getProducts: PropTypes.func,
  getPrice: PropTypes.func,
  prices: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

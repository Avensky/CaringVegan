import React from "react";
import { connect } from "react-redux";
import classes from "./Home.module.css";
import * as actions from "../../../store/actions/index";
import myImg from "../../../assets/images/home.jpg";
import Item from "../../../components/Item/Item";
// import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Home = (props) => {
  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  console.log("home ", props.products);
  let products = props.products.map((item) => {
    // console.log("item = ", item);
    return (
      <Item
        url={item.images[0]}
        key={item.id}
        id={item.id}
        description={item.description}
        price={item.price}
        // id={item._id}
        // alt={item.title}
        // title={item.title}
        // link={"/shop/"}
        // to="/"
        // clicked={() => addToCart(item._id)}
        // addToCart={() => addToCart(item._id)}
        // subtractQuantity={() => subtractQuantity(item._id)}
        name={item.name}
        // desc={item.desc}
        // price={item.price}
        // quantity={item.amount | 0}
        // add={true}
      />
    );
  });

  return (
    <div className={[classes.Home, "page-wrapper"].join(" ")}>
      {/* <div className={classes.centered}>
        <div className={classes.title}>
          <b>THE CARING VEGAN</b>
        </div>
        <div className={classes.description}>
          REJECT THE CYCLE OF PAIN, LOVE YOUR FURRY FRIENDS
          <span className="fa fa-heart" />
        </div>
      </div> */}
      <div className={classes.BackgroundWrapper}>
        <img src={myImg} />
      </div>

      {/* <div className={classes.statement}>
          <p>Lets make this a better world .</p>
        </div> */}
      <div className={classes.Products}>
        <div className="text-center">
          <h1>Featured Products</h1>
        </div>
        {products}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.product.addedItems,
    totalItems: state.product.totalItems,
    total: state.product.total,
    products: state.product.prices,
    shop: state.product.shop,
    isAuth: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
    getProducts: () => {
      dispatch(actions.getProducts());
    },
    loadCart: (cart) => {
      dispatch(actions.loadCart(cart));
    },
    loadShop: (cart) => {
      dispatch(actions.loadShop(cart));
    },
    getItemByType: (type) => {
      dispatch(actions.getItemByType(type));
    },
    orderBy: (type) => {
      dispatch(actions.orderBy(type));
    },
    subtractQuantity: (id) => {
      dispatch(actions.subtractQuantity(id));
    },
  };
};

Home.propTypes = {
  addToCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  shop: PropTypes.any,
  products: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  // console.log("APP props.featured : ", props.featured);
  const featured = props.featured;

  // console.log("App ", featured);
  // get Products
  useEffect(() => {
    // const params = {};
    const getFeatured = async () => await props.getFeatured();
    if (featured.length === 0) {
      console.log("getFeatured, no product detected");
      getFeatured();
    }
  }, []);

  useEffect(() => {
    if (featured.length > 0) {
      console.log("setItems ", featured);
      setItems(featured);
    }
  }, [featured]);

  // const addToCart = (id) => {
  //   props.addToCart(id);
  // };
  // const subtractQuantity = (id) => {
  //   props.subtractQuantity(id);
  // };
  // console.log("home ", props.featured);

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
          price={item.default_price}
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
    total: state.product.total,
    featured: state.product.featured,
    isAuth: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeatured: () => dispatch(actions.getFeatured()),
    loadCart: (cart) => dispatch(actions.loadCart(cart)),
  };
};

Home.propTypes = {
  featured: PropTypes.array,
  getFeatured: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

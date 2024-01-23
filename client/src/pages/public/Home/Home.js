import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Home.module.css";
import * as actions from "../../../store/actions/index";
import Item from "../../../components/Item/Item";
// import { NavLink } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const myImg =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/StockSnap_YWHUFD7JNJ.jpg";
  const forPets =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/20240104_093118000_iOS.jpg";
  const forHim =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/20240104_092704000_iOS.jpg";
  const forHer =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/20240104_093723195_iOS.jpg";
  const stickers =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/StockSnap_YWHUFD7JNJ.jpg";

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
          addToCart={() => props.addToCart(item)}
          // addToCart={() => addToCart(item._id)}
          // subtractQuantity={() => subtractQuantity(item._id)}
        />
      );
    });
  }

  return (
    <div className={[classes.Home, "page-wrapper"].join(" ")}>
      <NavLink to="" className={classes.headerWrapper}>
        <div className="inputWrapper">
          <input className="inputSearch" placeholder="Search CaringVegan" />
        </div>
        <div className={classes.imageBackgroundWrapper}>
          <img src={myImg} />
        </div>
        <div className={classes.header}>
          <div className={classes.title}>
            <span className="fa fa-heart" />
            CaringVegan
          </div>
        </div>
        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            <NavLink to="/shop/for him" className={classes.category}>
              <div
                className={[classes.categoryTitle, "terciaryColor"].join(" ")}
              >
                For Him
              </div>
              <div className={classes.imageWrapper}>
                <img src={forHim} />
              </div>
            </NavLink>
            <NavLink to="/shop/for her" className={classes.category}>
              <div
                className={[classes.categoryTitle, "terciaryColor"].join(" ")}
              >
                For Her
              </div>
              <div className={classes.imageWrapper}>
                <img src={forHer} />
              </div>
            </NavLink>
            <NavLink to="/shop/stickers" className={classes.category}>
              <div
                className={[classes.categoryTitle, "terciaryColor"].join(" ")}
              >
                Stickers
              </div>
              <div className={classes.imageWrapper}>
                <img src={stickers} />
              </div>
            </NavLink>
            <NavLink to="/shop/pets" className={classes.category}>
              <div
                className={[classes.categoryTitle, "terciaryColor"].join(" ")}
              >
                For Pets
              </div>
              <div className={classes.imageWrapper}>
                <img src={forPets} />
              </div>
            </NavLink>
          </div>
        </div>
      </NavLink>

      <div className={classes.statement}>
        Together, we make a better world. <span className="fa fa-heart" />
      </div>

      <div className="page-title">Featured</div>
      <div className={classes.products}>{shop}</div>
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
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
  };
};

Home.propTypes = {
  featured: PropTypes.array,
  getFeatured: PropTypes.func,
  addToCart: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

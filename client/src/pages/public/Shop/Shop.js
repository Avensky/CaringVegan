import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Shop.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Item from "../../../components/Item/Item";
import { useParams } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";

const Shop = (props) => {
  const [shop, setShop] = useState(null);
  const { slug } = useParams();
  // console.log("slug: ", slug);

  useEffect(() => {
    const params = { active: true, category: slug ? slug.trim() : slug };
    const getShop = async (params) => {
      return await props.getShop(params);
    };

    if (props.shop.length === 0) {
      getShop(params);
    }
  }, [slug]);

  useEffect(() => {
    // console.log("shop", props.shop);
    if (props.shop.length > 0) {
      console.log("set shop", props.shop);
      setShop(props.shop);
    }
  }, [props.shop]);

  let store = <Spinner />;

  if (shop) {
    store = shop.map((item) => {
      return (
        <Item
          key={item.id}
          id={item.id}
          url={item.images[0]}
          name={item.name}
          description={item.description}
          price={item.default_price}
          link={"/product"}
          addToCart={() => props.addToCart(item)}
          // subtractQuantity={() => subtractQuantity(item._id)}
        />
      );
    });
  }
  return (
    <div className="page-wrapper">
      <div className={classes.inputWrapper}>
        <input
          className={classes.inputSearch}
          placeholder="Search CaringVegan"
        />
      </div>
      <div className={classes.banner}>
        <div className={[classes.bannerText, "heading"].join(" ")}>
          {slug ? slug : "Shop"}
        </div>
      </div>
      <div className={classes.categoryNavWrapper}>
        <div className={classes.categoryNav}>
          <Button to="/shop/pets" type="category">
            Pets
          </Button>

          <Button to="/shop/stickers" type="category">
            Stickers
          </Button>

          <Button to="/shop/apparel & gear" type="category">
            Apparel & Gear
          </Button>

          <Button to="/shop/electronics" type="category">
            Electronics
          </Button>

          <Button to="/shop/books" type="category">
            Books
          </Button>
        </div>
      </div>
      <div className={classes.storeWrapper}>{store}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shop: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShop: (params) => {
      dispatch(actions.getInternalProducts(params));
    },
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
  };
};

Shop.propTypes = {
  getShop: PropTypes.func,
  shop: PropTypes.array,
  addToCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

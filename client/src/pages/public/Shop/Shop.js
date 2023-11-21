import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Shop.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Shop = (props) => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const params = { active: true };
    const getShop = async (params) => {
      return await props.getShop(params);
    };

    if (props.shop.length === 0) {
      getShop(params);
    }
  }, []);

  useEffect(() => {
    if (props.shop.length > 0) {
      console.log("set shop", props.shop);
      setShop(props.shop);
    }
  }, [props.shop]);

  let store = <Spinner />;

  if (shop) {
    store = shop.map((item) => {
      return (
        <div className={classes.Item} key={item.id}>
          <p>{item.id}</p>

          <img className={classes.image} src={item.images[0]} />
        </div>
      );
    });
  }
  return <div className="page-wrapper">{store}</div>;
};

const mapStateToProps = (state) => {
  return {
    shop: state.product.shop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShop: (params) => {
      dispatch(actions.getShop(params));
    },
  };
};

Shop.propTypes = {
  getShop: PropTypes.func,
  shop: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Wrapper.module.css";
import Navbar from "../Navigation/Navbar/Navbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";
//import Background from './Background/Background';
import * as actions from "../../store/actions/index";
import Footer from "../UI/Footer/Footer";
import PropTypes from "prop-types";

const Wrapper = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebarHandler = () => {
    setShowSidebar(false);
  };

  // set state in a clean way by depending on a previous state
  const sidebarToggleHandler = () => {
    setShowSidebar(!showSidebar);
  };
  const getItems = () => {
    // props.getItems();
  };
  // const loadCart = () => {
  //   props.loadCart();
  // };
  // const loadShop = (orderby) => {
  //   props.loadShop(orderby);
  // };

  console.log("prop.items = ", props.items);
  useEffect(() => {
    if (!props.items) {
      // console.log("get items");
      getItems();
    }
    //    if ( props.items.length>0){
    //        console.log('load items')
    //        loadCart()
    //    }
    //    loadShop(props.orderby)
  }, []);

  // useEffect(() => {
  //   if (props.items) {
  //     console.log("Use effect loadCart");
  //     loadCart();
  //   }
  //   // if (props.items.length > 0 && props.addedItems.length > 0) {
  //   //   console.log("Use effect loadShop items orderby");
  //   //   loadShop(props.orderby);
  //   // }
  // }, [props.items]);

  // useEffect(() => {
  //   if (props.items.length > 0 && props.addedItems.length > 0) {
  //     console.log("Use effect2 load shop items orderby");
  //     loadShop(props.orderby);
  //   }
  // }, [props.cartLoaded, props.shopLoaded]);

  return (
    <div className={classes.Layout}>
      <Navbar
        isAuth={props.isAuth}
        sidebarToggleClicked={sidebarToggleHandler}
        totalItems={props.totalItems}
      />
      <Sidebar
        totalItems={props.totalItems}
        isAuth={props.isAuth}
        open={showSidebar}
        closed={closeSidebarHandler}
      />
      <main className={classes.Wrapper}>{props.children}</main>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: PropTypes.addedItems,
    items: PropTypes.items,
    shop: PropTypes.shop,
    isAuth: state.auth.payload,
    totalItems: PropTypes.totalItems,
    orderby: PropTypes.orderby,
    cartLoaded: PropTypes.cartLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: () => {
      dispatch(actions.getItems());
    },
    loadCart: () => {
      dispatch(actions.loadCart());
    },
    loadShop: () => {
      dispatch(actions.loadShop());
    },
  };
};

Wrapper.propTypes = {
  addedItems: PropTypes.any,
  items: PropTypes.any,
  shop: PropTypes.object,
  isAuth: PropTypes.object,
  totalItems: PropTypes.number,
  orderby: PropTypes.any,
  cartLoaded: PropTypes.bool,
  getItems: PropTypes.any,
  loadShop: PropTypes.any,
  children: PropTypes.any,
  loadCart: PropTypes.any,
  shopLoaded: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);

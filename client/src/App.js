import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as actions from "./store/actions/index";
import PropTypes from "prop-types";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import "./App.css";
import {
  Home,
  // Shop,
  // Checkout,
  // Profile,
  // Auth,
  // Login,
  // Register,
  // ForgotPassword,
  // ResetPassword,
  // Connect,
  // ItemFull,
  // Cart,
  // Orders,
} from "./pages";

const App = (props) => {
  // const getUser = async () => { await props.onFetchUser();}; // prettier-ignore

  const { products } = props;

  console.log("App ", products);
  // get Products
  useEffect(() => {
    async function getProducts() {
      console.log("get products");
      await props.getProducts();
    }
    if (products.length === 0) getProducts();
    console.log("products = ", products);
  }, []);

  useEffect(() => {
    async function getPrices(products) {
      console.log("get prices");
      await props.getPrices(products);
    }

    if (products.length !== 0) {
      getPrices(props.products);
    }
  }, [props.products]);

  // useEffect(() => {
  //   if (!fetchedUser) {
  //     getUser();
  //   }
  // }, [fetchedUser]);

  let routes = (
    <Routes>
      {/* <Route path="/checkout" element={<Checkout />} />
      <Route path="/authentication" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route
        exact
        path="/resetPassword/:token"
        render={(props) => <ResetPassword {...props} />}
      /> */}
      <Route path="/home" element={<Home />} />
      {/* <Route path="/connect" element={<Connect />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/itemfull/:itemId" element={<ItemFull />} />
      <Route path="/cart" element={<Cart />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  );

  // if (props.fetchedUser) {
  //   routes = (
  //     <Routes>
  //       <Route path="/checkout" element={Checkout} />
  //       <Route path="/authentication" render={(props) => <Auth {...props} />} />
  //       <Route
  //         exact
  //         path="/authentication/api/v1/users/resetPassword/:token"
  //         render={(props) => <Auth {...props} />}
  //       />
  //       <Route path="/home" element={Home} />
  //       <Route path="/connect" element={Connect} />
  //       <Route path="/profile" element={Profile} />
  //       <Route path="/shop" element={Shop} exact />
  //       <Route path="/shop/itemfull/:itemId" element={ItemFull} />
  //       <Route path="/cart" element={Cart} />
  //       <Route path="/orders" element={Orders} />
  //       <Route path="/" element={Home} />
  //     </Routes>
  //   );
  // }

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation
          // totalItems={props.totalItems}
          cart={props.cart}
          // checkout={checkout}
          // user={props.user} logout={logout}
        />
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedUser: state.auth.payload,
    products: state.product.products,
    cart: state.product.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
    getProducts: () => dispatch(actions.getProducts()),
    getPrices: (products) => dispatch(actions.getPrices(products)),
  };
};

App.propTypes = {
  cart: PropTypes.array,
  products: PropTypes.array,
  fetchedUser: PropTypes.any,
  onFetchUser: PropTypes.func,
  getProducts: PropTypes.func,
  getPrices: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

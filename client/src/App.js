import React, { Suspense, useEffect } from "react";
// import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as actions from "./store/actions/index";
import PropTypes from "prop-types";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { ScrollToTop } from "./utility/utility";
import {
  Home,
  Product,
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
  Cart,
  // Orders,
  Catalog,
} from "./pages";

const App = (props) => {
  // const getUser = async () => { await props.onFetchUser();}; // prettier-ignore
  const checkout = async (cart, user) => await props.checkout(cart, user);
  const loadCart = () => props.loadCart();

  useEffect(() => {
    if (props.cart.length === 0) {
      // console.log("app, cart.length === 0 ", props.cart);
      loadCart();
    }
  });
  // useEffect(() => {
  //   if (!fetchedUser) {
  //     getUser();
  //   }
  // }, [fetchedUser]);

  let routes = (
    <>
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
      <Route path="/product/:id" element={<Product />} />
      {/* <Route path="/connect" element={<Connect />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/itemfull/:itemId" element={<ItemFull />} />*/}
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </>
  );

  let admin;
  if (!props.user) {
    admin = (
      <>
        <Route path="/catalog" element={<Catalog />} />
      </>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation
          totalItems={props.totalItems}
          cart={props.cart}
          total={props.total}
          checkout={() => checkout(props.cart, props.user)}
          // user={props.user} logout={logout}
        />
        <ScrollToTop />
        <div className="container">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              {routes}
              {admin}
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.payload,
    cart: state.product.cart,
    totalItems: state.product.totalItems,
    total: state.product.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
    checkout: (cart, user) => dispatch(actions.checkout(cart, user)),
    loadCart: () => dispatch(actions.loadCart()),
  };
};

App.propTypes = {
  cart: PropTypes.array,
  user: PropTypes.object,
  onFetchUser: PropTypes.func,
  totalItems: PropTypes.number,
  total: PropTypes.number,
  checkout: PropTypes.func,
  loadCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Suspense } from "react";
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
} from "./pages";

const App = (props) => {
  // const getUser = async () => { await props.onFetchUser();}; // prettier-ignore

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
      <Route path="/product/:id" element={<Product />} />
      {/* <Route path="/connect" element={<Connect />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/itemfull/:itemId" element={<ItemFull />} />*/}
      <Route path="/cart" element={<Cart />} />
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
        <ScrollToTop />
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
    cart: state.product.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
  };
};

App.propTypes = {
  cart: PropTypes.array,
  fetchedUser: PropTypes.any,
  onFetchUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

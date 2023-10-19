import React, { useEffect, Suspense } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as actions from "./store/actions/index";
import {
  Home,
  Shop,
  Checkout,
  Profile,
  Auth,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Connect,
  ItemFull,
  Cart,
  Orders,
} from "./pages";
import PropTypes from "prop-types";

const App = (props) => {
  const { fetchedUser } = props;

  const fetchData = async () => {
    // props.onFetchUser();
  };

  useEffect(() => {
    if (!fetchedUser) {
      fetchData();
    }
  }, [fetchedUser]);

  let routes = (
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/authentication" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route
        exact
        path="/resetPassword/:token"
        render={(props) => <ResetPassword {...props} />}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/itemfull/:itemId" element={<ItemFull />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );

  if (props.fetchedUser) {
    routes = (
      <Routes>
        <Route path="/checkout" element={Checkout} />
        <Route path="/authentication" render={(props) => <Auth {...props} />} />
        <Route
          exact
          path="/authentication/api/v1/users/resetPassword/:token"
          render={(props) => <Auth {...props} />}
        />
        <Route path="/home" element={Home} />
        <Route path="/connect" element={Connect} />
        <Route path="/profile" element={Profile} />
        <Route path="/shop" element={Shop} exact />
        <Route path="/shop/itemfull/:itemId" element={ItemFull} />
        <Route path="/cart" element={Cart} />
        <Route path="/orders" element={Orders} />
        <Route path="/" element={Home} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedUser: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
  };
};

App.propTypes = {
  fetchedUser: PropTypes.object,
  onFetchUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

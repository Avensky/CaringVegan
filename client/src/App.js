import React, { Suspense, useEffect } from "react";
// import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as actions from "./store/actions/index";
import PropTypes from "prop-types";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import "react-tooltip/dist/react-tooltip.css";
import "./App.css";
import { ScrollToTop } from "./utility/utility";
import {
  Home,
  Product,
  Shop,
  InternalProduct,
  StripeProduct,
  Cart,
  Catalog,
  StripeCatalog,
} from "./pages";
import UpdateProductSidebar from "./components/Sidebar/UpdateProduct";
// import UpdatePriceSidebar from "./components/Sidebar/UpdatePrice";
import AddPriceSidebar from "./components/Sidebar/AddPrice";
import AddProductSidebar from "./components/Sidebar/AddProduct";

const App = (props) => {
  // const getUser = async () => { await props.onFetchUser();}; // prettier-ignore
  const checkout = async (cart, user) => await props.checkout(cart, user);
  const loadCart = () => props.loadCart();

  useEffect(() => {
    if (props.cart.length === 0) {
      // console.log("app, cart.length === 0 ", props.cart);
      loadCart();
    }
  }, []);
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
      <Route path="/shop" element={<Shop />} />
      {/* <Route path="/connect" element={<Connect />} />
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
        <Route path="/stripe-catalog" element={<StripeCatalog />} />
        <Route path="/internal-product/:id" element={<InternalProduct />} />
        <Route path="/stripe-product/:id" element={<StripeProduct />} />
      </>
    );
  }

  let style;
  props.disableScroll ? (style = "disableScroll") : null;

  let sidebar, showAddPriceSidebar, showUpdateProductSidebar;
  if (props.sidebar == "addProduct") {
    sidebar = (
      <AddProductSidebar
        show={props.show}
        sidebar={props.sidebar}
        closed={() => props.setShow(false)}
        clicked={() => props.setShow(!props.show, props.sidebar)}
        addProduct={props.addProduct}
        updateProduct={props.updateProduct}
        getProducts={props.getProducts}
        product={props.product}
        // products={props.products}
        page={props.page}
        limit={props.limit}
      />
    );
  }

  if (props.showUpdateProductSidebar && props.product.name) {
    showUpdateProductSidebar = (
      <UpdateProductSidebar
        show={props.showUpdateProductSidebar}
        closed={() => props.setShowUpdateProductSidebar(false)}
        clicked={() =>
          props.setShowUpdateProductSidebar(!props.showUpdateProductSidebar)
        }
        setShowAddPriceSidebar={props.setShowAddPriceSidebar}
        addProduct={props.addProduct}
        updateProduct={props.updateProduct}
        getProducts={props.getProducts}
        product={props.product}
        // products={props.products}
        page={props.page}
        limit={props.limit}
      />
    );
  }
  // if (props.sidebar == "updatePrice" && props.product.name) {
  //   sidebar = (
  //     <UpdatePriceSidebar
  //       show={props.show}
  //       sidebar={props.sidebar}
  //       closed={() => props.setShow(false)}
  //       clicked={() => props.setShow(!props.show, props.sidebar)}
  //       setSidebar={props.setShow}
  //       addProduct={props.addProduct}
  //       updateProduct={props.updateProduct}
  //       getProducts={props.getProducts}
  //       product={props.product}
  //       // products={props.products}
  //       page={props.page}
  //       limit={props.limit}
  //     />
  //   );
  // }
  if (props.showAddPriceSidebar && props.product.name) {
    showAddPriceSidebar = (
      <AddPriceSidebar
        show={props.showAddPriceSidebar}
        closed={() => props.setShowAddPriceSidebar(false)}
        clicked={() => props.setShowAddPriceSidebar(!props.showAddPriceSidebar)}
        // setSidebar={props.setShow}
        addProduct={props.addProduct}
        updateProduct={props.updateProduct}
        getProducts={props.getProducts}
        product={props.product}
        // products={props.products}
        page={props.page}
        limit={props.limit}
      />
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        {sidebar}
        {showAddPriceSidebar}
        {showUpdateProductSidebar}
        <Navigation
          totalItems={props.totalItems}
          cart={props.cart}
          total={props.total}
          checkout={() => checkout(props.cart, props.user)}
          // user={props.user} logout={logout}
        />
        <ScrollToTop />
        <div className={["container", style].join(" ")}>
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
    cart: state.cart.cart,
    totalItems: state.cart.totalItems,
    total: state.cart.total,
    show: state.utility.show,
    showUpdateProductSidebar: state.utility.showUpdateProductSidebar,
    showAddPriceSidebar: state.utility.showAddPriceSidebar,
    sidebar: state.utility.sidebar,
    disableScroll: state.utility.disableScroll,
    page: state.product.page,
    limit: state.product.limit,
    product: state.product.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
    checkout: (cart, user) => dispatch(actions.checkout(cart, user)),
    loadCart: () => dispatch(actions.loadCart()),
    setShow: (bool, sidebar) => dispatch(actions.showSidebar(bool, sidebar)),
    setShowAddPriceSidebar: (bool) =>
      dispatch(actions.showAddPriceSidebar(bool)),
    setShowUpdateProductSidebar: (bool) =>
      dispatch(actions.showUpdateProductSidebar(bool)),
    addProduct: (values) => dispatch(actions.addInternalProduct(values)),
    updateProduct: (values, id) =>
      dispatch(actions.updateInternalProduct(values, id)),
    getProducts: () => dispatch(actions.getInternalProducts()),
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
  show: PropTypes.bool,
  setShow: PropTypes.func,
  showUpdateProductSidebar: PropTypes.bool,
  setShowUpdateProductSidebar: PropTypes.func,
  showAddPriceSidebar: PropTypes.bool,
  setShowAddPriceSidebar: PropTypes.func,
  disableScroll: PropTypes.bool,
  sidebar: PropTypes.string,
  product: PropTypes.object,
  products: PropTypes.array,
  addProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  getProducts: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

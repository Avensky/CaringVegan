import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import PropTypes from "prop-types";
import CartBar from "./CartBar/CartBar";

const Navigation = (props) => {
  // Toggle sidebar view
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCartbar, setShowCartbar] = useState(false);

  const sidebarToggleHandler = () => {
    setShowSidebar(!showSidebar);
    setShowCartbar(false);
  };
  const closeSidebarHandler = () => {
    setShowSidebar(false);
  };

  const cartbarToggleHandler = (e) => {
    e.preventDefault();
    setShowCartbar(!showCartbar);
    setShowSidebar(false);
  };
  const closeCartbarHandler = () => {
    setShowCartbar(false);
  };

  return (
    <div>
      <Navbar
        user={props.user}
        logout={props.logout}
        sidebarToggleClicked={sidebarToggleHandler}
        cartbarToggleClicked={cartbarToggleHandler}
        closeCartbar={closeCartbarHandler}
        totalItems={props.totalItems}
        cart={props.cart}
        checkout={props.checkout}
      />
      <Sidebar
        user={props.user}
        open={showSidebar}
        closed={closeSidebarHandler}
        logout={props.logout}
      />
      <CartBar
        open={showCartbar}
        closed={closeCartbarHandler}
        marginTop="51px"
        cart={props.cart}
        checkout={props.checkout}
      />
    </div>
  );
};

Navigation.propTypes = {
  totalItems: PropTypes.number,
  cart: PropTypes.array,
  checkout: PropTypes.func,
  user: PropTypes.any,
  logout: PropTypes.func,
};

export default Navigation;

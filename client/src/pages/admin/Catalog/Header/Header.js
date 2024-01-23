import React from "react";
import Filter from "../Filter/Filter";
import Button from "../../../../components/UI/Button/Button";
import PropTypes from "prop-types";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.admin}>
        <Button
          onClick={() => {}}
          type="rounded"
          style="Disabled"
          disabled={true}
        >
          Filter
        </Button>
        <Button
          onClick={() => {
            props.setShowModal(true);
          }}
          type="rounded"
        >
          Export to Stripe
        </Button>
        <Button
          onClick={() => {
            props.setShow(true, "addProduct");
          }}
          type="rounded"
          style="Purple"
        >
          + Add Product
        </Button>
      </div>
      <div className={classes.filter}>
        <Filter
          isActive={props.isActive}
          setIsActive={props.setIsActive}
          getProducts={props.getProducts}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  setShowModal: PropTypes.func,
  setShow: PropTypes.func,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  getProducts: PropTypes.func,
};

export default Header;

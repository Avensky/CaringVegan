import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Footer.module.css";
import american from "../../../assets/images/IOSFILLED/credit_cards/png/24/american_express.png";
import visa from "../../../assets/images/IOSFILLED/credit_cards/png/24/visa.png";
import mastercard from "../../../assets/images/IOSFILLED/credit_cards/png/24/mastercard.png";
import discover from "../../../assets/images/IOSFILLED/credit_cards/png/24/discover.png";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <footer id={classes.Footer} className="page-footer teal">
      <div className="container">
        <div className="footer">
          <div className="bio">
            <h3 className="white-text">About</h3>
            <p className="grey-text text-lighten-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className={classes.PaymentTypes}>
              <img src={american} alt="american png" />
              <img src={visa} alt="visa png" />
              <img src={mastercard} alt="mastercard png" />
              <img src={discover} alt="discover png" />
            </div>
            <p>
              <span className="fa fa-lock" /> Secure Online Payments
            </p>
          </div>
          <div className="connect">
            <h3 className="white-text">Categories</h3>
            <ul>
              <li
                className={classes.OrderbarItem}
                id="#all"
                onClick={() => props.getItems()}
              >
                <NavLink to="/shop" exact>
                  All Items{" "}
                </NavLink>
              </li>
              <li
                className={classes.OrderbarItem}
                id="#hat"
                onClick={() => props.getItemByType("hat")}
              >
                <NavLink to="/shop#hat" exact>
                  Hats{" "}
                </NavLink>
              </li>
              <li
                className={classes.OrderbarItem}
                id="#shirt"
                onClick={() => props.getItemByType("shirt")}
              >
                <NavLink to="/shop#shirt" exact>
                  Shirts{" "}
                </NavLink>
              </li>
              <li
                className={classes.OrderbarItem}
                id="#hoodie"
                onClick={() => props.getItemByType("hoodie")}
              >
                <NavLink to="/shop#hoodie" exact>
                  Hoodies{" "}
                </NavLink>
              </li>
              <li
                className={classes.OrderbarItem}
                id="#stickers"
                onClick={() => props.getItemByType("stickers")}
              >
                <NavLink to="/shop#stickers" exact>
                  Stickers{" "}
                </NavLink>
              </li>
              <li
                className={classes.OrderbarItem}
                id="#mug"
                onClick={() => props.getItemByType("mug")}
              >
                <NavLink to="/shop#mug" exact>
                  Mugs{" "}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="projects">
            <h3 className="white-text">Contact</h3>
            <ul className={classes.Contact}>
              <li>
                <span className="fa fa-map-pin" /> Address: 880 Longfellow St.
                Richmond, VA 23223
              </li>
              <li>
                <span className="fa fa-phone" /> Phone: +1 (123) 122-8332
              </li>
              <li>
                <span className="fa fa-envelope" /> Email: test3@gmail.com
              </li>
            </ul>
            <div className={classes.Social}>
              <ul>
                <li>
                  <a className="white-text" href="#">
                    <span className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#">
                    <span className="fa fa-instagram" />
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#">
                    <span className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#">
                    <span className="fa fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container"></div>
      </div>
    </footer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
    getItems: () => {
      dispatch(actions.getItems());
    },
    getItemByType: (type) => {
      dispatch(actions.getItemByType(type));
    },
    loadCart: (cart) => {
      dispatch(actions.loadCart(cart));
    },
    loadShop: (cart) => {
      dispatch(actions.loadShop(cart));
    },
    orderBy: (type) => {
      dispatch(actions.orderBy(type));
    },
    subtractQuantity: (id) => {
      dispatch(actions.subtractQuantity(id));
    },
  };
};

Footer.propTypes = {
  getItemByType: PropTypes.func,
  getItems: PropTypes.func,
};
export default connect(null, mapDispatchToProps)(Footer);

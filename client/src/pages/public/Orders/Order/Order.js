import React from "react";
// import Auxiliary from "../../../../hoc/Auxiliary";
import classes from "./Order.module.css";
import Address from "../../Profile/Address/Address";
import Summary from "../Summary/Summary";
import Item from "../Item/Item";
import PropTypes from "prop-types";

const Order = (props) => {
  console.log("prop.items.map = ", props.items);
  let items = props.items.map((item) => {
    return (
      <Item
        img={item.img}
        id={item.price.id}
        key={item.id}
        alt={item.description}
        title={item.description}
        link={"/shop/"}
        to="/"
        //       clicked     = {() => addToCart(item.id)}
        add={false}
        desc={item.desc}
        price={(item.price.unit_amount / 100) * item.quantity}
        quantity={item.quantity}
      />
    );
  });

  // let getDate = Date.parse(props.date);
  let dateObj = new Date(props.date);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //   var days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  let date =
    months[dateObj.getMonth()] +
    " " +
    dateObj.getDate() +
    ", " +
    dateObj.getFullYear();

  let time;
  dateObj.getHours() > 11
    ? (time =
        (dateObj.getHours() === 12
          ? dateObj.getHours()
          : dateObj.getHours() - 12) +
        ":" +
        dateObj.getMinutes() +
        "pm")
    : (time =
        (dateObj.getHours() < 1
          ? dateObj.getHours() + 12
          : dateObj.getHours()) +
        ":" +
        dateObj.getMinutes() +
        "am");

  return (
    <div className={classes.Order}>
      <p>Ordered on : {date}</p>
      <p>at : {time}</p>
      <p>Order ID : {props.sessionid}</p>
      <div className={classes.bigbox}>
        <div className={classes.box}>
          <Address
            link="Shipping Details"
            name={props.name}
            phone={props.phone}
            address={props.line1}
            address2={props.line2}
            city={props.city}
            state={props.state}
            zipCode={props.postal_code}
            email={props.email}
          />
        </div>
        <div className={classes.box}>
          <Summary
            link="Order Summary"
            amount_subtotal={props.amount_subtotal}
            amount_total={props.amount_total}
          />
        </div>
      </div>
      <div className={classes.Items}>
        <h3>Items</h3>
        {items}
      </div>
    </div>
  );
};
Order.propTypes = {
  items: PropTypes.any,
  getDate: PropTypes.any,
  date: PropTypes.any,
  days: PropTypes.any,
  sessionid: PropTypes.any,
  name: PropTypes.any,
  phone: PropTypes.any,
  line1: PropTypes.any,
  line2: PropTypes.any,
  city: PropTypes.any,
  state: PropTypes.any,
  postal_code: PropTypes.any,
  email: PropTypes.any,
  amount_subtotal: PropTypes.any,
  amount_total: PropTypes.any,
};
export default Order;

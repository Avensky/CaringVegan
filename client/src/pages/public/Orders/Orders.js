import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "./Order/Order";
//import classes from './Orders.module.css';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Wrapper from "../../../components/Wrapper/Wrapper";
import PropTypes from "prop-types";

const Orders = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      props.onFetchOrders(props.user);
    };
    if (props.orders.length === 0) {
      fetchData();
    }
    //console.log('userid = ' + props.user._id)
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => {
      let line_items = order.line_items;
      return (
        <Order
          key={order.sessionid}
          date={order.date}
          amount_total={order.amount_total}
          sessionid={order.sessionid}
          shipping={order.shipping}
          items={line_items}
          name={order.shipping.name}
          phone={order.shipping.address.phone}
          line1={order.shipping.address.line1}
          line2={order.shipping.address.line2}
          city={order.shipping.address.city}
          state={order.shipping.address.state}
          postal_code={order.shipping.address.postal_code}
          email={order.customer_details.email}
          //amount_total    = {order.amount_total}
          amount_subtotal={order.amount_subtotal}
        />
      );
    });
  }
  return (
    <Wrapper>
      <div>
        <div className="page-wrapper">
          <div className="container">
            <div className="page-header text-center">
              <h1>Order History Page</h1>
            </div>
          </div>
          {orders}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    user: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (user) => dispatch(actions.fetchOrders(user)),
  };
};

Orders.propTypes = {
  onFetchOrders: PropTypes.func,
  user: PropTypes.any,
  orders: PropTypes.any,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

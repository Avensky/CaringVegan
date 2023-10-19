import React from "react";
import { connect } from "react-redux";
import Auxiliary from "../../../../hoc/Auxiliary";
import classes from "../Shop.module.css";
import Item from "./Item/Item";
import * as actions from "../../../../store/actions/index";
import Search from "../../../Search/Search";

const Items = (props) => {
  const handleClick = (id) => {
    props.addToCart(id);
  };
  let items = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
  if (!props.items) {
    items = props.items.map((item) => {
      return (
        <Item
          img={item.img}
          id={item.id}
          key={item.id}
          alt={item.title}
          title={item.title}
          link={"/shop/"}
          to="/"
          clicked={() => handleClick(item.id)}
          desc={item.desc}
          price={item.price}
        />
      );
    });
  }
  return (
    <Auxiliary>
      <div className={classes.spread}>
        {/* <input className={classes.Search} type='text' placeholder="search the store" /> */}
        <Search />
        <div className={classes.dropdown}>
          <button className={classes.dropbtn}>OrderBy: </button>
          <div className={classes.dropdownContent}>
            <a href="/price">Price</a>
            <a href="/date">Most recent</a>
            <a href="/popular">Most Popular</a>
          </div>
        </div>
      </div>
      <div className={classes.filter}>
        <label>
          <p>All</p>
        </label>
        <label>
          <p>Books</p>
        </label>
        <label>
          <p>Apparel</p>
        </label>
        <label>
          <p>Hats</p>
        </label>
        <label>
          <p>Misc</p>
        </label>
      </div>
      <div className={classes.Items}>
        <h3 className="center">Our items</h3>
        <div className={["box", classes.Items].join(" ")}>{items}</div>
      </div>
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(actions.addToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

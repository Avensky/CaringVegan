import React, { Component } from "react";
// import axios from 'axios';
import { connect } from "react-redux";
import Item from "../Items/Item/Item";
import classes from "./Details.module.css";
// import classes from '../../Pages.module.scss';
// import * as actions from '../../../../store/actions/index';

class Details extends Component {
  state = {
    id: null,
    loadedItem: null,
  };

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedItem ||
        (this.state.loadedItem &&
          this.state.loadedItem.id !== +this.props.match.params.id)
      ) {
        const itemId = this.props.match.params.id - 1;
        this.setState({ loadedItem: this.props.items[itemId] });
      }
    }
  }

  //    deletePostHandler = () => {
  //        axios.delete('/posts/' + this.props.match.params.id)
  //            .then(response => {
  //                console.log(response);
  //            });
  //    }

  render() {
    let details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

    if (this.props.match.params.id) {
      details = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }

    if (this.state.loadedItem) {
      details = (
        <Item
          class="classes.DetailsItem"
          img={this.state.loadedItem.img}
          id={this.state.loadedItem.id}
          key={this.state.loadedItem.id}
          alt={this.state.loadedItem.title}
          title={this.state.loadedItem.title}
          to="/"
          clicked={() => this.handleClick(this.state.loadedItem.id)}
          desc={this.state.loadedItem.desc}
          price={this.state.loadedItem.price}
          className="Delete"
        />
      );
    }
    return <div className={classes.Item}>{details}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(Details);

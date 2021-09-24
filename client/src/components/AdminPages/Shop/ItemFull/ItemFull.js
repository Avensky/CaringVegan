import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './ItemFull.module.css';
import * as actions from '../../../../store/actions/index';
//import Details from '../Details/Details';
import Item from '../Items/Item/Item'

class ItemFull extends Component {

    state = {
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
    }z

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.id !== +this.props.match.params.id) ) {
                const itemId = this.props.match.params.id;
                this.setState({ loadedItem: this.props.items[itemId]});
            }
        }
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render () {
        let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
        
        if ( this.props.match.params.id ) {
            details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedItem) {
            details = <Item
                class   = 'classes.DetailsItem'
                img     = {this.state.loadedItem.img}
                id      = {this.state.loadedItem.id}
                key     = {this.state.loadedItem.id}
                alt     = {this.state.loadedItem.title}
                title   = {this.state.loadedItem.title}
                link    = {"/shop/itemfull/" + this.state.loadedItem.id}
                to      = "/"
                clicked = {() => this.handleClick(this.state.loadedItem.id)}
                desc    = {this.state.loadedItem.desc}
                price   = {this.state.loadedItem.price}
                className="Delete"
            />
        }
        return(
            <Auxiliary>
                <div className={classes.Item}>
                    {details}
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.cart.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);
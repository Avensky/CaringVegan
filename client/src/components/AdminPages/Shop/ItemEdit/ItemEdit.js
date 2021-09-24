import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './ItemEdit.module.css';
import * as actions from '../../../../store/actions/index';


class ItemEdit extends Component {
    state = {
        itemForm:{
            name: {
                //value: this.props.item.name,
                validation: {
                    required: true,
                }
            },
            age: {
                //value: this.props.item.age,
                validation: {
                    required: true,
                }
            },
            bio: {
                //value: this.props.item.bio,
                validation: {
                    required: true,
                }
            },
            relatives: {
                //value: this.props.item.relatives,
                validation: {
                    required: false,
                }
            }
        },
        error: null,
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
        if (!this.props.item){
            this.props.history.push('/items');
        }
    }


    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.id !== +this.props.match.params.id) ) {
                const itemId = this.props.match.params.id;
                this.props.onGetItemById(itemId);
                this.setState({ loadedItem: this.props.item });
                console.log("item: " + this.props.item)
            }
        }
    }

    updateItemHandler = (event) => {
//        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/items');
//         const author =  this.props.payload.username;
        this.props.onUpdateItem(
            this.state.itemForm.name.value, 
            this.state.itemForm.age.value, 
            this.state.itemForm.relatives.value, 
            this.state.itemForm.bio.value
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.itemForm,
            [controlName]: {
                ...this.state.itemForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.itemForm[controlName].validation ),
                touched: true
            },
            date: {
                ...this.state.itemForm.date,
                value: new Date()
            }
        };
        this.setState( { itemForm: updatedControls } );
    }

    deleteItemHandler = () => {
        const id = this.props.item._id;
        console.log(id)
        this.props.onDeleteItem(id)
    }

    render () {       
        let form = <p style={{textAlign: 'center'}}>Please Select a Item!</p>;
        
        if ( this.props.match.params.id ) {
            form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedItem) {
        form = (
            <form onSubmit={this.updateItemHandler}>
                <legend>Update a Item</legend>
                <div className = {classes.Line}>
                    <label className={classes.Left}>Name: </label>
                    <input 
                        type                = "text"
                        name                = "name"
                        //value       = {this.props.item.name} 
                        defaultValue        = {this.props.item.name}
                        className           ={classes.Right}
                        onChange            = {(event) => this.inputChangedHandler( event, "name")}
                    />
                </div>
                <div className = {classes.Line}>
                    <label className={classes.Left}>Age: </label>
                    <input 
                        type                ="text" 
                        defaultValue        = {this.props.item.age}
                        className           ={classes.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "age")}
                
                    /> 
                </div>
                 <div className = {classes.Line}>
                    <label className={classes.Left}>Bio: </label>
                    <textarea
                        type                ="textarea"
                        defaultValue        = {this.props.item.bio}
                        className           ={classes.Right}
                        rows                ="4" 
                        onChange            ={(event) => this.inputChangedHandler( event, "bio")}/>
                </div>
                <div className = {classes.Line}>
                    <label className={classes.Left}>Relatives: </label>
                    <input 
                        type                = "text" 
                        defaultValue        = {this.props.item.relatives}
                        className           ={classes.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "relatives")}
                    
                    />
                </div>
                <div className="MidLine">
                    <button 
                        className={["btn-warning", classes.btn].join(' ')}
                        onClick={() => this.updateItemHandler()}
                    >UPDATE</button>
                    <button 
                        className={["btn-danger", classes.btn].join(' ')}
                        onClick={() => this.deleteItemHandler()}
                    >DELETE</button>
                </div>
            </form>
        )}

        

        return(
            form
        )
    }
}

const mapStateToProps = state => {
    return {
        items   : state.shop.items,
        item    : state.shop.itemById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetItemById: (id) => dispatch( actions.getItemById(id)),
        onDeleteItem: (id) => dispatch( actions.deleteItem(id)),
        onUpdateItem: (id, name, age, relatives, bio) => dispatch(actions.updateItem(id, name, age, relatives, bio))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ItemEdit);
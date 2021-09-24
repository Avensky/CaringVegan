import React, { useState } from 'react';
//import classes from '../../Pages.module.scss';
import classes from './NewItem.module.css'
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const NewItem = ( props ) => {
    const [name, setName]           = useState("");
    const [desc, setDesc]           = useState("");
    const [price, setPrice]         = useState("");
    const [priceId, setPriceId]     = useState("");
    const [quantity, setQuantity]   = useState("");
    const [avatar, setAvatar]       = useState("");

    return (
        <div className={classes.NewItem}>
            <form action="/api/addImage" method="post" encType="multipart/form-data">
                <div className={classes.MidLine}>
                    <label className={classes.Left}>Name </label> 
                    <input  
                        type="text" 
                        name="name" 
                        onChange={e => setName(e.target.value)}
                        className={classes.Right}
                    />                            
                </div>
                <div className={classes.MidLine}>
                    <label className={classes.Left}>Description </label> 
                    <input  
                        type="text" 
                        name="desc" 
                        onChange={e => setDesc(e.target.value)}
                        className={classes.Right}
                    />
                </div>
            <div className={classes.MidLine}>
                <label className={classes.Left}>Price </label> 
                <input  
                    type="text" 
                    name="price" 
                    onChange={e => setPrice(e.target.value)}
                    placeholder=""
                    className={classes.Right}
                />                            
            </div>
            <div className={classes.MidLine}>
                <label className={classes.Left}>Price Id</label> 
                <input  
                    type="text" 
                    name="priceId" 
                    onChange={e => setPriceId(e.target.value)}
                    placeholder=""
                    className={classes.Right}
                />                            
            </div>
            <div className={classes.MidLine}>
                <label className={classes.Left}>Quantity </label> 
                <input  
                    type="text" 
                    name="quantity"
                    onChange={e => setQuantity(e.target.value)}
                    className={classes.Right}
                />
            </div>
            <div className={classes.MidLine}>
                <label className={classes.Left}>Photo </label> 
                <input  
                    type="file" 
                    name="avatar" 
                    onChange={e => setAvatar(e.target.value)}
                    className={[classes.Photo, classes.Right].join(' ')}
                />                            
            </div>
            <button  
                className={[classes.Btn, classes.AuthBtn, 'auth-btn' ].join(' ')}
                type='submit'>
                <div className={classes.BtnDiv}>Add new item</div>
            </button>
        </form>
        </div>     
    );
}


const mapStateToProps = state => {
    return {
        //error       : state.char.error,
        isLoggedIn  : state.auth.payload !== null,
        payload     : state.auth.payload,
        userId      : state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewItem: (values) => dispatch(actions.newItem(values)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
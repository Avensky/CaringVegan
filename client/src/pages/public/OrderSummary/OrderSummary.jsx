import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary'

const orderSummary = (props) => {
    const itemsSummary = props.items.map(item=>{
        return (
            <li key={item._id}>
                * <span>{item.name}</span> x {item.amount}
            </li>);
    });

    return (
        <Auxiliary>
            <h3>Checkout Summary</h3>
            <p>Is this order correct?</p>
            <ul>
                {itemsSummary}
            </ul> 
            <p><strong>Subtotal: ${props.total}</strong></p>
            <p>Continue to Checkout?</p>
            <div className="spread">

            <button 
                className={["btn-primary btn"].join(' ')}
                onClick={props.purchaseContinued}
            >BUY</button>
                        <button 
                className={["auth-btn btn"].join(' ')}
                onClick={props.purchaseCancelled}
            >CANCEL</button>
            </div>
        </Auxiliary>
    )

};

export default orderSummary;
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import classes from './Checkout.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import { useHistory } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../../../store/actions/index'

const Success = props => {    
    const history = useHistory()
    useEffect(() => {
        localStorage.removeItem('addedItems')
    },[])

    return (
        <div className={['page-wrapper'].join(' ')}>
            <div className={classes.Cart}>
                {/* Title */}
                <div className="container">
                    <div className="page-header text-center border-bottom">
                        <h1>Checkout</h1>
                    </div>
                </div>
                <div className={classes.Progress}>    
                    <title>Thanks for your order!</title>
                
                    <h1>Thanks for your order!</h1>
                    <p>
                        We appreciate your business!
                        If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>
                    </p>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state)=>{
    return{
        items: state.shop.addedItems,
        isAuth: state.auth.payload
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem       : (id)=>{dispatch(removeItem(id))},
        addQuantity      : (id)=>{dispatch(addQuantity(id))},
        subtractQuantity : (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Success)
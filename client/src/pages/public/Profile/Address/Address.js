import React, { useState }  from 'react';
import classes from './Address.module.css';
import Modal from  '../../../../components/UI/Modal/Modal';
// import classes from '../../Pages.module.scss'
import {useHistory} from 'react-router-dom'

const Address = props => {
    const [unlink, setUnlink] = useState(false)

    const unlinkHandler = () => { setUnlink(true) }

    const cancelHandler = () => { setUnlink(false) }
    const history = useHistory()
    const editHandler = () => {
        history.push('/contactData');
    }

    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[classes.Card, classes.Link].join(' ')}>
            <h3>
                <span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} />
                <span> {props.link}</span>
            </h3>
            <div>
                { props.name        ? <strong>   {props.name}<br /></strong>     : null }
                { props.phone       ? <strong>   Phone:</strong>                 : null }
                { props.phone       ? <strong>   {props.phone}<br /></strong>    : null }
                { props.address     ? <strong>   {props.address}<br /></strong>  : null }
                { props.address2    ? <strong>   {props.address2}<br /></strong> : null }
                <div className={classes.place}>
                    { props.city        ? <strong>{props.city},&nbsp;  </strong>    : null }
                    { props.state       ? <strong>{props.state}&nbsp;  </strong>    : null }
                    { props.zipCode     ? <strong>{props.zipCode}&nbsp;<br /></strong>  : null }
                </div>
                { props.email       ? <strong>   {props.email}<br /></strong>    : null }
            </div>
            <br />
            <Modal show={unlink} modalClosed={cancelHandler}>
                <div>
                    <h1>Unlink Account</h1>
                    <p>Are you sure you want to unlink your account?</p>
                    <div className="spread">
                        <a onClick={editHandler}href={props.providerUnlink} className="btn btn-default">Edit</a>
                        <a onClick={cancelHandler} className="btn btn-danger">Cancel</a>
                    </div>
                </div>
            </Modal>            
        { props.provider ? <a className={["btn", props.mystyle].join(' ')} onClick={editHandler}>Update {props.link}</a>:null}
        { props.providerUnlink ? <a onClick={unlinkHandler} className="btn btn-default">Edit</a> :null}
        </div>
        
    )
}

export default Address;
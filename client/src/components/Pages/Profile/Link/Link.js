import React, { useState }  from 'react';
import classes from './Link.module.css';
import Modal from  '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'

const Link = props => {
    const [unlink, setUnlink] = useState(false)

    const unlinkHandler = () => { setUnlink(true) }

    const cancelHandler = () => { setUnlink(false) }

    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[classes.Card, classes.Link,].join(' ')}>

            { props.token || props.id  
                ? <h3><span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} /><span> {props.link}</span></h3>
                : null }
            <div className={classes.Details}>
                { props.name        ? <strong>Name:          {props.name}<br /></strong>         : null }
                { props.displayName ? <strong>Display Name:  {props.displayName}<br /></strong>  : null }
                { props.username    ? <strong>Username:      {props.username}<br /></strong>     : null }
                { props.id          ? <strong>Id:            {props.id}<br /></strong>           : null }
                { props.email       ? <strong>Email:         {props.email}<br /></strong>        : null }
                { props.token       ? <strong>Token:         {props.token}<br /></strong>        : null }
                { props.password    ? <strong>Password:      {props.password}<br /></strong>     : null }
            </div>
            <Modal show={unlink} modalClosed={cancelHandler}>
                <div>
                    <h1>Unlink Account</h1>
                    <p>Are you sure you want to unlink your account?</p>
                    <div className="spread">
                        <a href={props.providerUnlink} className="btn btn-default">Unlink</a>
                        <a onClick={cancelHandler} className="btn btn-danger">Cancel</a>
                    </div>
                </div>
            </Modal>            
        { props.userLink
                ? <div className={classes.authBtn}><a href={props.provider} className={["btn", props.mystyle].join(' ')}><span className={["fa", props.icon].join(' ')} /> Connect <span> {props.link}</span></a></div>
                : <div className={classes.authBtn}><a onClick={unlinkHandler} className="btn btn-default">Unlink</a></div>
            }
        </div>
        
    )
}

export default Link;
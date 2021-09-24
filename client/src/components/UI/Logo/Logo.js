import React from 'react';

import myLogo from '../../../assets/images/logo.svg';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={myLogo} alt="logo" />
    </div>
);

export default logo;
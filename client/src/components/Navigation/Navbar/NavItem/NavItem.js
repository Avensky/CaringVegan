import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';
import PropTypes from 'prop-types';

const NavItem = ( props ) => (
    <div className={classes.NavItem} onClick={props.onClick}>
            <NavLink 
                to={props.to}
                exact={props.exact}
                className={navData => (navData.isActive 
                    ? [classes.active, props.className].join(' ') 
                    : props.className)
                  }
                >{props.children}
            </NavLink>
    </div>
);

NavItem.propTypes = {
    to : PropTypes.string,
    exact : PropTypes.string,
    children : PropTypes.any,
    className : PropTypes.string,
    onClick: PropTypes.func,
};

export default NavItem;

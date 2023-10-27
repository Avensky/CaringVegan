import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SidebarItem.module.css';
import PropTypes from 'prop-types';

const SidebarItem = ( props ) => (
    <div className={classes.SidebarItem}>
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

SidebarItem.propTypes = {
    to : PropTypes.string,
    exact : PropTypes.string,
    children : PropTypes.any,
    className : PropTypes.string
};

export default SidebarItem;

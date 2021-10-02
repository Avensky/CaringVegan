import React from 'react';
import classes from './Navbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
//import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = ( props ) => {
    let cart = (
        <NavLink  to="/cart" className={classes.line}> 
            <span className={["fa", "fa-shopping-cart", 'inline', classes.left].join(' ')}/>
            {/*<h3 className='inline'>({props.totalItems})</h3>*/}
        </NavLink > 
    )
    
    return (
        <div className={classes.Navbar}>
            {/* <SidebarToggle clicked={props.sidebarToggleClicked} />   */}
            <i className={['fa fa-bars', classes.SidebarToggle,classes.MobileLinks, classes.Mobile].join(' ')} onClick={props.sidebarToggleClicked} />

            <div className={[classes.LogoWrapper, classes.Mobile].join(' ')}>
                    <NavLink  to="/">
                        <div className={classes.Logo}>
                            <Logo />
                            <div className={classes.LogoName}>CaringVegan</div>
                        </div>  
                    </NavLink >
            </div>

            <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
                <h2 className="line">
                    {/*props.isAuth !== null
                        ? <div className={classes.NavItem}><a  href="/api/logout">Logout </a></div>
                    : null*/}          
                    {cart}
                    {/* props.isAuth !== null
                        ? <NavLink to="/profile"   ><h3><span className={["fa fa-user", classes.user].join(' ')} /></h3></NavLink>
                        :<NavLink to="/authentication"   ><h2 className={classes.NavItemLogo}><span className="fa fa-sign-in" /></h2></NavLink>
                    */}                                   
                </h2>
            </div>
            <div className={classes.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth} totalItems={props.totalItems}/>
            </div>
        </div>
    )
}


export default navbar;
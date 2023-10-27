import React from "react";
import Logo from "../../UI/Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import classes from "./Sidebar.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
//import Auxiliary from '../../../hoc/Auxiliary';
import { Link } from "react-router-dom";

const sidebar = (props) => {
  let attachedClasses = [classes.Sidebar, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Sidebar, classes.Open];
  }
  return (
    <div className={classes.SidebarWrapper}>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.LogoWrapper}>
          <Link to="/home">
            <Logo />
          </Link>
        </div>
        <div className={classes.heading}>Pages</div>
        <SidebarItem exact="true" to="/home">
          Home
        </SidebarItem>
        <SidebarItem exact="true" to="/shop">
          Shop
        </SidebarItem>
        <SidebarItem exact="true" to="/cart">
          Cart
        </SidebarItem>
        {!props.user ? (
          <SidebarItem exact="true" to="/login">
            Login
          </SidebarItem>
        ) : (
          <div className={classes.SidebarItemWrapper} onClick={props.logout}>
            <div className={classes.SidebarItem}>Logout</div>
          </div>
        )}

        {/* <div className={classes.heading}>Admin Dashboard</div>
                <SidebarItem exact='true' to='/ecommerce'>ECommerce</SidebarItem>
                <SidebarItem exact='true' to='/pages'>Pages</SidebarItem>
                <SidebarItem exact='true' to='/orders'>Orders</SidebarItem>
                <SidebarItem exact='true' to='/customers'>Customers</SidebarItem>
                <div className={classes.heading}>Apps</div>
                <SidebarItem exact='true' to='/calendar'>Calendar</SidebarItem>
                <SidebarItem exact='true' to='/kanbar'>Kanban</SidebarItem>
                <SidebarItem exact='true' to='/editor'>Editor</SidebarItem>
                <SidebarItem exact='true' to='/color-picker'>Color-Picker</SidebarItem>
                <div className={classes.heading}>Charts</div>
                <SidebarItem exact='true' to='/line'>Line</SidebarItem>
                <SidebarItem exact='true' to='/area'>Area</SidebarItem>
                <SidebarItem exact='true' to='/bar'>Bar</SidebarItem>
                <SidebarItem exact='true' to='/pie'>Pie</SidebarItem>
                <SidebarItem exact='true' to='/finacial'>Financial</SidebarItem>
                <SidebarItem exact='true' to='/color-mapping'>Color-Mapping</SidebarItem>
                <SidebarItem exact='true' to='/pyramid'>pyramid</SidebarItem>
                <SidebarItem exact='true' to='/stacked'>Stacked</SidebarItem> */}
      </div>
    </div>
  );
};

export default sidebar;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import Link from "./Link/Link";
import classes from "./Profile.module.css";
import * as actions from "../../../store/actions/index";
import Wrapper from "../../../components/Wrapper/Wrapper";
import PropTypes from "prop-types";

// import Address from './Address/Address'
// import { useHistory }from 'react-router-dom'
const Profile = (props) => {
  // let address;
  let local,
    facebook,
    twitter,
    google = "";
  //const user = props.payload;
  //const history = useHistory()
  //const editAddressHandler = () => {history.push('/contactData')}

  useEffect(() => {
    const fetchData = async () => {
      props.onFetchUser();
    };
    if (props.authRedirectPath !== "/") {
      fetchData();
    }
  }, []);

  // address = (
  //     <Address
  //         link     = 'Address'
  //         userLink = {true}
  //         provider = '/api/contactData'
  //     />
  // )
  //
  // if (props.payload['addresses']) {
  //     address = (
  //         <Address
  //             clicked  = {() =>editAddressHandler()}
  //             link     = 'Shipping Address'
  //             userLink = {true}
  //             provider = '/api/contactData'
  //             name     = {user.addresses.name}
  //             phone    = {user.addresses.phone}
  //             address  = {user.addresses.address1}
  //             address2 = {user.addresses.address2}
  //             city     = {user.addresses.city}
  //             state    = {user.addresses.state}
  //             zipCode  = {user.addresses.zipCode}
  //             email    = {user.addresses.email}
  //         />
  //     )
  // }
  local = (
    <Link
      link="Local"
      userLink={true}
      icon="fa-user"
      mystyle="auth-btn"
      provider="/connect"
      providerUnlink="/api/unlink/local"
    />
  );

  facebook = (
    <Link
      link="Facebook"
      userLink={true}
      icon="fa-facebook"
      mystyle="btn-primary"
      provider="/api/connect/facebook"
      providerUnlink="/api/unlink/facebook"
    />
  );

  google = (
    <Link
      link="Google"
      userLink={true}
      icon="fa-google-plus"
      mystyle="btn-danger"
      provider="/api/connect/google"
      providerUnlink="/api/unlink/google"
    />
  );

  if (props.payload["local"]) {
    local = (
      <Link
        id={props.payload["_id"]}
        link="Local"
        userLink={false}
        email={props.payload["local"].email}
        token={props.payload["local"].token}
        name={props.payload["local"].name}
        icon="fa-user"
        mystyle="auth-btn"
        provider="/api/authentication"
        providerUnlink="/api/unlink/local"
      />
    );
  }

  if (props.payload["facebook"] && props.payload["facebook"].token) {
    facebook = (
      <Link
        id={props.payload["facebook"].id}
        link="Facebook"
        userLink={false}
        email={props.payload["facebook"].email}
        token={props.payload["facebook"].token}
        name={props.payload["facebook"].name}
        icon="fa-facebook"
        mystyle="btn-primary"
        provider="/api/connect/facebook"
        providerUnlink="/api/unlink/facebook"
      />
    );
  }

  if (props.payload["twitter"] && props.payload["twitter"].token) {
    twitter = (
      <Link
        id={props.payload["twitter"].id}
        link="Twitter"
        userLink={false}
        displayName={props.payload["twitter"].displayName}
        //token       = "token"
        username={props.payload["twitter"].username}
        token={props.payload["twitter"].token}
        icon="fa-twitter"
        mystyle="btn-info"
        provider="/api/connect/twitter"
        providerUnlink="/api/unlink/twitter"
      />
    );
  } else {
    twitter = (
      <Link
        link="Twitter"
        userLink={true}
        icon="fa-twitter"
        mystyle="btn-info"
        provider="/api/connect/twitter"
        providerUnlink="/api/unlink/twitter"
      />
    );
  }

  if (props.payload["google"] && props.payload["google"].token) {
    google = (
      <Link
        id={props.payload["google"].id}
        link="Google"
        userLink={false}
        email={props.payload["google"].email}
        token={props.payload["google"].token}
        name={props.payload["google"].name}
        icon="fa-google-plus"
        mystyle="btn-danger"
        provider="/api/connect/google"
        providerUnlink="/api/unlink/google"
      />
    );
  }

  return (
    <Wrapper>
      <div className="page-wrapper">
        <div className="text-center">
          <h1>
            <span className="fa fa-anchor"></span> Profile Page
          </h1>
        </div>
        <div className={classes.Link}>{local}</div>
        <div className={classes.Link}>{facebook}</div>
        <div className={classes.Link}>{twitter}</div>
        <div className={classes.Link}>{google}</div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    payload: state.auth.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
  };
};

Profile.propTypes = {
  payload: PropTypes.object,
  authRedirectPath: PropTypes.string,
  onFetchUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

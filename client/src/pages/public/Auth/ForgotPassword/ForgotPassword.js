import React from "react";
import { connect } from "react-redux";
import classes from "./ForgotPassword.module.css";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import Logo from "../../../../components/UI/Logo/Logo";
import PropTypes from "prop-types";
import AuthNav from "../AuthNav/AuthNav";
import AuthForm from "../AuthForm/AuthForm";
import SocialAuth from "../SocialAuth/SocialAuth";
const ForgotPassword = (props) => {
  let form;
  const auth = "forgot-password";
  const onAuth = (values, auth) => {
    props.onAuth(values, auth);
  };
  props.loading
    ? (form = <Spinner />)
    : (form = (
        <AuthForm
          onAuth={onAuth}
          auth={auth}
          message={props.message}
          loading={props.loading}
        />
      ));

  return (
    <div className="page-wrapper">
      {props.user ? <Navigate to="/" /> : null}
      <div className={classes.Auth}>
        <Logo height="8vh" />

        <AuthNav />
        <div>
          <h2>Forgot Password</h2>
          <p className="text-left">
            Enter an email address to get a password reset link
          </p>
        </div>
        <br />
        {form}
        <SocialAuth />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    //        userLoading         : state.auth.userLoading,
    //        submitted           : state.auth.submitted,
    //        error               : state.auth.error,
    user: state.auth.user,
    //        isAuthenticated     : state.auth.payload,
    //        authRedirectPath    : state.auth.authRedirectPath,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (values, auth, token) =>
      dispatch(actions.auth(values, auth, token)),
    //        onFbAuth                : ()                    => dispatch(),
    //        onSetAuthRedirectPath   : ()                    => dispatch(),
  };
};

ForgotPassword.propTypes = {
  //    match : PropTypes.any,
  onAuth: PropTypes.func,
  //    onFetchUser : PropTypes.any,
  //    authRedirectPath : PropTypes.any,
  loading: PropTypes.bool,
  //    fetchedUser : PropTypes.any,
  submitted: PropTypes.bool,
  userLoading: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.any,
  message: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

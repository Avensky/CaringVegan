import React from "react";
import { connect } from "react-redux";
import classes from "./Signup.module.css";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import Logo from "../../../../components/UI/Logo/Logo";
import PropTypes from "prop-types";
import AuthNav from "../AuthNav/AuthNav";
import SocialAuth from "../SocialAuth/SocialAuth";
import AuthForm from "../AuthForm/AuthForm";

const Signup = (props) => {
  const auth = "signup";
  const onAuth = (values, auth) => {
    props.onAuth(values, auth);
  };
  let form;

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
        <AuthNav style={auth} />
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
    userLoading: state.auth.userLoading,
    submitted: state.auth.submitted,
    error: state.auth.error,
    user: state.auth.user,
    isAuthenticated: state.auth.payload,
    authRedirectPath: state.auth.authRedirectPath,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //        onFetchUser             : ()                    => dispatch(),
    onAuth: (values, auth, token) =>
      dispatch(actions.auth(values, auth, token)),
    //        onFbAuth                : ()                    => dispatch(),
    //        onSetAuthRedirectPath   : ()                    => dispatch(),
  };
};

Signup.propTypes = {
  match: PropTypes.any,
  onAuth: PropTypes.any,
  onFetchUser: PropTypes.any,
  authRedirectPath: PropTypes.any,
  loading: PropTypes.any,
  fetchedUser: PropTypes.any,
  submitted: PropTypes.any,
  userLoading: PropTypes.any,
  message: PropTypes.any,
  user: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

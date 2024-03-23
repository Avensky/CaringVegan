import React from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Logo from "../../../../components/UI/Logo/Logo";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthNav from "../AuthNav/AuthNav";
import SocialAuth from "../SocialAuth/SocialAuth";
import AuthForm from "../AuthForm/AuthForm";
// import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const auth = "login";
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
  // const navigate = useNavigate();
  if (props.user) {
    // navigate(props.redirectPath);
  }
  return (
    <div className="page-wrapper">
      {props.user ? <Navigate to="/" /> : null}
      <div className={classes.Auth}>
        <Logo height="8vh" />
        <AuthNav style="login" />
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
    error: state.auth.error,
    user: state.auth.user,
    redirectPath: state.auth.redirectPath,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (values, auth, token) =>
      dispatch(actions.auth(values, auth, token)),
  };
};

Login.propTypes = {
  message: PropTypes.any,
  onAuth: PropTypes.func,
  redirectPath: PropTypes.any,
  loading: PropTypes.any,
  user: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

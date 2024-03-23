import React from "react";
import { connect } from "react-redux";
import classes from "./ResetPassword.module.css";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { Navigate, useParams } from "react-router-dom";
import Logo from "../../../../components/UI/Logo/Logo";
import AuthNav from "../AuthNav/AuthNav";
import AuthForm from "../AuthForm/AuthForm";
import PropTypes from "prop-types";

const ResetPassword = (props) => {
  const auth = "reset-password";
  console.log("auth", auth);

  const { token } = useParams();
  console.log("page token", token);

  const onAuth = (values, auth, token) => {
    props.onAuth(values, auth, token);
  };

  let form;

  props.loading
    ? (form = <Spinner />)
    : (form = (
        <AuthForm
          onAuth={onAuth}
          auth={auth}
          token={token}
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
        <h2>Create a new password!</h2>
        <br />
        {form}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(),
    onAuth: (values, auth, token) =>
      dispatch(actions.auth(values, auth, token)),
    onFbAuth: () => dispatch(),
    onSetAuthRedirectPath: () => dispatch(),
  };
};

ResetPassword.propTypes = {
  onAuth: PropTypes.func,
  loading: PropTypes.bool,
  message: PropTypes.string,
  user: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

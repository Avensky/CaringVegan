import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submitHandler = (values, submitProps) => {
    //console.log('Form data', values)
    //console.log('submitProps', submitProps)
    props.onAuth(values, props.auth, props.token);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  let email,
    password,
    initialValues,
    validationSchema,
    confirmPassword,
    buttonName,
    login,
    register,
    forgotPassword,
    resetPassword;

  if (props.auth === "forgot-password") {
    initialValues = {
      email: "",
    };

    validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
    });

    buttonName = "Forgot Password";

    forgotPassword = (
      <>
        {/* email */}
        <div className="flex">
          <Field
            type="email"
            name="email"
            placeholder="Email Address"
            className={classes.AuthInput}
          />
        </div>
        <ErrorMessage className="color-orange" name="email" component="div" />
      </>
    );
  }

  if (props.auth === "login") {
    initialValues = {
      email: "",
      password: "",
    };

    validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
    });

    buttonName = "login";

    login = (
      <>
        {/* email */}
        <div className="flex">
          <Field
            type="email"
            name="email"
            placeholder="Email Address"
            className={classes.AuthInput}
          />
        </div>
        <ErrorMessage className="color-orange" name="email" component="div" />

        {/* password */}
        <div className="flex">
          <Field
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={classes.AuthInput}
          />
          <FontAwesomeIcon
            className={classes.eye}
            icon={passwordShown ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <ErrorMessage
          className="color-orange"
          name="password"
          component="div"
        />
      </>
    );
  }

  if (props.auth === "signup") {
    initialValues = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
    validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .max(15, "Maximum 15 characters")
        .required("Password is required!")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords  must match")
        .required("Password confirm is required!"),
    });

    register = (
      <>
        {/* email */}
        <div className="flex">
          <Field
            type="email"
            name="email"
            placeholder="Email Address"
            className={classes.AuthInput}
          />
        </div>
        <ErrorMessage className="color-orange" name="email" component="div" />

        {/* password */}
        <div className="flex">
          <Field
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={classes.AuthInput}
          />
          <FontAwesomeIcon
            className={classes.eye}
            icon={passwordShown ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <ErrorMessage
          className="color-orange"
          name="password"
          component="div"
        />

        {/* confirm_password */}
        <div className="flex">
          <Field
            type={passwordShown ? "text" : "password"}
            name="passwordConfirm"
            placeholder="Confirm Password"
            className={classes.AuthInput}
          />
          <FontAwesomeIcon
            className={classes.eye}
            icon={passwordShown ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <ErrorMessage
          className="color-orange"
          name="passwordConfirm"
          component="div"
        />
      </>
    );
    buttonName = "Register";
  }

  if (props.auth === "reset-password") {
    initialValues = {
      password: "",
      passwordConfirm: "",
    };
    validationSchema = Yup.object({
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .max(15, "Maximum 15 characters")
        .required("Password is required!")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords  must match")
        .required("Password confirm is required!"),
    });

    resetPassword = (
      <>
        {/* password */}
        <div className="flex">
          <Field
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={classes.AuthInput}
          />
          <FontAwesomeIcon
            className={classes.eye}
            icon={passwordShown ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <ErrorMessage
          className="color-orange"
          name="password"
          component="div"
        />

        {/* confirm_password */}
        <div className="flex">
          <Field
            type={passwordShown ? "text" : "password"}
            name="passwordConfirm"
            placeholder="Confirm Password"
            className={classes.AuthInput}
          />
          <FontAwesomeIcon
            className={classes.eye}
            icon={passwordShown ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <ErrorMessage
          className="color-orange"
          name="passwordConfirm"
          component="div"
        />
      </>
    );
    buttonName = "Update Password!";
  }

  let message = false;
  if (props.message) {
    message = <p className="color-orange">{props.message}</p>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          {/* Display feedback from server */}
          {message}

          {/*form input and form errors */}
          {forgotPassword}

          {/*form input and form errors */}
          {login}

          {/*form input and form errors */}
          {register}

          {/*form input and form errors */}
          {resetPassword}

          {/*email input and form errors */}
          {email}

          {/* password input and form errors*/}
          {password}

          {/* confirm password input and form errors*/}
          {confirmPassword}
          <br />
          {props.auth === "login" || props.auth === "signup" ? (
            <div className="text-right">
              <NavLink to="/forgotPassword">Forgot Password?</NavLink>
            </div>
          ) : null}
          <br />
          <button
            className={[classes.Btn, classes.AuthBtn, "auth-btn"].join(" ")}
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            <div className={classes.BtnDiv}>
              <span className={["fa fa-sign-in"].join(" ")}></span> {buttonName}
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  onAuth: PropTypes.func,
  message: PropTypes.any,
  loading: PropTypes.bool,
  auth: PropTypes.string,
  token: PropTypes.string,
};

export default AuthForm;

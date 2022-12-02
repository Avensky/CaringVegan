
import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout/Layout';
import {connect} from 'react-redux';
import classes from './ResetPassword.module.css';
import Auxiliary from '../../../../hoc/Auxiliary';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import { NavLink, Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from '../../../../components/UI/Footer/Footer';
import Logo from '../../../../components/UI/Logo/Logo';
const ResetPassword = props => {
    const [auth, setAuth] = useState('login')
    console.log('auth',auth)
    const [token, setToken] = useState(props.match.params.token)
    console.log('token',token)

    const [passwordComfirmShown, setPasswordComfirmShown] = useState(false);    
    const togglePasswordComfirmVisiblity = () => {setPasswordComfirmShown(passwordComfirmShown ? false : true)}
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true)}

    useEffect(() => {
        console.log('ping')
        if (props.match.params.token){
            setAuth('reset-password')
        } else {
            setAuth('login')
        }
    },[props.match.params])

    const loginToggleHandler    = () => {setAuth('login')}
    const registerToggleHandler = () => {setAuth('register')}
    const forgotPasswordHandler = () => {setAuth('forgot-password')}
    const resetPasswordHandler  = () => {setAuth('reset-password')}

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps)
        props.onAuth( values, auth, token)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    } 

    useEffect(()=> {
        const fetchData = async () => {props.onFetchUser()}
          if ( !props.fetchedUser){fetchData()}
        }, [props.fetchedUser, props.authRedirectPath])

    // let act = 'login';
    // if (!auth) {
    //     act = 'signup'
    // }
    // const [formValues, setFormValues] = useState(null)

    let initialValues, validationSchema, selected, unselected, form, button, authSelector, socialAuth, loader

            initialValues = {
                password: '',
                confirm_password: ''
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
                confirm_password: Yup.string()
                    .oneOf([Yup.ref("password")], "Passwords  must match")
                    .required("Password confirm is required!")
            });
            selected = [classes.AuthToggle, classes.AuthSelected].join(' ')
            unselected = classes.AuthToggle
            authSelector = <div className={classes.AuthNav}>
                <NavLink 
                    to='/login'
                    className={unselected}
                ><h1 className="pointer"><span className="fa fa-sign-in pointer" /> Login</h1>
                </NavLink>
                <NavLink 
                    to = '/register'
                    className={unselected}
                ><h1 className="pointer"><span className="fa fa-user" /> Signup</h1>
                </NavLink>   
            </div>
            
            props.loading || props.submitted && props.userLoading
                ? form = <Spinner />
                : form = <Auxiliary>
                    <div className='flex'>
                        <Field 
                            type={passwordShown ? "text" : "password"}
                            name="password" 
                            placeholder="Password"
                            className={classes.AuthInput}
                        /><span className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}  onClick={togglePasswordVisiblity} ></span>
                    </div>
                    <ErrorMessage className='color-orange'name="password" component="div" />
                    <div className='flex'>
                        <Field 
                            type={passwordComfirmShown ? "text" : "password"}
                            name="confirm_password" 
                            placeholder="Confirm Password"
                            className={classes.AuthInput}
                        /><span className={passwordComfirmShown ? "fa fa-eye-slash" : "fa fa-eye"} onClick={togglePasswordComfirmVisiblity} ></span>
                    </div>
                    <ErrorMessage className='color-orange'name="confirm_password" component="div" />     
                </Auxiliary>
            button = <div className={classes.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Reset Password</div>    

    let message = false;
    if ( props.token ) {
        message = <p className='color-orange'>{props.token.message}</p>
    }

    let authRedirect = null;
    if ( props.isAuthenticated ) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
        <Layout>
            <div className={[classes.Card, classes.Auth].join(' ')}>
            {authRedirect}
            <NavLink to='/home'>
                <Logo height='8vh'/>
            </NavLink>
            {authSelector}
            <h2>Create a new password!</h2>
            <br />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
                enableReinitialize> 
                { formik => 
                <Form>
                    {message}
                    {form}
                    <br />
                    <button  
                        className={[classes.Btn, classes.AuthBtn, 'auth-btn' ].join(' ')}
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting }
                    >
                        {button}
                    </button>
                </Form>}
            </Formik>
            {socialAuth}
            </div> 
            <Footer />
        </Layout>
    )
    
}

const mapStateToProps = state => {
    return {
        loading             : state.auth.loading,
        userLoading         : state.auth.userLoading,
        submitted           : state.auth.submitted,
        error               : state.auth.error,
        isLoggedIn          : state.auth.user,
        isAuthenticated     : state.auth.payload,
        authRedirectPath    : state.auth.authRedirectPath,
        token               : state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser             : ()                    => dispatch(actions.fetchUser()),
        onAuth                  : (values, auth, token) => dispatch(actions.auth(values, auth, token)),
        onFbAuth                : ()                    => dispatch(actions.fbAuth()),
        onSetAuthRedirectPath   : ()                    => dispatch(actions.setAuthRedirectPath('/profile')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ResetPassword);

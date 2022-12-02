import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout/Layout';
import {connect} from 'react-redux';
import classes from './Login.module.css';
import Auxiliary from '../../../../hoc/Auxiliary';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from '../../../../components/UI/Footer/Footer';
import Logo from '../../../../components/UI/Logo/Logo';
import { NavLink } from 'react-router-dom';

const Auth = props => {
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
                email: '', 
                password: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!"),
                password: Yup.string()
                    .min(8, "Minimum 8 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Required!")
            });

            selected = [classes.AuthToggle, classes.AuthSelected].join(' ')
            unselected = classes.AuthToggle
            authSelector = <div className={classes.AuthNav}>
                <button 
                    onClick={loginToggleHandler}
                    className={selected}
                ><h1 className="pointer"><span className="fa fa-sign-in pointer" /> Login</h1>
                </button>
                <NavLink 
                    to = '/register'
                    className={unselected}
                ><h1 className="pointer"><span className="fa fa-user" /> Signup</h1>
                </NavLink>   
            </div>
            props.loading
                ? form = <Spinner />
                : form = <Auxiliary>
                    <div className='flex'>
                        <Field 
                            type="email" 
                            name="email" 
                            placeholder="Email Address"
                            className={classes.AuthInput}
                        />                        
                    </div>
                    <ErrorMessage className='color-orange'name="email" component="div" />
                    <div className='flex'>
                        <Field 
                            type={passwordShown ? "text" : "password"}
                            name="password" 
                            placeholder="Password"
                            className={classes.AuthInput}
                        /><span className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}  onClick={togglePasswordVisiblity} ></span>
                    </div>
                    <ErrorMessage className='color-orange'name="password" component="div" />
                    <br />
                    <div className='text-right'><NavLink to='/forgotPassword'>Forgot Password?</NavLink></div>
                </Auxiliary>
            button = <div className={classes.BtnDiv}><span className={['fa fa-sign-in'].join(' ')}></span> Sign In</div>
            !props.loading
                ? socialAuth = <Auxiliary>
                    <br />
                    <div className='text-left'>Or continue with:</div>
                    <br />
                    <button type='submit' className={[classes.Btn, "btn-primary"].join(' ')}>
                        <a  
                            href="/api/facebook"
                            //onClick={socialAuthHandler}
                        ><div className={classes.BtnDiv}><span className="fa fa-facebook" /> Facebook</div></a>
                    </button>
                    <button className={[classes.Btn, "btn-info"].join(' ')}>
                        <a href="/api/twitter"><div className={classes.BtnDiv}><span className="fa fa-twitter" /> Twitter</div></a>
                    </button>
                    <button className={[classes.Btn, "btn-danger"].join(' ')}>
                        <a href="/api/google"><div className={classes.BtnDiv}><span className="fa fa-google-plus" /> Google+</div></a>
                    </button>
                </Auxiliary>
                : socialAuth = null
            

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
            <NavLink to='/home'>
                <Logo height='8vh'/>
            </NavLink>
            {authRedirect}
            {authSelector}
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

export default connect (mapStateToProps, mapDispatchToProps)(Auth);

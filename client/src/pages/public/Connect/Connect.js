import React from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../hoc/Auxiliary';
import classes from './Connect.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
//import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { Persist } from 'formik-persist'
import * as Yup from 'yup'

const connectLocal = props => {
    const submitHandler = ( values, submitProps ) => {
        console.log('Form data', values)
        console.log('submitProps', submitProps)
        //debugger
        props.onConnect(values)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    let message = false;
    if ( props.token ) {message = <p>{props.token.message}</p>}

    let authRedirect = null;
    if (props.authRedirectPath !== '/') {
         authRedirect = <Redirect to={props.authRedirectPath} />
    }
    
    const initialValues = {
        email: '', 
        password: '',
        confirm_password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
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
    })
    
    let loader
    if ( props.loading || (props.submitted && props.userLoading)) {
        //form = <Spinner />
        loader = <Spinner />

    }
    
    return(
        <div className={[classes.Card, classes.Auth].join(' ')}>
            <div className={classes.AuthNav}>
            <h1 className='border-bottom'><span className="fa fa-sign-in" /> Connect Local</h1>
            </div>
            {authRedirect}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
                enableReinitialize> 
                { formik => 
                <Form>
                    {message}
                    <Field 
                        type="email" 
                        name="email" 
                        placeholder="Email Address"
                        className={classes.AuthInput}
                    />
                    <ErrorMessage name="email" component="div" />
                    <Field 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        className={classes.AuthInput}
                    />
                    <ErrorMessage name="password" component="div" />
                    <Field 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Confirm Password"
                        className={classes.AuthInput}
                    />
                    <ErrorMessage name="confirm_password" component="div" />
                    <button  
                        className={[classes.Btn, classes.AuthBtn, 'auth-btn' ].join(' ')}
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting }
                    >
                        <div className={classes.BtnDiv}>
                            <span className="fa fa-user" /> Connect Local
                        </div>
                    </button>
                </Form>}
            </Formik>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        loading             : state.auth.loading,
        error               : state.auth.error,
        isLoggedIn          : state.auth.user,
        isAuthenticated     : state.auth.payload,
        authRedirectPath    : state.auth.authRedirectPath,
        token               : state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConnect              : (values)   => dispatch(actions.connect(values)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(connectLocal);

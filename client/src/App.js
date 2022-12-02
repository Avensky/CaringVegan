import React, { useEffect, Suspense } from 'react';
import './App.css';
import { connect }                    from 'react-redux';
import { Route, Switch }              from 'react-router-dom';
import * as actions                   from './store/actions/index';
//import Wrapper                        from './components/Wrapper/Wrapper';
import Home                           from './pages/public/Home/Home';
import Profile                        from './pages/public/Profile/Profile'
import Auth                           from './pages/public/Auth/Auth';
import Login                          from './pages/public/Auth/Login/Login';
import Register                       from './pages/public/Auth/Register/Register';
import ResetPassword                  from './pages/public/Auth/ResetPassword/ResetPassword';
import ForgotPassword                 from './pages/public/Auth/ForgotPassword/ForgotPassword';
import Connect	                      from './pages/public/Connect/Connect';
import Shop                           from './pages/public/Shop/Shop';
import Cart                           from './pages/public/Cart/Cart';
import Orders                         from './pages/public/Orders/Orders';
import Checkout                       from './pages/public/Checkout/Success';
import ItemFull                       from './pages/public/Shop/ItemFull/ItemFull';

const App = props => {
  const { fetchedUser } = props
  
  const fetchData = async () => { props.onFetchUser() }
  
  useEffect(()=> { 
    if ( !fetchedUser){
      fetchData()
    }
  }, [fetchedUser])

  let routes = (
    <Switch>
      <Route path="/checkout"               component={Checkout} />
      <Route path="/authentication"         component={Auth} />
      <Route path="/login"                  component={Login} />
      <Route path="/register"               component={Register} />
      <Route path="/forgotPassword"         component={ForgotPassword} />
      <Route path="/resetPassword"          component={ResetPassword} />
      <Route 
        exact 
        path="/resetPassword/:token"       
        render={props => <ResetPassword {...props} />} 
      />
      <Route path="/home"                   component={Home} />   
      <Route path="/connect"                component={Connect} />
      <Route path="/shop"                   component={Shop} exact />
      <Route path="/shop/itemfull/:itemId"  component={ItemFull} />
      <Route path="/cart"                   component={Cart} />
      <Route path="/"                       component={Home} />                
    </Switch>
  )

  if (props.fetchedUser) {
    routes = (
      <Switch>
        <Route path="/checkout"               component={Checkout} />
        <Route path="/authentication"         render={props => <Auth {...props} />} />
        <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
        <Route path="/home"                   component={Home} />         
        <Route path="/connect"                component={Connect} />
        <Route path="/profile"                component={Profile} />
        <Route path="/shop"                   component={Shop} exact />
        <Route path="/shop/itemfull/:itemId"  component={ItemFull} />
        <Route path="/cart"                   component={Cart} />
        <Route path="/orders"                 component={Orders} />
        <Route path="/"                       component={Home} />             
      </Switch>
    )
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
  );
}

const mapStateToProps = state => {
  return {
    fetchedUser       : state.auth.payload,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser           : () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

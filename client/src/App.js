import React, { useEffect, Suspense } from 'react';
import './App.css';
import { connect }                    from 'react-redux';
import { Route, Switch }              from 'react-router-dom'
import * as actions                   from './store/actions/index';
import Wrapper                        from './components/Wrapper/Wrapper'
import Home                           from './components/Pages/Home/Home'
import Profile                        from './components/Pages/Profile/Profile'
import Auth                           from './components/Pages/Auth/Auth'
import Connect	                      from './components/Pages/Connect/Connect'
import Shop                           from './components/Pages/Shop/Shop'
import AdminShop                      from './components/AdminPages/Shop/Shop'
import Cart                           from './components/Pages/Cart/Cart'
import Orders                         from './components/Pages/Orders/Orders'
import Checkout                       from './components/Pages/Checkout/Success'
import ItemFull                       from './components/Pages/Shop/ItemFull/ItemFull'
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
      <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
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

  
  if (props.fetchedUser && (props.fetchedUser.role === 'admin')) {
    routes = (
      <Switch>
        <Route path="/checkout"             component={Checkout} />
        <Route path="/authentication"       render={props => <Auth {...props} />} />
        <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
        <Route path="/home"                 component={Home} />         
        <Route path="/connect"              component={Connect} />
        <Route path="/profile"              component={Profile} />
        <Route path="/shop"                 component={AdminShop} />
        <Route path="/cart"                 component={Cart} />
        <Route path="/orders"               component={Orders} />
        <Route path="/"                     component={Home} />             
      </Switch>
    )
  }

  return (
    <Wrapper><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Wrapper>
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

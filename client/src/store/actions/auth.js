import axios from "axios";
//import axios from 'axios-https-proxy-fix';
// const axios = require('axios-proxy-fix');
import * as actionTypes from "./actionTypes";

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};

export const fetchUserSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: payload,
  };
};

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error,
  };
};

//export const fetchUser = () => {
//    return dispatch => {
//        dispatch(fetchUserStart());
//        axios.get('/api/fetchUser')
//        .then( result => {
//            console.log(result)
//            const payload = result.data
//            dispatch(fetchUserSuccess(payload));
//        })
//        .catch( error => {
//                dispatch(fetchUserFail(error));
//        });
//    }
//}

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    axios
      .get("/api/fetchUser")
      .then((result) => {
        console.log(result);
        const payload = result.data;
        dispatch(fetchUserSuccess(payload));
      })
      .catch((error) => {
        dispatch(fetchUserFail(error));
      });
  };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetchUsersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: payload,
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get("/api/v1/fetchUsers")
      .then((result) => {
        console.log(result);
        const payload = result.data;
        dispatch(fetchUsersSuccess(payload));
      })
      .catch((error) => {
        dispatch(fetchUsersFail(error));
      });
  };
};
export const logout = () => {
  axios.get("/api/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkLoginTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (values, auth, token) => {
  console.log("values = " + JSON.stringify(values));
  //console.log('authLogin = '+authLogin);
  return (dispatch) => {
    dispatch(authStart());
    let url;
    switch (auth) {
      case (auth = "login"):
        url = "/api/login";
        break;
      case (auth = "register"):
        url = "/api/signup";
        break;
      case (auth = "forgot-password"):
        url = "/api/forgotPassword";
        break;
      case (auth = "reset-password"):
        url = "/api/resetPassword/" + token;
        console.log("url", url);
        break;
      default:
        url = "/api/login";
    }
    let method;
    auth === "reset-password" ? (method = axios.patch) : (method = axios.post);
    method(url, values)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const connect = (values) => {
  //console.log('values = '+values);
  //console.log('connect = '+connect);
  return (dispatch) => {
    dispatch(connectStart());
    let url = "/api/connect/local";
    axios
      .post(url, values)
      .then((response) => {
        //console.log('response = '+JSON.stringify(response));
        //console.log('response = '+response);
        dispatch(connectSuccess(response.data));
      })
      .catch((err) => {
        //console.log('err = '+err);
        dispatch(connectFail(err));
      });
  };
};

export const connectStart = () => {
  return {
    type: actionTypes.CONNECT_START,
  };
};

export const connectSuccess = (token, userId) => {
  return {
    type: actionTypes.CONNECT_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const connectFail = (error) => {
  return {
    type: actionTypes.CONNECT_FAIL,
    error: error,
  };
};

export const fbAuth = () => {
  return (dispatch) => {
    dispatch(fbAuthStart());
    dispatch(fbAuthSuccess());
    //dispatch(fbAuthFail(err));
  };
};

export const fbAuthStart = () => {
  return {
    type: actionTypes.FB_AUTH_START,
  };
};

export const fbAuthSuccess = () => {
  return {
    type: actionTypes.FB_AUTH_SUCCESS,
  };
};

export const fbAuthFail = (error) => {
  return {
    type: actionTypes.FB_AUTH_FAIL,
    error: error,
  };
};

export const newAddressStart = () => {
  return {
    type: actionTypes.NEW_ADDRESS_START,
  };
};

export const newAddressFail = (error) => {
  return {
    type: actionTypes.NEW_ADDRESS_FAIL,
    error: error,
  };
};

export const newAddressSuccess = (addressData) => {
  return {
    type: actionTypes.NEW_ADDRESS_SUCCESS,
    addressData: addressData,
  };
};

export const newAddress = (values) => {
  return (dispatch) => {
    dispatch(newAddressStart());
    console.log("New Address Start");
    axios
      .post("/api/addAddress", values)
      .then((response) => {
        console.log("Axios Start");
        console.log(response);
        const data = response.data;
        console.log(data);
        dispatch(newAddressSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(newAddressFail(error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

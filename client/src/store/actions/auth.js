import axios from "axios";
import * as actionTypes from "./actionTypes";

{
  /***********************************
    CHECKED FOR LOGGED IN USER
  ************************************/
}

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user,
  };
};

export const getUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error,
  };
};

//export const getUser = () => {
//    return dispatch => {
//        dispatch(getUserStart());
//        axios.get('/api/getUser')
//        .then( result => {
//            console.log(result)
//            const payload = result.data
//            dispatch(getUserSuccess(payload));
//        })
//        .catch( error => {
//                dispatch(getUserFail(error));
//        });
//    }
//}

export const getUser = () => {
  return (dispatch) => {
    dispatch(getUserStart());
    axios
      .get("/api/v2/users/getUser")
      .then((result) => {
        console.log("getUser : ", result);
        const user = result.data;
        dispatch(getUserSuccess(user));
      })
      .catch((error) => {
        console.log("getUser : ", error);
        dispatch(getUserFail(JSON.stringify(error)));
      });
  };
};

{
  /*********************

**********************/
}

// export const fetchUsersStart = () => {
//   return {
//     type: actionTypes.GET_USERS_START,
//   };
// };

// export const fetchUsersSuccess = (payload) => {
//   return {
//     type: actionTypes.GET_USERS_SUCCESS,
//     payload: payload,
//   };
// };

// export const fetchUsersFail = (error) => {
//   return {
//     type: actionTypes.GET_USERS_FAIL,
//     error: error,
//   };
// };

// export const getUsers = () => {
//   return (dispatch) => {
//     dispatch(fetchUsersStart());
//     axios
//       .get("/api/v1/fetchUsers")
//       .then((result) => {
//         console.log(result);
//         const payload = result.data;
//         dispatch(fetchUsersSuccess(payload));
//       })
//       .catch((error) => {
//         dispatch(fetchUsersFail(error));
//       });
//   };
// };

// {
//   /*********************

// **********************/
// }
export const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT_START,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    data,
  };
};

export const logoutFail = (error) => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    error: error,
  };
};
export const logout = () => {
  // console.log("logout");
  return (dispatch) => {
    dispatch(logoutStart());
    axios
      .post("/api/v2/users/logout")
      .then((response) => {
        dispatch(logoutSuccess(response.data));
      })
      .catch((error) => {
        dispatch(logoutFail(JSON.stringify(error)));
      });
  };
};

// export const checkLoginTimeout = (expirationTime) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   };
// };

export const auth = (values, auth, token) => {
  console.log("values = " + JSON.stringify(values));
  //console.log('authLogin = '+authLogin);
  return (dispatch) => {
    dispatch(authStart());
    let url;
    switch (auth) {
      case (auth = "login"):
        url = "/api/v2/users/login";
        break;
      case (auth = "register"):
        url = "/api/v2/users/signup";
        break;
      case (auth = "forgot-password"):
        url = "/api/v2/users/forgotPassword";
        break;
      case (auth = "reset-password"):
        url = "/api/v2/users/resetPassword/" + token;
        console.log("url", url);
        break;
      default:
        url = "/api/v2/users/login";
    }
    let method;
    auth === "reset-password" ? (method = axios.patch) : (method = axios.post);
    method(url, values)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(JSON.stringify(error)));
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// export const connect = (values) => {
//   //console.log('values = '+values);
//   //console.log('connect = '+connect);
//   return (dispatch) => {
//     dispatch(connectStart());
//     let url = "/api/connect/local";
//     axios
//       .post(url, values)
//       .then((response) => {
//         //console.log('response = '+JSON.stringify(response));
//         //console.log('response = '+response);
//         dispatch(connectSuccess(response.data));
//       })
//       .catch((err) => {
//         //console.log('err = '+err);
//         dispatch(connectFail(err));
//       });
//   };
// };

// export const connectStart = () => {
//   return {
//     type: actionTypes.CONNECT_START,
//   };
// };

// export const connectSuccess = (token, userId) => {
//   return {
//     type: actionTypes.CONNECT_SUCCESS,
//     idToken: token,
//     userId: userId,
//   };
// };

// export const connectFail = (error) => {
//   return {
//     type: actionTypes.CONNECT_FAIL,
//     error: error,
//   };
// };

// export const fbAuth = () => {
//   return (dispatch) => {
//     dispatch(fbAuthStart());
//     dispatch(fbAuthSuccess());
//     //dispatch(fbAuthFail(err));
//   };
// };

// export const fbAuthStart = () => {
//   return {
//     type: actionTypes.FB_AUTH_START,
//   };
// };

// export const fbAuthSuccess = () => {
//   return {
//     type: actionTypes.FB_AUTH_SUCCESS,
//   };
// };

// export const fbAuthFail = (error) => {
//   return {
//     type: actionTypes.FB_AUTH_FAIL,
//     error: error,
//   };
// };

// export const newAddressStart = () => {
//   return {
//     type: actionTypes.NEW_ADDRESS_START,
//   };
// };

// export const newAddressFail = (error) => {
//   return {
//     type: actionTypes.NEW_ADDRESS_FAIL,
//     error: error,
//   };
// };

// export const newAddressSuccess = (addressData) => {
//   return {
//     type: actionTypes.NEW_ADDRESS_SUCCESS,
//     addressData: addressData,
//   };
// };

// export const newAddress = (values) => {
//   return (dispatch) => {
//     dispatch(newAddressStart());
//     console.log("New Address Start");
//     axios
//       .post("/api/addAddress", values)
//       .then((response) => {
//         console.log("Axios Start");
//         console.log(response);
//         const data = response.data;
//         console.log(data);
//         dispatch(newAddressSuccess(data));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(newAddressFail(error));
//       });
//   };
// };

// export const setAuthRedirectPath = (path) => {
//   return {
//     type: actionTypes.SET_AUTH_REDIRECT_PATH,
//     path: path,
//   };
// };

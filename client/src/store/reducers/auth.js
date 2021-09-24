import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    userLoading: false,
    payload: null,
    users: null,
    authRedirectPath: '/',
    submitted: false,
    addressData: null,
};

const authStart = ( state, action ) => {
    return updateObject( state, { 
        error: null, 
        loading: true, 
        submitted: false,
        authRedirectPath: '/'
    });
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        submitted: true,
        authRedirectPath: "/profile"
     });
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        submitted: true
    });
};

const connectStart = ( state, action ) => {
    return updateObject( state, { 
        error: null, 
        loading: true, 
        authRedirectPath: '/'
    });
};

const connectSuccess = (state, action) => {
    console.log(action.idToken)
    if (action.idToken === 'OK'){
        return updateObject( state, { 
            token: action.idToken,
            error: null,
            loading: false,
            authRedirectPath: '/profile'
         });
    } else {
        return updateObject( state, { 
            token: action.idToken,
            error: null,
            loading: false,
            authRedirectPath:"/"
     });
    }
};

const connectFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        message: action.error.message,
        loading: false,
    });
};


const fbAuthStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fbAuthSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        loading: false,
        submitted: true
    });
};

const fbAuthFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const fetchUserStart = (state, action) => {
    return updateObject(state, {
        error: null,
        userLoading: true
    })
}

const fetchUserSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        payload: action.payload,
        error: null,
        loading: false,
        userLoading: false
    })
}
const fetchUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        userLoading: false
    });
}






const fetchUsersStart = (state, action) => {
    return updateObject(state, {
        error: null,
        userLoading: true
    })
}

const fetchUsersSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        users: action.payload,
        error: null,
        loading: false,
        userLoading: false
    })
}
const fetchUsersFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        userLoading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const newAddressStart = (state, action) => {
    return updateObject( state, {        
        error: null, 
        loading: true,
        addressData: null })}

const newAddressFail = (state, action) => {
    return updateObject( state, { 
        loading: false, 
        error: action.error,
    })}
  
const newAddressSuccess = (state, action) => {
    //const newAddress = updateObject(action.addressData, { id: action.addressId })
    return updateObject(state, {
        loading: false,
        addressData: action.addressData 
    })}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_START       : return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS     : return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL        : return fetchUserFail(state, action);
        case actionTypes.FETCH_USERS_START      : return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS    : return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL       : return fetchUsersFail(state, action);
        case actionTypes.FB_AUTH_START          : return fbAuthStart(state, action);
        case actionTypes.FB_AUTH_SUCCESS        : return fbAuthSuccess(state, action);
        case actionTypes.FB_AUTH_FAIL           : return fbAuthFail(state, action);
        case actionTypes.AUTH_START             : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS           : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL              : return authFail(state, action);
        case actionTypes.AUTH_LOGOUT            : return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
        case actionTypes.CONNECT_START          : return connectStart(state, action);
        case actionTypes.CONNECT_SUCCESS        : return connectSuccess(state, action);
        case actionTypes.CONNECT_FAIL           : return connectFail(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
        case actionTypes.NEW_ADDRESS_START      : return newAddressStart(state, action);
        case actionTypes.NEW_ADDRESS_SUCCESS    : return newAddressSuccess(state, action);     
        case actionTypes.NEW_ADDRESS_FAIL       : return newAddressFail(state, action);     
        default:
            return state;
    }
};

export default reducer;
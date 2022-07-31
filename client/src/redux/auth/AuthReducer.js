import {
  GET_USER,
  IS_ERR,
  IS_LOADING,
  LOGOUT,
  SET_USER,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "./actionTypes";

const initState = {
  loading: false,
  err: false,
  authStatus: false,
  token: "",
  res_msg: "",
  res_type: "",
  currentUser: {},
};

export const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        err: false,
        res_msg: action.payload.message,
        res_type: action.payload.type,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        authStatus: false,
        err: false,
        loading: false,
        token: "",
        res_msg: "",
        res_type: "",
      };
    }
    case GET_USER: {
      console.log("REducer", action);
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        err: false,
        res_msg: action.payload.message,
        res_type: action.payload.type,
        authStatus: true,
        token: action.payload.token,
      };
    }
    case SET_USER: {
      return {
        ...state,
        authStatus: true,
        token: action.payload,
      };
    }
    case IS_ERR: {
      return {
        ...state,
        loading: false,
        err: true,
        res_msg: action.payload.message,
        res_type: action.payload.type,
      };
    }
    default: {
      return state;
    }
  }
};

import axios from "axios";
import {
  GET_USER,
  IS_ERR,
  IS_LOADING,
  LOGOUT,
  SET_USER,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "./actionTypes";

export const isLoading = () => (dispatch) => {
  dispatch({
    type: IS_LOADING,
  });
};

export const signup = (payload) => (dispatch) => {
  dispatch(isLoading());
  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/signup`, payload)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: IS_ERR,
        payload: e.data,
      });
    });
};

export const checkUser = () => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("token")) || "";
  if (token !== "") {
    dispatch({
      type: SET_USER,
      payload: token,
    });
  }
};

export const login = (payload) => (dispatch) => {
  dispatch(isLoading());
  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, payload)
    .then((res) => {
      console.log(res);
      if (res.data.type === "success") {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: IS_ERR,
        payload: e.data,
      });
    });
};
export const getUser = () => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("token")) || "";
  axios
    .get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data.data[0]);
      dispatch({
        type: GET_USER,
        payload: res.data.data[0],
      });
    })
    .catch((e) => {
      dispatch({
        type: IS_ERR,
        payload: e.data,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};

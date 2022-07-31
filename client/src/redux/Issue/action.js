import axios from "axios";
import {
  DEFAULT_MSG,
  ISSUES_LOADED,
  ISSUE_CREATE_SUCCESS,
  IS_ERR,
  IS_LOADING,
  POST_COMMENT,
} from "./actionTypes";

export const isLoading = () => (dispatch) => {
  dispatch({
    type: IS_LOADING,
  });
};

export const getIssues = () => (dispatch) => {
  dispatch(isLoading());
  let token = JSON.parse(localStorage.getItem("token")) || "";
  axios
    .get(`${process.env.REACT_APP_API_URL}/issues/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: ISSUES_LOADED,
        payload: res.data.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: IS_ERR,
      });
    });
};

export const createIssue = (payload) => (dispatch) => {
  dispatch(isLoading());
  let token = JSON.parse(localStorage.getItem("token")) || "";
  axios
    .post(`${process.env.REACT_APP_API_URL}/issues/create`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: ISSUE_CREATE_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        dispatch({
          type: DEFAULT_MSG,
        });
      }, 1500);
    })
    .catch((e) => {
      dispatch({
        type: IS_ERR,
      });
    });
};

export const postComment = (payload) => (dispatch) => {
  dispatch(isLoading());
  let token = JSON.parse(localStorage.getItem("token")) || "";
  axios
    .patch(
      `${process.env.REACT_APP_API_URL}/issues/comment/${payload.id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
      setTimeout(() => {
        dispatch({
          type: DEFAULT_MSG,
        });
        dispatch(getIssues());
      }, 1500);
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: IS_ERR,
      });
    });
};

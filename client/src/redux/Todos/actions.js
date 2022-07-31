import axios from "axios";

//Actions Types
export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_ERROR = "GET_TODOS_ERROR";

//Actions
const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});

const getTodosSuccess = (data) => ({
  type: GET_TODOS_SUCCESS,
  payload: data,
});

const getTodosError = (error) => ({
  type: GET_TODOS_REQUEST,
  payload: error,
});

//Fetching APIs
export const getTodosData = () => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const api = process.env.REACT_APP_API_URL;
  dispatch(getTodosRequest());
  axios({
    method: "GET",
    url: `${api}/todo/all-todos`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getTodosSuccess(res.data)))
    .catch((err) => dispatch(getTodosError(err)));
};

import {
  DEFAULT_MSG,
  ISSUES_LOADED,
  ISSUE_CREATE_SUCCESS,
  IS_ERR,
  IS_LOADING,
  POST_COMMENT,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isErr: false,
  data: [],
  res_msg: "",
  res_type: "",
};

export const IssueReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case DEFAULT_MSG: {
      return {
        ...state,
        res_msg: "",
        res_type: "",
      };
    }
    case POST_COMMENT: {
      return {
        ...state,
        isLoading: false,
        isErr: false,
        res_msg: action.payload.message,
        res_type: action.payload.type,
      };
    }
    case ISSUE_CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isErr: false,
        res_msg: action.payload.message,
        res_type: action.payload.type,
      };
    }
    case ISSUES_LOADED: {
      return {
        ...state,
        isLoading: false,
        isErr: false,
        data: action.payload,
      };
    }
    case IS_ERR: {
      return {
        ...state,
        isLoading: false,
        isErr: true,
      };
    }
    default: {
      return state;
    }
  }
};

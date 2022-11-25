import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LEAVE_LIST_SUCCESS,
  LEAVE_LIST_REQUEST,
  LEAVE_LIST_FAIL,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_ORIGINAL,
  CREATE_LEAVE_FAIL,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
} from "../constants/userConstant";

export const categoryReducer = (
  state = { category: { isCreated: false } },
  action = {}
) => {
  console.log(action.type, action.payload, "killermiller");
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: false,
      };

    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        error: null,
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

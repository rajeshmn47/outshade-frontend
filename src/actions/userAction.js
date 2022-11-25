import axios from "axios";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
} from "../constants/userConstant";

const headers = {
  Accept: "application/json",
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
};
export const register = (myform) => async (dispatch) => {
  try {
    console.log(myform);

    const { data } = await axios({
      method: "POST",
      url: "https://vouch-digital-backend.herokuapp.com/auth/register",
      data: myform,
      headers: headers,
    });
    console.log(data);
    localStorage.setItem("access_token", data.server_token);
    if (data.user) {
      console.log("true rajesh");
      dispatch({ type: REGISTER_USER_SUCCESS, payload: "data" });
    }
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (myform) => async (dispatch) => {
  try {
    console.log(myform, "rajesh");
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios({
      method: "POST",
      url: "https://vouch-digital-backend.herokuapp.com/auth/login",
      data: myform,
      headers: headers,
    });
    console.log(data);
    localStorage.setItem("access_token", data.server_token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    console.log("rajivya");
    const access_token =
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token");
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios({
      method: "get",
      url: "https://vouch-digital-backend.herokuapp.com/auth/loaduser",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        servertoken: access_token,
      },
    });
    console.log(data);
    if (data.message[0]) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.message[0] });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  const access_token =
    localStorage.getItem("access_token") &&
    localStorage.getItem("access_token");
  localStorage.removeItem("access_token");
  await dispatch(loadUser());
  dispatch({ type: LOGOUT_SUCCESS });
};

export const setShowBlogSearch = (payload) => ({
  type: LOAD_USER_SUCCESS,
  payload,
});

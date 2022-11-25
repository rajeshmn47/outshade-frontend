import { React, useEffect } from "react";
import { useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import "dayjs/locale/fr";
import "dayjs/locale/de";
import axios from "axios";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import qs from "query-string";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./actions/userAction";

const locales = ["ko", "fr", "de"];

function ResetPassword() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const token = qs.parse(window.location.search).token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {}, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = {
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };
    const data = await axios.post("https://vouch-digital-backend.herokuapp.com/auth/resetpassword", {
      myForm,
    });
    setMessage("password reset successfully")
  };
  const Dox = styled.div``;

  const Box1 = styled.div`
    width: 500px;
    height: 300px;
    margin: 60px auto;
    padding: 20px;
    background: #f2f2f2;
    border-radius: 10px;
    text-align: center;
  `;

  return (
    <>
      <div className="formcontainer">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                <TextField
                  placeholder="new password"
                  sx={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  placeholder="confirm password"
                  sx={{ width: "100%" }}
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "blue",
                    color: "#ffffff",
                    padding: "10px 0px",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <h3>{message&&message}</h3>
          </form>
          <h3>
            if u dont have account create{" "}
            <button
              className="route"
              onClick={() => navigate("/createaccount")}
            >
              here
            </button>
          </h3>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;

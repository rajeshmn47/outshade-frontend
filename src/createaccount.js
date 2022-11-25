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

import { TextField, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, register } from "./actions/userAction";
import { useNavigate } from "react-router-dom";

const locales = ["ko", "fr", "de"];

function CreateAccount() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      navigate("/imagelist");
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const data = await axios.post('https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/signup',{
    //email:email,password:password,data:{
    // name:name
    // }
    //},
    //{headers: {
    //'Content-Type': 'application/json',
    //'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg',
    //}},
    //)

    const data = {
      email: email,
      password: password,
      username: name,
    };
    dispatch(register(data));
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
                  placeholder="name"
                  autoComplete="false"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  placeholder="email"
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  placeholder="password"
                  sx={{ width: "100%" }}
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
          <h3>
            If u have account login{" "}
            <button className="route" onClick={() => navigate("/")}>
              here
            </button>
          </h3>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;

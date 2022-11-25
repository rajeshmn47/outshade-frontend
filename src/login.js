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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./actions/userAction";

const locales = ["ko", "fr", "de"];

function Login() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user?.email) {
      navigate("/productlist");
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = { email: email, password: password };
    dispatch(login(myForm));
    navigate("/");
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
                  Logn
                </Button>
              </Grid>
            </Grid>
          </form>
          <h3 style={{margin:'0'}}>
            if u dont have account create{" "}
            <button
              className="route"
              onClick={() => navigate("/createaccount")}
            >
              here
            </button>
          </h3>
          <h3 style={{color:'red',marginTop:'-55px'}}>
            if u forget password click{" "}
            <button
              className="route"
              onClick={() => navigate("/requestpassword")}
            >
              here
            </button>
          </h3>
        </div>
      </div>
    </>
  );
}

export default Login;

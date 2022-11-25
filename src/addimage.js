import { React, useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import "dayjs/locale/fr";
import "dayjs/locale/de";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { TextField, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { createleave } from "./actions/leaveActions";
import { createimage } from "./actions/leaveActions";
import axios from "axios";

const locales = ["ko", "fr", "de"];

function AddImage() {
  const { loading, isCreated } = useSelector((state) => state.leave);
  const isMountRef = useRef(false);
  console.log(isCreated, "iscreated");
  const dispatch = useDispatch();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (isCreated) {
      setNotification({ open: true, message: "image added successfully" });
      setTimeout(() => {
        setNotification({ open: false, message: "" });
      }, 1000);
    }
  }, [dispatch, isCreated]);

  const handleToChange = (newValue) => {
    setToValue(newValue);
  };

  const handleFromChange = (newValue) => {
    setFromValue(newValue);
  };

  const handlechange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myform = { start_date: fromvalue, end_date: tovalue, name: name };
    setName("");
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      myform.image = fileName;
      console.log(myform);
      try {
        await axios.post(
          "https://vouch-digital-backend.herokuapp.com/client/upload",
          data
        );
      } catch (err) {}
      setFile(null);
    }
    dispatch(createimage(myform));
    setFile(null);
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
      <h3 style={{ textAlign: "center" }}>Add image here</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <h3
                style={{
                  margin: "5px 0",
                  marginRight: "370px",
                  fontSize: "14px",
                }}
              >
                upload image here
              </h3>
              <input
                placeholder="image"
                type="file"
                lable="image"
                className="imageinput"
                sx={{ width: "100%" }}
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                placeholder="name"
                sx={{ width: "100%" }}
                value={name}
                onChange={handlechange}
              />
            </Grid>
            <Grid item lg={12}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "blue",
                  color: "#ffffff",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Grid>

            <Grid item lg={12}>
              {notification.open && (
                <h3 className="createnotification">{notification.message}</h3>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default AddImage;

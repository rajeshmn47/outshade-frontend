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

import { TextField, Button, Grid, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { createleave } from "./actions/leaveActions";
import { createimage } from "./actions/leaveActions";
import { getcategories } from "./actions/leaveActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl } from "@mui/material";
import axios from "axios";

const locales = ["ko", "fr", "de"];

function AddProduct() {
  const { loading, isCreated } = useSelector((state) => state.leave);
  const { categories } = useSelector((state) => state.category);
  const isMountRef = useRef(false);
  console.log(isCreated, "iscreated");
  const dispatch = useDispatch();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });
  useEffect(() => {
    dispatch(getcategories());
  }, []);
  useEffect(() => {
    if (isCreated) {
      setNotification({ open: true, message: "product added successfully" });
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
    const myform = { name: name, price: price, category: category };
    console.log(myform);
    const data = new FormData();
    dispatch(createleave(myform));
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
      <h3 style={{ textAlign: "center" }}>Add product here</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <TextField
                placeholder="name"
                sx={{ width: "100%" }}
                value={name}
                onChange={handlechange}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                placeholder="price"
                sx={{ width: "100%" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item lg={12}>
              <Select
                native
                labelId="demo-simple-select-label-minutes"
                id="demo-simple-select-minutes"
                input={<OutlinedInput label="Minutes" />}
                placeholder="category"
                sx={{ width: "100%" }}
                value={category}
                label="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" aria-label="Mute volume" />
                {categories?.map((c) => (
                  <option value={c.name}>{c.name}</option>
                ))}
              </Select>
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

export default AddProduct;

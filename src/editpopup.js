import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useScrollTrigger } from "@mui/material";
import { React, useEffect } from "react";
import "./App.css";
import styled from "@emotion/styled";
import axios from "axios";
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
import { editleave, editproduct, getleaves } from "./actions/leaveActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getElRoot } from "fullcalendar";
import { getcategories } from "./actions/leaveActions";
// or

export const Popup = ({
  editpopupOpen,
  setEditpopupOpen,
  editItem,
  setNotification,
}) => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (editItem) {
      setName(editItem?.name);
      setPrice(editItem?.price);
      setCategory(editItem?.categoryId);
    }
  }, [editItem]);
  useEffect(() => {
    dispatch(getcategories());
  }, []);
  const handlechange = (e) => {
    setName(e.target.value);
  };
  const handleClose = () => {
    setEditpopupOpen(!editpopupOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myform = {
      id: editItem._id,
      name: name,
      price: price,
      category: category,
    };
    console.log(myform, "edititem");
    dispatch(editproduct(myform));
    dispatch(getleaves());
    setNotification({ open: true, message: "edited successfully" });
    setEditpopupOpen(false);
  };
  return (
    <>
      <div className="popup">
        <Dialog onClose={handleClose} open={editpopupOpen}>
          <div className="popp">
            <div className="popup_left">
              <div></div>
            </div>
            <div className="popup_right">
              <h2>edit image</h2>
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
                      placeholder="name"
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
                </Grid>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Popup;

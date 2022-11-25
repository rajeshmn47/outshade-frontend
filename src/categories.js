import { React, useEffect } from "react";
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
import { createleave, getcategories } from "./actions/leaveActions";
import { getleaves } from "./actions/leaveActions";
import EditOutlineIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import EditPopup from "./editcategory";
import DeletePopup from "./deletecategory";

const locales = ["ko", "fr", "de"];

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, categories, isCreated } = useSelector(
    (state) => state.category
  );
  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  console.log(categories, "leave");
  const today = new Date();
  const todayDate = today.getFullYear() - today.getMonth() - today.getDate();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [reason, setReason] = useState("");
  const [editpopupOpen, setEditpopupOpen] = useState(false);
  const [editItem, setEditItem] = useState();
  const [deletepopupOpen, setDeletepopupOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });
  useEffect(() => {
    dispatch(getcategories());
  }, [dispatch, isCreated]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      navigate("/");
    }
  }, [dispatch, isAuthenticated]);
  useEffect(() => {
    if (notification.open) {
      setTimeout(() => {
        setNotification({ open: false, message: "" });
      }, 2000);
    }
  }, [dispatch, notification]);

  const handleToChange = (newValue) => {
    setToValue(newValue);
  };

  const handleFromChange = (newValue) => {
    setFromValue(newValue);
  };

  const handlechange = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myform = { start_date: fromvalue, end_date: tovalue, reason: reason };
    setReason("");
    dispatch(createleave(myform));
  };
  const handleEditItem = (id) => {
    console.log(id);
    setEditItem(categories.find((f) => f._id === id));
    setEditpopupOpen(true);
  };

  const handleDelete = (id) => {
    console.log(id, "userid");
    setDeleteItem(categories.find((f) => f._id === id));
    setDeletepopupOpen(true);
    console.log(id, "userhghgffid");
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
      <div className="tablecontainer">
        <h3>Category list</h3>
        <table>
          <thead>
            <tr>
              <th>category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((l) => (
              <>
                <tr>
                  <td>{l.name}</td>

                  <td>
                    <EditOutlineIcon
                      style={{ cursor: "pointer", color: "lightgrey" }}
                      onClick={() => handleEditItem(l._id)}
                    />
                    <DeleteOutlineIcon
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(l._id)}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {notification.open && (
        <h3 className="notification">{notification.message}</h3>
      )}

      <EditPopup
        editpopupOpen={editpopupOpen}
        setEditpopupOpen={setEditpopupOpen}
        editItem={editItem}
        setNotification={setNotification}
      />
      <DeletePopup
        deletepopupOpen={deletepopupOpen}
        setDeletepopupOpen={setDeletepopupOpen}
        deleteItem={deleteItem}
        setNotification={setNotification}
      />
    </>
  );
}

export default Categories;

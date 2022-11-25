import { useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./actions/userAction";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(isAuthenticated, "isa");
  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      router("/");
    }
  }, [dispatch, isAuthenticated]);
  const handlelogout = () => {
    dispatch(logout());
  };
  console.log(location.pathname, "path");
  return (
    <div className="sidebar">
      <div>
        <li className="title">My Inventory</li>
        <button
          className={
            location.pathname === "/productlist" ? "selected" : "navitem"
          }
          onClick={() => router("/productlist")}
        >
          Product list
        </button>
        <button
          className={
            location.pathname === "/addproduct" ? "selected" : "navitem"
          }
          onClick={() => router("/addproduct")}
        >
          create product
        </button>
        <button
          className={
            location.pathname === "/categories" ? "selected" : "navitem"
          }
          onClick={() => router("/categories")}
        >
          category list
        </button>
        <button
          className={
            location.pathname === "/addcategory" ? "selected" : "navitem"
          }
          onClick={() => router("/addcategory")}
        >
          create category
        </button>
      </div>
      <div className="auth" onClick={handlelogout}>
        <h3 className="authname">{user?.email && user.email}</h3>
        <LogoutIcon style={{ marginLeft: "5px" }} />
      </div>
    </div>
  );
}

export default SideBar;

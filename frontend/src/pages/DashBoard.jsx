import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const DashBoard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashBoard;

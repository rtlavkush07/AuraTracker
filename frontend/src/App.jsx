import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <>
      <NavBar/>
      {/* Nested routes will render here */}
      {/* <h1>app</h1> */}
      <Outlet />
    </>
  );
}

export default App;

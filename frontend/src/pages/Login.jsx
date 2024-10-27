import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(loginWithGoogle(response.credential));
    },
    onError: () => {
      console.log("Login failed");
    },
  });

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => handleGoogleLogin()}>
        {isLoading ? "Logging in..." : "Login with Google"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

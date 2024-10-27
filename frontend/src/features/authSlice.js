import { createSlice } from '@reduxjs/toolkit';
// create initial states 
const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
          state.error = null;
        //   console.log("redux working")
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;
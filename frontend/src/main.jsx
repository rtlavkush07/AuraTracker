// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import { Provider } from "react-redux";
import store from './store/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  // some rules for react-router-dom v6
  <React.StrictMode>
    <BrowserRouter> {/* Only one Router here */} 
    {/* // router for client side routing */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

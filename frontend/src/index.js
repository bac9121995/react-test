import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
const axios = require("axios");

const container = document.getElementById("root");
const root = createRoot(container);
if (localStorage.getItem("accessToken")) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3100";

root.render(
  <BrowserRouter>
    <ArgonControllerProvider>
      <PerfectScrollbar>
        <App />
      </PerfectScrollbar>
    </ArgonControllerProvider>
  </BrowserRouter>
);

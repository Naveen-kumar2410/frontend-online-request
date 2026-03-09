import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // optional global styles
import { clearStoredAuth } from "./lib/authStorage";

// Enforce strict login-first behavior on each fresh page load.
clearStoredAuth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    
  </BrowserRouter>
);

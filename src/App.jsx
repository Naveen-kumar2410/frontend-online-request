import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";
import Home from "./Home";
import Dashboard from "./Dashboard";

import NewRequest from "./NewRequest";
import MyApproval from "./MyApproval";
import Reports from "./Reports";
import Admin from "./Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Sidenavbar />}>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="approvals" element={<MyApproval />} />
        <Route path="new-request" element={<NewRequest />} />
        <Route path="reports" element={<Reports />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
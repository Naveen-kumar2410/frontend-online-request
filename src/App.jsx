import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";
import Dashboard from "./Dashboard";
import NewRequest from "./NewRequest";
import MyApproval from "./MyApproval";
import Reports from "./Reports";
import Admin from "./Admin";
import SignIn from "./SignIn";
import Overview from "./Overview";
import { PublicOnly, RequireAdmin, RequireAuth, RequireUser } from "./RouteGuards";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnly />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/*" element={<Sidenavbar />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="home" element={<Navigate to="/overview" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route element={<RequireUser />}>
            <Route path="approvals" element={<MyApproval />} />
            <Route path="new-request" element={<NewRequest />} />
          </Route>
          <Route element={<RequireAdmin />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

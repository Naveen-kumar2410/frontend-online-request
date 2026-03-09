import { Navigate, Outlet } from "react-router-dom";
import { getStoredAuth, isAuthenticated } from "./lib/authStorage";

export function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

export function RequireAdmin() {
  const auth = getStoredAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  if (auth?.role !== "ADMIN") {
    return <Navigate to="/overview" replace />;
  }
  return <Outlet />;
}

export function PublicOnly() {
  if (isAuthenticated()) {
    return <Navigate to="/overview" replace />;
  }
  return <Outlet />;
}

export function RequireUser() {
  const auth = getStoredAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  if (auth?.role !== "USER") {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}

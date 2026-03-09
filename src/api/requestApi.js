import { apiRequest } from "./client";

export function createUser(payload) {
  return apiRequest("/users", {
    method: "POST",
    body: payload,
    isPublic: true,
  });
}

export function getUserRequests(auth) {
  return apiRequest("/user/requests", { auth });
}

export function createRequest(payload, auth) {
  return apiRequest("/user/requests", {
    method: "POST",
    body: payload,
    auth,
  });
}

export function getAdminRequests(auth) {
  return apiRequest("/admin/requests", { auth });
}

export function decideRequest(requestId, payload, auth) {
  return apiRequest(`/admin/requests/${requestId}/decision`, {
    method: "POST",
    body: payload,
    auth,
  });
}


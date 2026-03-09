const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function toBasicToken(email, password) {
  return btoa(`${email}:${password}`);
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    auth,
    isPublic = false,
  } = options;

  const headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (!isPublic) {
    if (!auth?.email || !auth?.password) {
      throw new Error("Backend credentials are missing. Open Connect Backend page.");
    }
    headers.Authorization = `Basic ${toBasicToken(auth.email, auth.password)}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "omit",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // no-op
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

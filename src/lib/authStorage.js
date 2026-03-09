const AUTH_KEY = "request-app-auth";

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  const auth = getStoredAuth();
  return Boolean(auth?.email && auth?.password && auth?.role);
}

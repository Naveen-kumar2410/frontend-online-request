import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setStoredAuth } from "./lib/authStorage";
import { createUser, getAdminRequests, getUserRequests } from "./api/requestApi";

const CARD_STYLE = {
  p: 3,
  bgcolor: "rgba(26,37,64,0.6)",
  border: "1px solid rgba(201,168,76,0.20)",
  borderRadius: 2,
  backdropFilter: "blur(14px)",
};

export default function ConnectBackend() {
  const navigate = useNavigate();
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateAuthField = (key, value) =>
    setAuthForm((prev) => ({ ...prev, [key]: value }));

  const updateRegisterField = (key, value) =>
    setRegisterForm((prev) => ({ ...prev, [key]: value }));

  const handleSaveAndTest = async () => {
    setError("");
    setMessage("");
    setSaving(true);
    try {
      setStoredAuth(authForm);
      if (authForm.role === "ADMIN") {
        await getAdminRequests(authForm);
      } else {
        await getUserRequests(authForm);
      }
      setMessage("Connected successfully. Credentials saved in browser storage.");
      navigate(authForm.role === "ADMIN" ? "/admin" : "/approvals");
    } catch (err) {
      setError(err.message || "Connection failed");
    } finally {
      setSaving(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    setMessage("");
    setSaving(true);
    try {
      await createUser(registerForm);
      setMessage("User created in backend. Now connect using the same credentials.");
      setAuthForm({
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
      });
    } catch (err) {
      setError(err.message || "User creation failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "20px",
          fontWeight: 800,
          color: "#F4F6FB",
          mb: 1,
        }}
      >
        Connect Backend
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#8B9AB5", mb: 3 }}>
        Spring Boot base URL: <code>http://localhost:8080</code> (set Vite proxy or VITE_API_BASE_URL).
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Paper elevation={0} sx={{ ...CARD_STYLE, flex: 1 }}>
          <Typography sx={{ color: "#F4F6FB", fontWeight: 700, mb: 2 }}>
            Login Credentials (Basic Auth)
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Email"
              value={authForm.email}
              onChange={(e) => updateAuthField("email", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              value={authForm.password}
              onChange={(e) => updateAuthField("password", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              select
              label="Role"
              value={authForm.role}
              onChange={(e) => updateAuthField("role", e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
            <Button
              variant="contained"
              disabled={saving}
              onClick={handleSaveAndTest}
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 700,
              }}
            >
              Save & Test
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ ...CARD_STYLE, flex: 1 }}>
          <Typography sx={{ color: "#F4F6FB", fontWeight: 700, mb: 2 }}>
            Create User in Backend
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={registerForm.name}
              onChange={(e) => updateRegisterField("name", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              value={registerForm.email}
              onChange={(e) => updateRegisterField("email", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              value={registerForm.password}
              onChange={(e) => updateRegisterField("password", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              select
              label="Role"
              value={registerForm.role}
              onChange={(e) => updateRegisterField("role", e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              disabled={saving}
              onClick={handleRegister}
              sx={{ borderColor: "rgba(201,168,76,0.35)", color: "#E4C97A" }}
            >
              Create User
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}


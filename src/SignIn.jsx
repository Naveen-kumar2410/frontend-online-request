import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUser, getAdminRequests, getUserRequests } from "./api/requestApi";
import { setStoredAuth } from "./lib/authStorage";

const ROLES = ["USER", "ADMIN"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(10,15,30,0.75)",
    color: "#F4F6FB",
    "& fieldset": { borderColor: "rgba(201,168,76,0.35)" },
    "&:hover fieldset": { borderColor: "#E4C97A" },
    "&.Mui-focused fieldset": { borderColor: "#C9A84C" },
  },
  "& .MuiInputLabel-root": {
    color: "#C6CEE2",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#E4C97A",
  },
};

function validateLogin(form) {
  if (!EMAIL_REGEX.test(form.email)) {
    return "Enter a valid username/email.";
  }
  if (!STRONG_PASSWORD_REGEX.test(form.password)) {
    return "Password must be at least 8 characters with upper, lower and number.";
  }
  if (!ROLES.includes(form.role)) {
    return "Select a valid role.";
  }
  return "";
}

function validateSignup(form) {
  if (!form.name || form.name.trim().length < 3) {
    return "Name must be at least 3 characters.";
  }
  if (!EMAIL_REGEX.test(form.email)) {
    return "Enter a valid username/email.";
  }
  if (!STRONG_PASSWORD_REGEX.test(form.password)) {
    return "Password must be at least 8 characters with upper, lower and number.";
  }
  if (!ROLES.includes(form.role)) {
    return "Select a valid role.";
  }
  return "";
}

export default function SignIn() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setSignupField = (key, value) => setSignupForm((prev) => ({ ...prev, [key]: value }));

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    const validationError = validateLogin(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (form.role === "ADMIN") {
        await getAdminRequests(form);
      } else {
        await getUserRequests(form);
      }
      setStoredAuth({
        ...form,
        name: form.email.split("@")[0],
      });
      navigate("/overview");
    } catch (err) {
      const message = err?.message || "";
      if (message.includes("(401)")) {
        setError("Invalid username/password for selected role.");
      } else if (message.includes("(403)")) {
        setError("Role is not authorized for selected account.");
      } else {
        setError(message || "Backend is not reachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    setSuccess("");

    const validationError = validateSignup(signupForm);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await createUser(signupForm);
      setSuccess("Account created successfully. Sign in now.");
      setForm({
        email: signupForm.email,
        password: signupForm.password,
        role: signupForm.role,
      });
      setTab(0);
    } catch (err) {
      setError(err?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background:
          "radial-gradient(ellipse 65% 50% at 12% 15%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse 65% 50% at 88% 88%, rgba(45,212,191,0.07) 0%, transparent 60%), #0A0F1E",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 980,
          borderRadius: 3,
          border: "1px solid rgba(201,168,76,0.20)",
          bgcolor: "rgba(26,37,64,0.58)",
          overflow: "hidden",
          backdropFilter: "blur(14px)",
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" } }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: "#C9A84C", fontSize: 11, letterSpacing: ".14em", fontWeight: 700 }}>
              ONLINE APPROVAL HIERARCHY SYSTEM
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                color: "#F4F6FB",
                fontSize: { xs: 28, md: 40 },
                lineHeight: 1.05,
                mt: 1.5,
                fontWeight: 800,
              }}
            >
              Sign in to start
              <br />
              your approval workflow
            </Typography>
            <Typography sx={{ color: "#8B9AB5", fontSize: 13, mt: 2 }}>
              Strict role-based authentication with backend validation.
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 }, borderLeft: { md: "1px solid rgba(201,168,76,0.14)" } }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                mb: 2,
                "& .MuiTab-root": { color: "#8B9AB5", textTransform: "none", fontWeight: 700 },
                "& .Mui-selected": { color: "#E4C97A !important" },
                "& .MuiTabs-indicator": { backgroundColor: "#C9A84C" },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Create Account" />
            </Tabs>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {tab === 0 && (
              <Stack spacing={2}>
                <TextField
                  label="Username (Email)"
                  size="small"
                  fullWidth
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value.trim())}
                  sx={textFieldSx}
                />
                <TextField
                  label="Password"
                  type="password"
                  size="small"
                  fullWidth
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  sx={textFieldSx}
                />
                <TextField
                  select
                  label="Role"
                  size="small"
                  fullWidth
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                  sx={textFieldSx}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleLogin}
                  sx={{
                    mt: 1,
                    background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                    color: "#0A0F1E",
                    fontWeight: 700,
                    py: 1,
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Stack>
            )}

            {tab === 1 && (
              <Stack spacing={2}>
                <TextField
                  label="Full Name"
                  size="small"
                  fullWidth
                  value={signupForm.name}
                  onChange={(e) => setSignupField("name", e.target.value)}
                  sx={textFieldSx}
                />
                <TextField
                  label="Username (Email)"
                  size="small"
                  fullWidth
                  value={signupForm.email}
                  onChange={(e) => setSignupField("email", e.target.value.trim())}
                  sx={textFieldSx}
                />
                <TextField
                  label="Password"
                  type="password"
                  size="small"
                  fullWidth
                  value={signupForm.password}
                  onChange={(e) => setSignupField("password", e.target.value)}
                  sx={textFieldSx}
                />
                <TextField
                  select
                  label="Role"
                  size="small"
                  fullWidth
                  value={signupForm.role}
                  onChange={(e) => setSignupField("role", e.target.value)}
                  sx={textFieldSx}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleCreateAccount}
                  sx={{
                    mt: 1,
                    background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                    color: "#0A0F1E",
                    fontWeight: 700,
                    py: 1,
                  }}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <Typography sx={{ color: "#8B9AB5", fontSize: 12 }}>
                  Password rule: 8+ chars, uppercase, lowercase, number.
                </Typography>
              </Stack>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

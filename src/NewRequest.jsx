import { useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createRequest } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

const TYPES = ["Procurement", "Leave", "Travel", "IT Asset", "Finance", "HR", "Facility", "Other"];
const URGENCIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function NewRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Procurement",
    urgency: "NORMAL",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const auth = getStoredAuth();
      await createRequest(form, auth);
      setSuccess("Request submitted successfully.");
      setTimeout(() => navigate("/approvals"), 800);
    } catch (err) {
      setError(err.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F4F6FB", mb: 0.5 }}
      >
        New Request
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#8B9AB5", mb: 2.5 }}>
        Connected to backend endpoint: <code>/user/requests</code>
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "rgba(26,37,64,0.6)",
          border: "1px solid rgba(201,168,76,0.20)",
          borderRadius: 2,
          backdropFilter: "blur(14px)",
          maxWidth: 780,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              select
              label="Type"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              fullWidth
              size="small"
            >
              {TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Urgency"
              value={form.urgency}
              onChange={(e) => handleChange("urgency", e.target.value)}
              fullWidth
              size="small"
            >
              {URGENCIES.map((urgency) => (
                <MenuItem key={urgency} value={urgency}>
                  {urgency}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 700,
              }}
            >
              Submit Request
            </Button>
            <Button variant="outlined" onClick={() => navigate("/connect")} sx={{ color: "#E4C97A" }}>
              Open Backend Setup
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}


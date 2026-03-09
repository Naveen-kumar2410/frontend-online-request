import { useEffect, useMemo, useState } from "react";
import { Box, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAdminRequests, getUserRequests } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

const features = [
  {
    title: "Unified Request Workspace",
    desc: "Create, review, and track requests in one clean workspace with role-based visibility.",
  },
  {
    title: "Smart Approval Flow",
    desc: "Approvals move through clear stages so teams always know the current decision point.",
  },
  {
    title: "Professional Audit Trail",
    desc: "Every request decision and comment is recorded to keep operations transparent and compliant.",
  },
  {
    title: "Live Operational Insights",
    desc: "Dashboards and reports transform request data into actionable team performance insights.",
  },
];

function toDisplayName(auth) {
  const raw = auth?.name || auth?.email?.split("@")[0] || "User";
  return raw
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Overview() {
  const navigate = useNavigate();
  const auth = useMemo(() => getStoredAuth(), []);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const rows =
          auth?.role === "ADMIN" ? await getAdminRequests(auth) : await getUserRequests(auth);
        setStats({
          total: rows.length,
          pending: rows.filter((x) => x.status === "PENDING").length,
          approved: rows.filter((x) => x.status === "APPROVED").length,
          rejected: rows.filter((x) => x.status === "REJECTED").length,
        });
      } catch {
        setStats({ total: 0, pending: 0, approved: 0, rejected: 0 });
      }
    }
    loadStats();
  }, [auth]);

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: "1px solid rgba(201,168,76,0.20)",
          background:
            "radial-gradient(circle at 85% 20%, rgba(45,212,191,0.10), transparent 36%), radial-gradient(circle at 10% 80%, rgba(201,168,76,0.12), transparent 40%), rgba(26,37,64,0.62)",
          mb: 2.5,
        }}
      >
        <Typography sx={{ fontSize: 11, color: "#C9A84C", letterSpacing: ".14em", fontWeight: 700 }}>
          WELCOME
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            color: "#F4F6FB",
            fontSize: { xs: 24, md: 34 },
            fontWeight: 800,
            mt: 0.8,
          }}
        >
          Welcome back, {toDisplayName(auth)}
        </Typography>
        <Typography sx={{ color: "#AAB4CD", fontSize: 13, mt: 1.1, maxWidth: 760 }}>
          Online Approval Hierarchy System helps teams move decisions faster with clear ownership,
          transparent review, and real-time visibility across every request.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          <Chip label={`Role: ${auth?.role || "USER"}`} sx={{ bgcolor: "rgba(201,168,76,0.14)", color: "#E4C97A" }} />
          <Chip label={`Total: ${stats.total}`} sx={{ bgcolor: "rgba(129,140,248,0.12)", color: "#818CF8" }} />
          <Chip label={`Pending: ${stats.pending}`} sx={{ bgcolor: "rgba(252,211,77,0.12)", color: "#FCD34D" }} />
          <Chip label={`Approved: ${stats.approved}`} sx={{ bgcolor: "rgba(74,222,128,0.12)", color: "#4ADE80" }} />
          <Chip label={`Rejected: ${stats.rejected}`} sx={{ bgcolor: "rgba(248,113,113,0.12)", color: "#F87171" }} />
        </Stack>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {features.map((item) => (
          <Grid key={item.title} item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2.3,
                borderRadius: 2,
                border: "1px solid rgba(201,168,76,0.16)",
                bgcolor: "rgba(26,37,64,0.55)",
                height: "100%",
              }}
            >
              <Typography sx={{ color: "#F4F6FB", fontWeight: 700, fontSize: 14, mb: 0.8 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "#8B9AB5", fontSize: 12.5, lineHeight: 1.7 }}>
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2,
          border: "1px solid rgba(201,168,76,0.16)",
          bgcolor: "rgba(26,37,64,0.55)",
        }}
      >
        <Typography sx={{ color: "#F4F6FB", fontWeight: 700, mb: 1 }}>
          Explore Modules
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <Button
            variant="contained"
            onClick={() => navigate("/new-request")}
            sx={{
              background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
              color: "#0A0F1E",
              fontWeight: 700,
            }}
          >
            Create Request
          </Button>
          <Button variant="outlined" onClick={() => navigate("/approvals")} sx={{ color: "#E4C97A" }}>
            My Requests
          </Button>
          <Button variant="outlined" onClick={() => navigate("/dashboard")} sx={{ color: "#2DD4BF" }}>
            Dashboard
          </Button>
          <Button variant="outlined" onClick={() => navigate("/reports")} sx={{ color: "#818CF8" }}>
            Reports
          </Button>
          {auth?.role === "ADMIN" && (
            <Button variant="outlined" onClick={() => navigate("/admin")} sx={{ color: "#4ADE80" }}>
              Admin Console
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}


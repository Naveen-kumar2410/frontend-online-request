import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAdminRequests, getUserRequests } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

const CHART_COLORS = ["#C9A84C", "#2DD4BF", "#818CF8", "#F87171", "#4ADE80", "#FCD34D"];

function buildStatusData(rows) {
  const map = rows.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function buildTypeData(rows) {
  const map = rows.reduce((acc, row) => {
    const key = row.requestType || "Other";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function buildUrgencyData(rows) {
  const order = ["LOW", "NORMAL", "HIGH", "URGENT"];
  const map = rows.reduce((acc, row) => {
    const key = row.urgency || "LOW";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return order.map((name) => ({ name, value: map[name] || 0 }));
}

function reportCard(title, value, subtitle) {
  return { title, value, subtitle };
}

export default function Reports() {
  const auth = useMemo(() => getStoredAuth(), []);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setError("");
      setLoading(true);
      try {
        const data =
          auth?.role === "ADMIN" ? await getAdminRequests(auth) : await getUserRequests(auth);
        setRows(data || []);
      } catch (err) {
        setError(err?.message || "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [auth]);

  const statusData = buildStatusData(rows);
  const typeData = buildTypeData(rows);
  const urgencyData = buildUrgencyData(rows);

  const pending = rows.filter((x) => x.status === "PENDING").length;
  const approved = rows.filter((x) => x.status === "APPROVED").length;
  const rejected = rows.filter((x) => x.status === "REJECTED").length;
  const approvalRate = rows.length ? Math.round((approved / rows.length) * 100) : 0;

  const cards = [
    reportCard("Total Requests", rows.length, loading ? "Loading..." : "Live volume"),
    reportCard("Approval Rate", `${approvalRate}%`, "Approved / Total"),
    reportCard("Pending Queue", pending, "Awaiting decision"),
    reportCard("Rejected", rejected, "Needs resubmission"),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          color: "#F4F6FB",
          mb: 0.5,
        }}
      >
        Reports
      </Typography>
      <Typography sx={{ fontSize: 12, color: "#8B9AB5", mb: 2.5 }}>
        Live analytics and operational insights
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(201,168,76,0.18)",
                bgcolor: "rgba(26,37,64,0.6)",
              }}
            >
              <Typography sx={{ color: "#8B9AB5", fontSize: 11 }}>{card.title}</Typography>
              <Typography sx={{ color: "#F4F6FB", fontSize: 30, fontWeight: 800, lineHeight: 1.1, mt: 0.7 }}>
                {card.value}
              </Typography>
              <Typography sx={{ color: "#C9A84C", fontSize: 11, mt: 0.8 }}>{card.subtitle}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(201,168,76,0.18)",
              bgcolor: "rgba(26,37,64,0.6)",
              height: 320,
            }}
          >
            <Typography sx={{ color: "#F4F6FB", fontSize: 14, fontWeight: 700, mb: 1.2 }}>
              Requests by Type
            </Typography>
            <ResponsiveContainer width="100%" height="88%">
              <BarChart data={typeData}>
                <XAxis dataKey="name" stroke="#8B9AB5" fontSize={11} />
                <YAxis stroke="#8B9AB5" fontSize={11} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {typeData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(201,168,76,0.18)",
              bgcolor: "rgba(26,37,64,0.6)",
              height: 320,
            }}
          >
            <Typography sx={{ color: "#F4F6FB", fontSize: 14, fontWeight: 700, mb: 1.2 }}>
              Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="88%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {statusData.map((_, i) => (
                    <Cell key={`pie-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(201,168,76,0.18)",
              bgcolor: "rgba(26,37,64,0.6)",
              height: 270,
            }}
          >
            <Typography sx={{ color: "#F4F6FB", fontSize: 14, fontWeight: 700, mb: 1.2 }}>
              Urgency Mix
            </Typography>
            <ResponsiveContainer width="100%" height="86%">
              <BarChart data={urgencyData}>
                <XAxis dataKey="name" stroke="#8B9AB5" fontSize={11} />
                <YAxis stroke="#8B9AB5" fontSize={11} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {urgencyData.map((_, i) => (
                    <Cell key={`urg-${i}`} fill={CHART_COLORS[(i + 2) % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}


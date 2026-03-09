import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getAdminRequests, getUserRequests } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

function statusChip(status) {
  if (status === "APPROVED") return { bg: "rgba(74,222,128,0.12)", color: "#4ADE80" };
  if (status === "REJECTED") return { bg: "rgba(248,113,113,0.12)", color: "#F87171" };
  return { bg: "rgba(252,211,77,0.12)", color: "#FCD34D" };
}

export default function Dashboard() {
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
        setError(err?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [auth]);

  const pending = rows.filter((x) => x.status === "PENDING").length;
  const approved = rows.filter((x) => x.status === "APPROVED").length;
  const rejected = rows.filter((x) => x.status === "REJECTED").length;

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
        Dashboard
      </Typography>
      <Typography sx={{ fontSize: 12, color: "#8B9AB5", mb: 2 }}>
        Fully backend-driven dashboard from{" "}
        <code>{auth?.role === "ADMIN" ? "/admin/requests" : "/user/requests"}</code>
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip label={`Total: ${rows.length}`} sx={{ bgcolor: "rgba(129,140,248,0.12)", color: "#818CF8" }} />
        <Chip label={`Pending: ${pending}`} sx={{ bgcolor: "rgba(252,211,77,0.12)", color: "#FCD34D" }} />
        <Chip label={`Approved: ${approved}`} sx={{ bgcolor: "rgba(74,222,128,0.12)", color: "#4ADE80" }} />
        <Chip label={`Rejected: ${rejected}`} sx={{ bgcolor: "rgba(248,113,113,0.12)", color: "#F87171" }} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid rgba(201,168,76,0.20)",
          borderRadius: 2,
          bgcolor: "rgba(26,37,64,0.6)",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {loading ? "Loading..." : "No records found"}
                </TableCell>
              </TableRow>
            )}
            {rows.slice(0, 10).map((row) => {
              const st = statusChip(row.status);
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: "#E4C97A", fontWeight: 700 }}>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.requestType}</TableCell>
                  <TableCell>{row.urgency}</TableCell>
                  <TableCell>
                    <Chip size="small" label={row.status} sx={{ bgcolor: st.bg, color: st.color }} />
                  </TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


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
import { getUserRequests } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

function statusColor(status) {
  if (status === "APPROVED") return { bg: "rgba(74,222,128,0.12)", color: "#4ADE80" };
  if (status === "REJECTED") return { bg: "rgba(248,113,113,0.12)", color: "#F87171" };
  return { bg: "rgba(252,211,77,0.12)", color: "#FCD34D" };
}

function statusLabel(status) {
  if (!status) return "Pending";
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function MyApproval() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useMemo(() => getStoredAuth(), []);

  useEffect(() => {
    async function loadData() {
      setError("");
      setLoading(true);
      try {
        const data = await getUserRequests(auth);
        setRows(data || []);
      } catch (err) {
        setError(err.message || "Failed to load my requests");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [auth]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F4F6FB", mb: 0.5 }}
      >
        My Requests
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#8B9AB5", mb: 2.5 }}>
        Track your submitted requests and approval status
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
              <TableCell>Stage</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {loading ? "Loading..." : "No requests found"}
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => {
              const colors = statusColor(row.status);
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: "#E4C97A", fontWeight: 700 }}>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.requestType}</TableCell>
                  <TableCell>{row.urgency}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabel(row.status)}
                      size="small"
                      sx={{ bgcolor: colors.bg, color: colors.color, fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell>{row.stageNumber || "-"}</TableCell>
                  <TableCell>{row.approvalComment || "-"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { decideRequest, getAdminRequests } from "./api/requestApi";
import { getStoredAuth } from "./lib/authStorage";

function statusChipStyle(status) {
  if (status === "APPROVED") return { bg: "rgba(74,222,128,0.12)", color: "#4ADE80" };
  if (status === "REJECTED") return { bg: "rgba(248,113,113,0.12)", color: "#F87171" };
  return { bg: "rgba(252,211,77,0.12)", color: "#FCD34D" };
}

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [selectedRequestor, setSelectedRequestor] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState({});
  const [comment, setComment] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useMemo(() => getStoredAuth(), []);

  const fetchRequests = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await getAdminRequests(auth);
      setRequests(data || []);
    } catch (err) {
      setError(err.message || "Failed to load admin requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitDecision = async (id) => {
    const selectedDecision = decision[id];
    if (!selectedDecision) {
      setError("Select APPROVED or REJECTED before submit.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);
    try {
      await decideRequest(
        id,
        { decision: selectedDecision, comment: comment[id] || "" },
        auth
      );
      setMessage(`Request ${id} updated.`);
      await fetchRequests();
    } catch (err) {
      setError(err.message || "Failed to update request");
    } finally {
      setLoading(false);
    }
  };

  const pending = requests.filter((r) => r.status === "PENDING").length;
  const approved = requests.filter((r) => r.status === "APPROVED").length;
  const rejected = requests.filter((r) => r.status === "REJECTED").length;
  const total = requests.length;
  const requestorStats = Object.entries(
    requests.reduce((acc, row) => {
      const key = row.createdBy || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const visibleRequests = selectedRequestor
    ? requests.filter((r) => r.createdBy === selectedRequestor)
    : requests;
  const selectedStats = visibleRequests.reduce(
    (acc, row) => {
      acc.total += 1;
      if (row.status === "PENDING") acc.pending += 1;
      if (row.status === "APPROVED") acc.approved += 1;
      if (row.status === "REJECTED") acc.rejected += 1;
      return acc;
    },
    { total: 0, pending: 0, approved: 0, rejected: 0 }
  );
  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F4F6FB", mb: 0.5 }}
      >
        Admin Panel
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#8B9AB5", mb: 2.5 }}>
        All requests across users with admin decision controls
      </Typography>
      {selectedRequestor && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
          action={
            <Button size="small" color="inherit" onClick={() => setSelectedRequestor("")}>
              Clear
            </Button>
          }
        >
          Showing details for requestor: {selectedRequestor}
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
        <Chip label={`Total: ${total}`} sx={{ bgcolor: "rgba(129,140,248,0.12)", color: "#818CF8" }} />
        <Chip label={`Pending: ${pending}`} sx={{ bgcolor: "rgba(252,211,77,0.12)", color: "#FCD34D" }} />
        <Chip label={`Approved: ${approved}`} sx={{ bgcolor: "rgba(74,222,128,0.12)", color: "#4ADE80" }} />
        <Chip label={`Rejected: ${rejected}`} sx={{ bgcolor: "rgba(248,113,113,0.12)", color: "#F87171" }} />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
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
                  <TableCell>Decision</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      {loading ? "Loading..." : "No requests found for selected requestor"}
                    </TableCell>
                  </TableRow>
                )}
                {visibleRequests.map((row) => {
                  const colors = statusChipStyle(row.status);
                  return (
                    <TableRow
                      key={row.id}
                      onClick={() => setSelectedRequest(row)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "rgba(201,168,76,0.05)" },
                      }}
                    >
                      <TableCell sx={{ color: "#E4C97A", fontWeight: 700 }}>{row.id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.requestType}</TableCell>
                      <TableCell>{row.urgency}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" sx={{ bgcolor: colors.bg, color: colors.color }} />
                      </TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={1} alignItems="center">
                          <TextField
                            select
                            value={decision[row.id] || ""}
                            onChange={(e) =>
                              setDecision((prev) => ({ ...prev, [row.id]: e.target.value }))
                            }
                            size="small"
                            sx={{ minWidth: 130 }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                            <MenuItem value="REJECTED">REJECTED</MenuItem>
                          </TextField>
                          <TextField
                            size="small"
                            placeholder="Comment"
                            value={comment[row.id] || ""}
                            onChange={(e) =>
                              setComment((prev) => ({ ...prev, [row.id]: e.target.value }))
                            }
                          />
                          <Button
                            size="small"
                            variant="contained"
                            disabled={loading}
                            onClick={() => submitDecision(row.id)}
                            sx={{
                              background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                              color: "#0A0F1E",
                              fontWeight: 700,
                            }}
                          >
                            Apply
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid rgba(201,168,76,0.20)",
              borderRadius: 2,
              bgcolor: "rgba(26,37,64,0.6)",
              p: 2,
            }}
          >
            <Typography sx={{ color: "#F4F6FB", fontWeight: 700, mb: 1.2 }}>
              Requestors
            </Typography>
            {selectedRequestor && (
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ color: "#E4C97A", fontSize: 12, fontWeight: 700 }}>
                  {selectedRequestor}
                </Typography>
                <Stack direction="row" spacing={0.8} sx={{ mt: 0.8, flexWrap: "wrap" }}>
                  <Chip size="small" label={`Total ${selectedStats.total}`} sx={{ height: 20 }} />
                  <Chip size="small" label={`P ${selectedStats.pending}`} sx={{ height: 20 }} />
                  <Chip size="small" label={`A ${selectedStats.approved}`} sx={{ height: 20 }} />
                  <Chip size="small" label={`R ${selectedStats.rejected}`} sx={{ height: 20 }} />
                </Stack>
              </Box>
            )}
            {requestorStats.length === 0 && (
              <Typography sx={{ color: "#8B9AB5", fontSize: 12 }}>No requestor data</Typography>
            )}
            <Stack spacing={1}>
              {requestorStats.map(([email, count]) => (
                <Box
                  key={email}
                  onClick={() => setSelectedRequestor(email)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    p: 0.8,
                    borderRadius: 1,
                    cursor: "pointer",
                    bgcolor: selectedRequestor === email ? "rgba(201,168,76,0.18)" : "transparent",
                    border: selectedRequestor === email ? "1px solid rgba(201,168,76,0.35)" : "1px solid transparent",
                    "&:hover": { bgcolor: "rgba(201,168,76,0.10)" },
                  }}
                >
                  <Typography sx={{ color: "#8B9AB5", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {email}
                  </Typography>
                  <Chip
                    size="small"
                    label={count}
                    sx={{ bgcolor: "rgba(201,168,76,0.15)", color: "#E4C97A", height: 20 }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={Boolean(selectedRequest)}
        onClose={() => setSelectedRequest(null)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            bgcolor: "#111827",
            borderLeft: "1px solid rgba(201,168,76,0.20)",
            color: "#F4F6FB",
          },
        }}
      >
        {selectedRequest && (
          <Box sx={{ p: 2.5 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, mb: 0.6 }}>
              Request #{selectedRequest.id}
            </Typography>
            <Typography sx={{ color: "#8B9AB5", fontSize: 12, mb: 2 }}>
              Full request details
            </Typography>

            <Stack spacing={1.4}>
              <DetailRow label="Title" value={selectedRequest.title} />
              <DetailRow label="Description" value={selectedRequest.description || "-"} />
              <DetailRow label="Type" value={selectedRequest.requestType} />
              <DetailRow label="Urgency" value={selectedRequest.urgency} />
              <DetailRow label="Status" value={selectedRequest.status} />
              <DetailRow label="Created By" value={selectedRequest.createdBy} />
              <DetailRow label="Stage Number" value={selectedRequest.stageNumber ?? "-"} />
              <DetailRow label="Approval Comment" value={selectedRequest.approvalComment || "-"} />
              <DetailRow label="Created At" value={formatDateTime(selectedRequest.createdAt)} />
              <DetailRow label="Updated At" value={formatDateTime(selectedRequest.updatedAt)} />
            </Stack>

            <Button
              onClick={() => setSelectedRequest(null)}
              sx={{ mt: 2, color: "#E4C97A", borderColor: "rgba(201,168,76,0.30)" }}
              variant="outlined"
              fullWidth
            >
              Close
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

function DetailRow({ label, value }) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 1.2,
        p: 1.2,
        bgcolor: "rgba(26,37,64,0.55)",
      }}
    >
      <Typography sx={{ fontSize: 10, color: "#8B9AB5", textTransform: "uppercase", letterSpacing: ".08em" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#F4F6FB", mt: 0.5, wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  );
}

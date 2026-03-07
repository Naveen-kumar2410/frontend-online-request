import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Switch,
  TextField,
  Grid,
  IconButton,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Rule as RuleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Admin() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showToast = (message, type) => {
    // This would be connected to your actual toast system
    console.log(`Toast: ${message} (${type})`);
    // For demonstration, we'll use a simple alert
    alert(message);
  };

  // Hierarchy data
  const hierarchyLevels = [
    {
      level: 5,
      title: "Chief Executive Officer",
      subtitle: "Level 5 · Final Authority",
      dotColor: "#C9A84C",
      type: "single",
    },
    {
      level: 4,
      nodes: [
        { title: "VP / Director", subtitle: "Level 4 · Strategic", dotColor: "#2DD4BF" },
        { title: "Finance Controller", subtitle: "Level 4 · Budget >₹1L", dotColor: "#2DD4BF" },
      ],
    },
    {
      level: 3,
      nodes: [
        { title: "IT Manager", subtitle: "Level 3", dotColor: "#818CF8" },
        { title: "HR Manager", subtitle: "Level 3", dotColor: "#818CF8" },
        { title: "Dept Manager", subtitle: "Level 3", dotColor: "#818CF8" },
      ],
    },
    {
      level: 2,
      nodes: [
        { title: "Team Lead", subtitle: "Level 2 · First Reviewer", dotColor: "#8B9AB5" },
        { title: "Project Lead", subtitle: "Level 2 · First Reviewer", dotColor: "#8B9AB5" },
      ],
    },
    {
      level: 1,
      title: "Employee / Staff",
      subtitle: "Level 1 · Requestor",
      dotColor: "#8B9AB5",
      type: "single",
    },
  ];

  // Users data
  const usersData = [
    { name: "Meena Iyer", email: "meena@oahs.in", dept: "Executive", role: "CEO · L5", roleType: "review", status: "Active", statusType: "approved" },
    { name: "Ravi Pillai", email: "ravi@oahs.in", dept: "Finance", role: "Controller · L4", roleType: "review", status: "Active", statusType: "approved" },
    { name: "Priya Sharma", email: "priya@oahs.in", dept: "IT", role: "Manager · L3", roleType: "draft", status: "Active", statusType: "approved" },
    { name: "Arun Kumar", email: "arun@oahs.in", dept: "IT", role: "Lead · L2", roleType: "draft", status: "Active", statusType: "approved" },
    { name: "Deepa Nair", email: "deepa@oahs.in", dept: "HR", role: "Employee · L1", roleType: "draft", status: "On Leave", statusType: "pending" },
  ];

  // Rules data
  const rulesData = [
    { rule: "High-Value Procurement", category: "Procurement", condition: "Amount > ₹1,00,000", route: "TL → Mgr → Finance → CEO", sla: "24h", status: "Active", statusType: "approved" },
    { rule: "Standard Procurement", category: "Procurement", condition: "Amount ≤ ₹1,00,000", route: "TL → Mgr → Finance", sla: "12h", status: "Active", statusType: "approved" },
    { rule: "Short Leave", category: "Leave", condition: "Duration ≤ 3 days", route: "TL only", sla: "4h", status: "Active", statusType: "approved" },
    { rule: "Extended Leave", category: "Leave", condition: "Duration > 3 days", route: "TL → HR Manager", sla: "8h", status: "Active", statusType: "approved" },
    { rule: "IT Hardware", category: "IT Asset", condition: "All amounts", route: "TL → IT Mgr → Finance", sla: "16h", status: "Draft", statusType: "draft" },
  ];

  const getStatusChip = (type, label) => {
    const colors = {
      approved: { bg: "rgba(74,222,128,0.12)", color: "#4ADE80" },
      review: { bg: "rgba(45,212,191,0.10)", color: "#2DD4BF" },
      pending: { bg: "rgba(252,211,77,0.12)", color: "#FCD34D" },
      draft: { bg: "rgba(139,154,181,0.12)", color: "#8B9AB5" },
    };
    return (
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: colors[type]?.bg || colors.draft.bg,
          color: colors[type]?.color || colors.draft.color,
          fontWeight: 600,
          fontSize: "11px",
          height: "22px",
          "& .MuiChip-label": { px: 1 },
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 3, height: "100%", width: "100%", overflow: "auto", boxSizing: "border-box" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "20px",
              fontWeight: 800,
              color: "#F4F6FB",
            }}
          >
            Admin Panel
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#8B9AB5", mt: 0.5 }}>
            Hierarchy, users & system configuration
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => showToast("Changes saved!", "ok")}
          size="small"
          sx={{
            background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
            color: "#0A0F1E",
            fontWeight: 600,
            fontSize: "12px",
            textTransform: "none",
            px: 2,
            "&:hover": {
              background: "linear-gradient(135deg, #b5943a, #d4b561)",
            },
          }}
        >
          Save
        </Button>
      </Box>

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 0,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              color: "#8B9AB5",
              fontWeight: 600,
              fontSize: "13px",
              textTransform: "none",
              minHeight: "48px",
              "&.Mui-selected": {
                color: "#E4C97A",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#C9A84C",
            },
          }}
        >
          <Tab icon={<BusinessIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Hierarchy" />
          <Tab icon={<PeopleIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Users" />
          <Tab icon={<RuleIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Rules" />
          <Tab icon={<SettingsIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Settings" />
        </Tabs>
      </Paper>

      {/* Hierarchy Tab */}
      <TabPanel value={tabValue} index={0}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: "rgba(26,37,64,0.6)",
            border: "1px solid rgba(201,168,76,0.20)",
            borderRadius: 2,
            backdropFilter: "blur(14px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#F4F6FB",
              }}
            >
              Approval Hierarchy
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => showToast("Level added!", "ok")}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 600,
                fontSize: "11px",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #b5943a, #d4b561)",
                },
              }}
            >
              Add Level
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {hierarchyLevels.map((level, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Box sx={{ my: 1, color: "#8B9AB5", fontSize: "14px" }}>↓</Box>
                )}
                
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  {level.type === "single" ? (
                    <Paper
                      elevation={0}
                      onClick={() => showToast(`Editing ${level.title}…`, "info")}
                      sx={{
                        p: 2,
                        bgcolor: "rgba(26,37,64,0.8)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: "200px",
                        "&:hover": {
                          borderColor: "rgba(201,168,76,0.3)",
                          bgcolor: "rgba(26,37,64,0.9)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: level.dotColor,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB" }}>
                          {level.title}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#8B9AB5" }}>
                          {level.subtitle}
                        </Typography>
                      </Box>
                    </Paper>
                  ) : (
                    level.nodes.map((node, nodeIdx) => (
                      <Paper
                        key={nodeIdx}
                        elevation={0}
                        onClick={() => showToast(`Editing ${node.title}…`, "info")}
                        sx={{
                          p: 2,
                          bgcolor: "rgba(26,37,64,0.8)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: 2,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          minWidth: "180px",
                          "&:hover": {
                            borderColor: "rgba(201,168,76,0.3)",
                            bgcolor: "rgba(26,37,64,0.9)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: node.dotColor,
                            flexShrink: 0,
                          }}
                        />
                        <Box>
                          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB" }}>
                            {node.title}
                          </Typography>
                          <Typography sx={{ fontSize: "11px", color: "#8B9AB5" }}>
                            {node.subtitle}
                          </Typography>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Paper>
      </TabPanel>

      {/* Users Tab */}
      <TabPanel value={tabValue} index={1}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: "rgba(26,37,64,0.6)",
            border: "1px solid rgba(201,168,76,0.20)",
            borderRadius: 2,
            backdropFilter: "blur(14px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#F4F6FB",
              }}
            >
              Users
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => showToast("Add user dialog", "info")}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 600,
                fontSize: "11px",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #b5943a, #d4b561)",
                },
              }}
            >
              Add User
            </Button>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Name", "Email", "Department", "Role", "Status", ""].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#8B9AB5",
                        bgcolor: "rgba(26,37,64,0.8)",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        py: 1.5,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& td": { borderBottom: "1px solid rgba(255,255,255,0.07)" },
                    }}
                  >
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB", py: 1.5 }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#8B9AB5", py: 1.5 }}>
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#F4F6FB", py: 1.5 }}>
                      {row.dept}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {getStatusChip(row.roleType, row.role)}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {getStatusChip(row.statusType, row.status)}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => showToast(`Editing ${row.name}…`, "info")}
                        sx={{
                          color: "#8B9AB5",
                          "&:hover": { color: "#C9A84C" },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Rules Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: "rgba(26,37,64,0.6)",
            border: "1px solid rgba(201,168,76,0.20)",
            borderRadius: 2,
            backdropFilter: "blur(14px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#F4F6FB",
              }}
            >
              Workflow Routing Rules
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => showToast("New rule created!", "ok")}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 600,
                fontSize: "11px",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #b5943a, #d4b561)",
                },
              }}
            >
              Add Rule
            </Button>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Rule", "Category", "Condition", "Route", "SLA", "Status"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#8B9AB5",
                        bgcolor: "rgba(26,37,64,0.8)",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        py: 1.5,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rulesData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& td": { borderBottom: "1px solid rgba(255,255,255,0.07)" },
                    }}
                  >
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB", py: 1.5 }}>
                      {row.rule}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#8B9AB5", py: 1.5 }}>
                      {row.category}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#8B9AB5", py: 1.5 }}>
                      {row.condition}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#8B9AB5", py: 1.5 }}>
                      {row.route}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#F4F6FB", py: 1.5 }}>
                      {row.sla}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {getStatusChip(row.statusType, row.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={2}>
          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                bgcolor: "rgba(26,37,64,0.6)",
                border: "1px solid rgba(201,168,76,0.20)",
                borderRadius: 2,
                backdropFilter: "blur(14px)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#F4F6FB",
                  mb: 2,
                }}
              >
                Notifications
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { title: "Email Notifications", desc: "Send email on every status change", checked: true },
                  { title: "SMS Alerts", desc: "SMS for urgent requests", checked: true },
                  { title: "SLA Breach Alerts", desc: "Alert when approval exceeds SLA", checked: true },
                  { title: "Daily Digest", desc: "Daily summary of pending items", checked: false },
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB" }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#8B9AB5" }}>
                        {item.desc}
                      </Typography>
                    </Box>
                    <Switch
                      defaultChecked={item.checked}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#C9A84C",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(201,168,76,0.4)",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Automation */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                bgcolor: "rgba(26,37,64,0.6)",
                border: "1px solid rgba(201,168,76,0.20)",
                borderRadius: 2,
                backdropFilter: "blur(14px)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#F4F6FB",
                  mb: 2,
                }}
              >
                Automation
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { title: "Auto-Escalation", desc: "Escalate after SLA breach", checked: true },
                  { title: "Delegate on Leave", desc: "Auto-delegate when approver on leave", checked: true },
                  { title: "Parallel Approvals", desc: "Simultaneous multi-level review", checked: false },
                  { title: "SAP ERP Sync", desc: "Sync approved requests to SAP", checked: true },
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#F4F6FB" }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#8B9AB5" }}>
                        {item.desc}
                      </Typography>
                    </Box>
                    <Switch
                      defaultChecked={item.checked}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#C9A84C",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(201,168,76,0.4)",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* SLA Configuration */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                bgcolor: "rgba(26,37,64,0.6)",
                border: "1px solid rgba(201,168,76,0.20)",
                borderRadius: 2,
                backdropFilter: "blur(14px)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#F4F6FB",
                  mb: 2,
                }}
              >
                SLA Configuration
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {[
                  { label: "Procurement (hrs)", value: 24 },
                  { label: "Leave (hrs)", value: 8 },
                  { label: "Travel (hrs)", value: 48 },
                  { label: "IT Asset (hrs)", value: 16 },
                ].map((field, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <TextField
                      fullWidth
                      label={field.label}
                      type="number"
                      defaultValue={field.value}
                      size="small"
                      InputLabelProps={{
                        sx: {
                          color: "#8B9AB5",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#F4F6FB",
                          fontSize: "13px",
                          bgcolor: "rgba(26,37,64,0.8)",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.08)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(201,168,76,0.3)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#C9A84C",
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                onClick={() => showToast("SLA saved!", "ok")}
                size="small"
                sx={{
                  background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                  color: "#0A0F1E",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #b5943a, #d4b561)",
                  },
                }}
              >
                Save SLA
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}
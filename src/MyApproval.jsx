import React, { useState } from "react";
import {
  Box, Drawer, Typography, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, IconButton,
  TextField, MenuItem, Select, InputAdornment, Stack, Divider,
  Tooltip, Badge, Avatar, LinearProgress, Tabs, Tab,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

/* ─────────────────────────────────────────
   MUI THEME  (Navy + Gold)
───────────────────────────────────────── */
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0A0F1E", paper: "rgba(26,37,64,0.7)" },
    primary:   { main: "#C9A84C", light: "#E4C97A", dark: "#9C7D35" },
    secondary: { main: "#2DD4BF" },
    error:     { main: "#F87171" },
    success:   { main: "#4ADE80" },
    warning:   { main: "#FCD34D" },
    text: { primary: "#F4F6FB", secondary: "#8B9AB5" },
    divider: "rgba(201,168,76,0.15)",
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h5: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h6: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    subtitle2: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(14px)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 9 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: 11 } },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: "rgba(26,37,64,0.85)",
          color: "#8B9AB5",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(201,168,76,0.14)",
        },
        body: {
          color: "#F4F6FB",
          fontSize: 13,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#111827",
          borderLeft: "1px solid rgba(201,168,76,0.18)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: 12,
          minHeight: 36,
          padding: "6px 14px",
        },
      },
    },
  },
});

/* ─────────────────────────────────────────
   DUMMY DATA
───────────────────────────────────────── */
const REQUESTS = [
  { id:"PR-00892", category:"Procurement", emoji:"📦", desc:"Laptop & Accessories",    requestor:"Arun Kumar",  dept:"IT",      value:"₹1,85,000", priority:"HIGH",   status:"In Review",  date:"01 Mar", level:3 },
  { id:"TR-00128", category:"Travel",      emoji:"✈️", desc:"Client Visit Mumbai",     requestor:"Kiran Raj",   dept:"Sales",   value:"₹42,000",   priority:"HIGH",   status:"Pending",    date:"02 Mar", level:2 },
  { id:"IT-00068", category:"IT Asset",    emoji:"💻", desc:"Server RAM Upgrade",      requestor:"Sneha M",     dept:"IT",      value:"₹55,000",   priority:"NORMAL", status:"Pending",    date:"03 Mar", level:2 },
  { id:"LV-00342", category:"Leave",       emoji:"🏖️", desc:"Annual Leave – Diwali",  requestor:"Mohan V",     dept:"Finance", value:"5 Days",     priority:"NORMAL", status:"Pending",    date:"03 Mar", level:1 },
  { id:"LV-00341", category:"Leave",       emoji:"🏖️", desc:"Sick Leave",             requestor:"Deepa Nair",  dept:"HR",      value:"3 Days",     priority:"LOW",    status:"Approved",   date:"28 Feb", level:1 },
  { id:"PR-00888", category:"Procurement", emoji:"📦", desc:"Office Furniture",        requestor:"Ramya S",     dept:"Admin",   value:"₹2,30,000", priority:"NORMAL", status:"Approved",   date:"27 Feb", level:4 },
  { id:"IT-00067", category:"IT Asset",    emoji:"💻", desc:"Printer Replacement",     requestor:"Sneha M",     dept:"IT",      value:"₹78,500",   priority:"NORMAL", status:"Rejected",   date:"25 Feb", level:2 },
  { id:"HR-00012", category:"HR",          emoji:"👥", desc:"Hire 2 Dev Interns",      requestor:"Priya Sharma",dept:"HR",      value:"Contract",   priority:"HIGH",   status:"In Review",  date:"04 Mar", level:3 },
  { id:"FN-00034", category:"Finance",     emoji:"💰", desc:"Q1 Budget Reallocation",  requestor:"Ravi Pillai", dept:"Finance", value:"₹4,00,000", priority:"URGENT", status:"Pending",    date:"05 Mar", level:4 },
];

const TIMELINE = [
  { name:"Arun Kumar",   role:"Team Lead",          status:"done",   time:"01 Mar, 11:05 AM", note:null },
  { name:"Priya Sharma", role:"IT Manager",         status:"done",   time:"01 Mar, 1:20 PM",  note:'"Essential for Q1 hiring — please expedite."' },
  { name:"Ravi Pillai",  role:"Finance Controller", status:"active", time:null,               note:null },
  { name:"Meena Iyer",   role:"CEO",                status:"wait",   time:null,               note:null },
];

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_CONFIG = {
  "In Review": { color: "#2DD4BF", bg: "rgba(45,212,191,0.12)", dot: "#2DD4BF" },
  "Pending":   { color: "#FCD34D", bg: "rgba(252,211,77,0.12)",  dot: "#FCD34D" },
  "Approved":  { color: "#4ADE80", bg: "rgba(74,222,128,0.12)",  dot: "#4ADE80" },
  "Rejected":  { color: "#F87171", bg: "rgba(248,113,113,0.12)", dot: "#F87171" },
};

const PRIORITY_CONFIG = {
  "URGENT": { color: "#F87171", bg: "rgba(248,113,113,0.12)" },
  "HIGH":   { color: "#E4C97A", bg: "rgba(201,168,76,0.15)"  },
  "NORMAL": { color: "#8B9AB5", bg: "rgba(139,154,181,0.10)" },
  "LOW":    { color: "#8B9AB5", bg: "rgba(139,154,181,0.08)" },
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function MyApproval() {
  const [filterTab, setFilterTab]   = useState(0);
  const [search, setSearch]         = useState("");
  const [panelOpen, setPanelOpen]   = useState(false);
  const [selected, setSelected]     = useState(null);
  const [comment, setComment]       = useState("");
  const [toast, setToast]           = useState(null);

  const TABS = ["All", "Pending", "In Review", "Approved", "Rejected"];

  const filtered = REQUESTS.filter((r) => {
    const matchTab =
      filterTab === 0 ||
      r.status === TABS[filterTab];
    const matchSearch =
      search === "" ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.requestor.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  function openPanel(row) {
    setSelected(row);
    setComment("");
    setPanelOpen(true);
  }

  function showToast(msg, color = "#4ADE80") {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  }

  function handleApprove() {
    showToast(`✓  ${selected.id} Approved & forwarded!`, "#4ADE80");
    setPanelOpen(false);
  }

  function handleReject() {
    showToast(`✕  ${selected.id} Rejected. Requestor notified.`, "#FCD34D");
    setPanelOpen(false);
  }

  const tabCounts = TABS.map((t, i) =>
    i === 0 ? REQUESTS.length : REQUESTS.filter((r) => r.status === t).length
  );

  /* ── KPI bar ── */
  const kpis = [
    { label: "Total",      value: REQUESTS.length,                              color: "#E4C97A" },
    { label: "Pending",    value: REQUESTS.filter(r=>r.status==="Pending").length,    color: "#FCD34D" },
    { label: "In Review",  value: REQUESTS.filter(r=>r.status==="In Review").length,  color: "#2DD4BF" },
    { label: "Approved",   value: REQUESTS.filter(r=>r.status==="Approved").length,   color: "#4ADE80" },
    { label: "Rejected",   value: REQUESTS.filter(r=>r.status==="Rejected").length,   color: "#F87171" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0A0F1E",
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 10% 15%, rgba(201,168,76,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 85%, rgba(45,212,191,0.04) 0%, transparent 55%)",
          p: { xs: 2, md: 3.5 },
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── HEADER ── */}
        <Box sx={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", mb:3, flexWrap:"wrap", gap:2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontSize:22, color:"#F4F6FB", mb:0.5 }}>
              My Approvals
            </Typography>
            <Typography variant="body2" sx={{ color:"#8B9AB5" }}>
              Manage all pending and past requests — {REQUESTS.length} total
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg,#C9A84C,#E4C97A)",
              color: "#0A0F1E",
              fontWeight: 700,
              px: 2.5,
              "&:hover": { boxShadow:"0 6px 20px rgba(201,168,76,0.35)", transform:"translateY(-1px)" },
            }}
          >
            + New Request
          </Button>
        </Box>

        {/* ── KPI ROW ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 1.5,
            mb: 3,
            "@media(max-width:700px)": { gridTemplateColumns:"repeat(3,1fr)" },
          }}
        >
          {kpis.map((k) => (
            <Paper
              key={k.label}
              sx={{
                p: "14px 18px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "13px",
                background: "rgba(26,37,64,0.6)",
                transition: "border-color .2s",
                "&:hover": { borderColor:"rgba(201,168,76,0.25)" },
              }}
            >
              <Typography sx={{ fontSize:11, fontWeight:700, color:"#8B9AB5", letterSpacing:".07em", textTransform:"uppercase", mb:0.8 }}>
                {k.label}
              </Typography>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:k.color, lineHeight:1 }}>
                {k.value}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(k.value / REQUESTS.length) * 100}
                sx={{
                  mt:1, height:3, borderRadius:2,
                  backgroundColor:"rgba(139,154,181,0.10)",
                  "& .MuiLinearProgress-bar": { background: k.color, borderRadius:2 },
                }}
              />
            </Paper>
          ))}
        </Box>

        {/* ── FILTER TABS + SEARCH ── */}
        <Paper
          sx={{
            mb: 2, p: "6px 12px",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "14px",
            background: "rgba(26,37,64,0.55)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 1,
          }}
        >
          <Tabs
            value={filterTab}
            onChange={(_, v) => setFilterTab(v)}
            sx={{
              minHeight: 38,
              "& .MuiTabs-indicator": { backgroundColor:"#C9A84C", height:2, borderRadius:2 },
              "& .MuiTab-root": { color:"#8B9AB5", minHeight:38 },
              "& .Mui-selected": { color:"#E4C97A !important" },
            }}
          >
            {TABS.map((t, i) => (
              <Tab
                key={t}
                label={
                  <Box sx={{ display:"flex", alignItems:"center", gap:0.7 }}>
                    {t}
                    <Box
                      sx={{
                        background: filterTab===i ? "rgba(201,168,76,0.2)" : "rgba(139,154,181,0.1)",
                        color: filterTab===i ? "#E4C97A" : "#8B9AB5",
                        fontSize:10, fontWeight:700,
                        px:"6px", py:"1px", borderRadius:"6px",
                      }}
                    >
                      {tabCounts[i]}
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>

          <TextField
            size="small"
            placeholder="Search ID, description, requestor…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><span style={{color:"#8B9AB5"}}>🔍</span></InputAdornment>,
              sx: {
                background:"rgba(10,15,30,0.5)",
                borderRadius:"9px",
                color:"#F4F6FB",
                fontSize:13,
                "& fieldset": { borderColor:"rgba(255,255,255,0.07)" },
                "&:hover fieldset": { borderColor:"rgba(201,168,76,0.3) !important" },
                "&.Mui-focused fieldset": { borderColor:"#C9A84C !important" },
              },
            }}
            sx={{ width:280 }}
          />
        </Paper>

        {/* ── TABLE ── */}
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "14px",
            background: "rgba(26,37,64,0.55)",
            overflow: "hidden",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {["ID","Category","Description","Requestor","Dept","Value","Priority","Status","Date","Action"].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py:4, color:"#8B9AB5" }}>
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => {
                  const sc = STATUS_CONFIG[row.status]   || {};
                  const pc = PRIORITY_CONFIG[row.priority] || {};
                  const canAct = row.status === "Pending" || row.status === "In Review";
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        cursor:"pointer",
                        transition:"background .15s",
                        "&:hover": { background:"rgba(201,168,76,0.04) !important" },
                      }}
                      onClick={() => openPanel(row)}
                    >
                      {/* ID */}
                      <TableCell>
                        <Typography sx={{ fontWeight:700, color:"#E4C97A", fontSize:13 }}>
                          {row.id}
                        </Typography>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Box sx={{ display:"flex", alignItems:"center", gap:.8 }}>
                          <span style={{fontSize:14}}>{row.emoji}</span>
                          <span style={{color:"#8B9AB5",fontSize:12}}>{row.category}</span>
                        </Box>
                      </TableCell>

                      {/* Desc */}
                      <TableCell sx={{ color:"#8B9AB5", fontSize:12, maxWidth:160 }}>
                        <Tooltip title={row.desc}>
                          <span style={{ display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:140 }}>
                            {row.desc}
                          </span>
                        </Tooltip>
                      </TableCell>

                      {/* Requestor */}
                      <TableCell>
                        <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
                          <Avatar sx={{ width:22, height:22, fontSize:9, background:"linear-gradient(135deg,#C9A84C,#2DD4BF)", color:"#0A0F1E", fontWeight:700 }}>
                            {row.requestor.split(" ").map(n=>n[0]).join("")}
                          </Avatar>
                          <span style={{fontSize:13}}>{row.requestor}</span>
                        </Box>
                      </TableCell>

                      {/* Dept */}
                      <TableCell sx={{ color:"#8B9AB5", fontSize:12 }}>{row.dept}</TableCell>

                      {/* Value */}
                      <TableCell sx={{ fontWeight:600, fontSize:13 }}>{row.value}</TableCell>

                      {/* Priority */}
                      <TableCell>
                        <Chip
                          label={row.priority}
                          size="small"
                          sx={{ background:pc.bg, color:pc.color, border:`1px solid ${alpha(pc.color,0.25)}`, fontSize:10, height:20 }}
                        />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Box sx={{ display:"flex", alignItems:"center", gap:.7 }}>
                          <Box sx={{ width:6, height:6, borderRadius:"50%", background:sc.dot, flexShrink:0 }} />
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{ background:sc.bg, color:sc.color, border:`1px solid ${alpha(sc.color,0.25)}`, fontSize:11, height:22 }}
                          />
                        </Box>
                      </TableCell>

                      {/* Date */}
                      <TableCell sx={{ color:"#8B9AB5", fontSize:12, whiteSpace:"nowrap" }}>{row.date}</TableCell>

                      {/* Action */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="small"
                          variant={canAct ? "contained" : "outlined"}
                          onClick={() => openPanel(row)}
                          sx={
                            canAct
                              ? {
                                  background:"linear-gradient(135deg,#C9A84C,#E4C97A)",
                                  color:"#0A0F1E", fontSize:11, px:1.5, py:.4, minWidth:0, fontWeight:700,
                                  "&:hover":{ boxShadow:"0 4px 14px rgba(201,168,76,0.4)" },
                                }
                              : {
                                  borderColor:"rgba(255,255,255,0.1)", color:"#8B9AB5",
                                  fontSize:11, px:1.5, py:.4, minWidth:0,
                                  "&:hover":{ borderColor:"rgba(201,168,76,0.3)", color:"#E4C97A" },
                                }
                          }
                        >
                          {canAct ? "Review" : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── SIDE DRAWER (detail panel) ── */}
        <Drawer
          anchor="right"
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          PaperProps={{ sx:{ width:440, background:"#111827", borderLeft:"1px solid rgba(201,168,76,0.18)" } }}
        >
          {selected && (
            <Box sx={{ height:"100%", display:"flex", flexDirection:"column" }}>

              {/* drawer header */}
              <Box
                sx={{
                  px:3, py:2.5,
                  borderBottom:"1px solid rgba(255,255,255,0.07)",
                  display:"flex", justifyContent:"space-between", alignItems:"flex-start",
                  position:"sticky", top:0, background:"rgba(17,24,39,0.97)",
                  backdropFilter:"blur(14px)", zIndex:1,
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"#F4F6FB" }}>
                    {selected.id}
                  </Typography>
                  <Typography sx={{ fontSize:11, color:"#8B9AB5", mt:.3 }}>
                    {selected.category} · {selected.dept} Department
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => setPanelOpen(false)} sx={{ color:"#8B9AB5", "&:hover":{ color:"#F4F6FB" } }}>
                  ✕
                </IconButton>
              </Box>

              {/* drawer body */}
              <Box sx={{ flex:1, overflowY:"auto", px:3, py:3 }}>

                {/* status chips */}
                <Stack direction="row" spacing={1} sx={{ mb:3 }}>
                  <Chip
                    label={selected.status}
                    size="small"
                    sx={{
                      background:STATUS_CONFIG[selected.status]?.bg,
                      color:STATUS_CONFIG[selected.status]?.color,
                      border:`1px solid ${alpha(STATUS_CONFIG[selected.status]?.color||"#fff",0.3)}`,
                    }}
                  />
                  <Chip
                    label={selected.priority}
                    size="small"
                    sx={{
                      background:PRIORITY_CONFIG[selected.priority]?.bg,
                      color:PRIORITY_CONFIG[selected.priority]?.color,
                      border:`1px solid ${alpha(PRIORITY_CONFIG[selected.priority]?.color||"#fff",0.3)}`,
                    }}
                  />
                </Stack>

                {/* details section */}
                <Typography sx={{ fontSize:10, fontWeight:700, letterSpacing:".10em", textTransform:"uppercase", color:"#C9A84C", mb:1 }}>
                  Details
                </Typography>
                {[
                  ["Description", selected.desc],
                  ["Requestor",   selected.requestor],
                  ["Department",  selected.dept],
                  ["Value",       selected.value],
                  ["Date",        selected.date],
                ].map(([k,v]) => (
                  <Box key={k} sx={{ display:"flex", justifyContent:"space-between", py:.9, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <Typography sx={{ fontSize:12, color:"#8B9AB5" }}>{k}</Typography>
                    <Typography sx={{ fontSize:12, fontWeight:600, color: k==="Value" ? "#E4C97A" : "#F4F6FB" }}>{v}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my:2.5, borderColor:"rgba(201,168,76,0.12)" }} />

                {/* approval timeline */}
                <Typography sx={{ fontSize:10, fontWeight:700, letterSpacing:".10em", textTransform:"uppercase", color:"#C9A84C", mb:2 }}>
                  Approval Timeline
                </Typography>
                <Box sx={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {TIMELINE.map((step, idx) => (
                    <Box key={idx} sx={{ display:"flex", gap:1.5, position:"relative" }}>
                      {/* connector line */}
                      {idx < TIMELINE.length - 1 && (
                        <Box sx={{
                          position:"absolute", left:12, top:28, width:2, height:"calc(100% - 10px)",
                          background: step.status==="done"
                            ? "linear-gradient(to bottom,#4ADE80,rgba(74,222,128,0.15))"
                            : "linear-gradient(to bottom,rgba(139,154,181,0.2),transparent)",
                        }} />
                      )}
                      {/* dot */}
                      <Box
                        sx={{
                          width:26, height:26, borderRadius:"50%", flexShrink:0,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:11, fontWeight:700, border:"2px solid",
                          mb: step.note ? 0 : 2.5,
                          ...(step.status==="done"  && { background:"rgba(74,222,128,0.12)",  borderColor:"#4ADE80",  color:"#4ADE80"  }),
                          ...(step.status==="active"&& { background:"rgba(45,212,191,0.12)",  borderColor:"#2DD4BF",  color:"#2DD4BF",
                            boxShadow:"0 0 0 4px rgba(45,212,191,0.1)", animation:"pulse 2s infinite" }),
                          ...(step.status==="wait"  && { background:"rgba(139,154,181,0.08)", borderColor:"rgba(139,154,181,0.25)", color:"#8B9AB5" }),
                        }}
                      >
                        {step.status==="done" ? "✓" : step.status==="active" ? "●" : "○"}
                      </Box>
                      {/* info */}
                      <Box sx={{ mb: 2.5 }}>
                        <Typography sx={{ fontSize:12, fontWeight:700, color:"#F4F6FB" }}>{step.name}</Typography>
                        <Typography sx={{ fontSize:10, color:"#8B9AB5" }}>{step.role}</Typography>
                        {step.time && <Typography sx={{ fontSize:10, color:"#8B9AB5", mt:.3 }}>{step.time}</Typography>}
                        {step.status==="active" && (
                          <Typography sx={{ fontSize:11, color:"#2DD4BF", fontWeight:600, mt:.3 }}>Currently with you</Typography>
                        )}
                        {step.note && (
                          <Box sx={{
                            mt:.8, background:"rgba(201,168,76,0.10)", borderLeft:"2px solid #C9A84C",
                            borderRadius:"0 6px 6px 0", px:1.2, py:.8,
                          }}>
                            <Typography sx={{ fontSize:11, color:"#E4C97A", fontStyle:"italic" }}>{step.note}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* approval level progress */}
                <Divider sx={{ my:2.5, borderColor:"rgba(201,168,76,0.12)" }} />
                <Typography sx={{ fontSize:10, fontWeight:700, letterSpacing:".10em", textTransform:"uppercase", color:"#C9A84C", mb:1.5 }}>
                  Level Progress
                </Typography>
                <Box sx={{ display:"flex", gap:.8, mb:2 }}>
                  {[1,2,3,4,5].map((l) => (
                    <Box
                      key={l}
                      sx={{
                        flex:1, height:6, borderRadius:3,
                        background: l <= selected.level
                          ? "linear-gradient(90deg,#C9A84C,#E4C97A)"
                          : "rgba(139,154,181,0.12)",
                        transition:"background .3s",
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ fontSize:11, color:"#8B9AB5" }}>
                  Level {selected.level} of 5 · {selected.status}
                </Typography>

                {/* action area */}
                {(selected.status === "Pending" || selected.status === "In Review") && (
                  <>
                    <Divider sx={{ my:2.5, borderColor:"rgba(201,168,76,0.12)" }} />
                    <Typography sx={{ fontSize:10, fontWeight:700, letterSpacing:".10em", textTransform:"uppercase", color:"#C9A84C", mb:1.5 }}>
                      Your Action
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Add a remark (optional)…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      size="small"
                      sx={{
                        mb:2,
                        "& .MuiInputBase-root": {
                          background:"rgba(26,37,64,0.5)", color:"#F4F6FB",
                          borderRadius:"9px", fontSize:13,
                          "& fieldset": { borderColor:"rgba(255,255,255,0.07)" },
                          "&:hover fieldset": { borderColor:"rgba(201,168,76,0.3) !important" },
                          "&.Mui-focused fieldset": { borderColor:"#C9A84C !important" },
                        },
                        "& .MuiInputBase-input::placeholder": { color:"#8B9AB5" },
                      }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        onClick={handleApprove}
                        sx={{
                          background:"rgba(74,222,128,0.12)",
                          border:"1px solid rgba(74,222,128,0.25)",
                          color:"#4ADE80", fontWeight:700,
                          "&:hover":{ background:"rgba(74,222,128,0.2)", boxShadow:"0 4px 14px rgba(74,222,128,0.2)" },
                        }}
                      >
                        ✓ Approve
                      </Button>
                      <Button
                        fullWidth
                        onClick={handleReject}
                        sx={{
                          background:"rgba(248,113,113,0.10)",
                          border:"1px solid rgba(248,113,113,0.22)",
                          color:"#F87171", fontWeight:700,
                          "&:hover":{ background:"rgba(248,113,113,0.18)" },
                        }}
                      >
                        ✕ Reject
                      </Button>
                      <Button
                        sx={{
                          border:"1px solid rgba(255,255,255,0.08)", color:"#8B9AB5",
                          fontWeight:600, px:2, flexShrink:0,
                          "&:hover":{ borderColor:"rgba(201,168,76,0.3)", color:"#E4C97A" },
                        }}
                        onClick={() => { showToast("↑ Escalated to VP","#2DD4BF"); setPanelOpen(false); }}
                      >
                        ↑
                      </Button>
                    </Stack>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Drawer>

        {/* ── TOAST ── */}
        {toast && (
          <Box
            sx={{
              position:"fixed", bottom:24, right:24, zIndex:9999,
              background: alpha(toast.color, 0.15),
              border:`1px solid ${alpha(toast.color, 0.35)}`,
              color: toast.color,
              backdropFilter:"blur(16px)",
              borderRadius:"10px",
              px:2.5, py:1.2,
              fontSize:13, fontWeight:600,
              display:"flex", alignItems:"center", gap:1,
              boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
              animation:"slideIn .25s ease",
            }}
          >
            {toast.msg}
          </Box>
        )}

        {/* pulse keyframe */}
        <style>{`
          @keyframes pulse { 0%,100%{ box-shadow:0 0 0 0 rgba(45,212,191,0.35); } 50%{ box-shadow:0 0 0 7px rgba(45,212,191,0); } }
          @keyframes slideIn { from{ opacity:0; transform:translateX(14px); } to{ opacity:1; transform:translateX(0); } }
        `}</style>
      </Box>
    </ThemeProvider>
  );
}
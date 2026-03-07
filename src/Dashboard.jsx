import React, { useState } from "react";
import {
  Box, Typography, Grid, Chip, Button, Stack, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

/* ─── EXACT CSS VARIABLES from oahs-v3.html ─── */
const V = {
  navy:       "#0A0F1E",
  navyMid:    "#111827",
  navyLight:  "#1A2540",
  navyCard:   "rgba(26,37,64,0.6)",
  gold:       "#C9A84C",
  goldLight:  "#E4C97A",
  goldDim:    "rgba(201,168,76,0.15)",
  goldGlow:   "rgba(201,168,76,0.25)",
  teal:       "#2DD4BF",
  tealDim:    "rgba(45,212,191,0.10)",
  indigo:     "#818CF8",
  indigoDim:  "rgba(129,140,248,0.12)",
  red:        "#F87171",
  redDim:     "rgba(248,113,113,0.12)",
  green:      "#4ADE80",
  greenDim:   "rgba(74,222,128,0.12)",
  yellow:     "#FCD34D",
  yellowDim:  "rgba(252,211,77,0.12)",
  slate:      "#8B9AB5",
  white:      "#F4F6FB",
  border:     "rgba(201,168,76,0.20)",
  border2:    "rgba(255,255,255,0.07)",
};

/* ─── MUI THEME (minimal — we use inline styles matching HTML exactly) ─── */
const theme = createTheme({
  palette: { mode: "dark" },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiPaper:  { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "10px 14px",
          fontSize: 10, fontWeight: 700,
          letterSpacing: ".08em", textTransform: "uppercase",
          color: V.slate,
          background: "rgba(26,37,64,0.8)",
          borderBottom: `1px solid ${V.border2}`,
        },
        body: {
          padding: "11px 14px",
          fontSize: 13, color: V.white,
          borderBottom: `1px solid ${V.border2}`,
        },
      },
    },
  },
});

/* ─── STATUS PILL config (matches .pill-* classes) ─── */
const PILL = {
  "In Review":{ color: V.teal,   bg: V.tealDim   },
  "Pending":  { color: V.yellow, bg: V.yellowDim  },
  "Approved": { color: V.green,  bg: V.greenDim   },
  "Rejected": { color: V.red,    bg: V.redDim     },
};

/* ─── EXACT DATA from HTML ─── */
const KPI_DATA = [
  { label:"Pending",        value:"24",   sub:"▲ 3 new today",     subColor:V.green,  valueColor:V.yellow,     progW:"62%", progBg:`linear-gradient(90deg,${V.yellow},rgba(252,211,77,.4))` },
  { label:"Approved (Month)",value:"186", sub:"▲ 12% vs last month",subColor:V.green, valueColor:V.green,      progW:"78%", progBg:`linear-gradient(90deg,${V.green},rgba(74,222,128,.4))`  },
  { label:"Avg TAT",        value:"4.2h", sub:"▼ 1.8h faster",      subColor:V.green, valueColor:V.goldLight,  progW:"85%", progBg:`linear-gradient(90deg,${V.gold},${V.goldLight})`        },
  { label:"Rejection Rate", value:"6.3%", sub:"▲ 0.5%",             subColor:V.red,   valueColor:V.red,        progW:"6%",  progBg:`linear-gradient(90deg,${V.red},rgba(248,113,113,.4))`   },
];

// exact bar heights from HTML
const BARS = [
  { h:"45%",alt:false },{ h:"60%",alt:false },{ h:"52%",alt:false },{ h:"75%",alt:false },
  { h:"65%",alt:false },{ h:"88%",alt:false },
  { h:"70%",alt:true  },{ h:"82%",alt:true  },{ h:"58%",alt:true  },{ h:"95%",alt:true  },
  { h:"78%",alt:true  },{ h:"60%",alt:true, dim:true },
];
const BAR_LABELS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

// exact donut from HTML
const DONUT = [
  { color:V.gold,   dash:"88 132", offset:"0",    label:"Procurement", pct:"40%" },
  { color:V.teal,   dash:"55 165", offset:"-88",  label:"Leave",       pct:"25%" },
  { color:V.indigo, dash:"33 187", offset:"-143", label:"Travel",      pct:"15%" },
  { color:V.red,    dash:"24 196", offset:"-176", label:"Others",      pct:"20%" },
];

const RECENT = [
  { id:"PR-00892", type:"Procurement", requestor:"Arun Kumar", amount:"₹1,85,000", status:"In Review", act:true  },
  { id:"LV-00341", type:"Leave",       requestor:"Deepa Nair", amount:"3 Days",     status:"Approved",  act:false },
  { id:"TR-00128", type:"Travel",      requestor:"Kiran Raj",  amount:"₹42,000",    status:"Pending",   act:true  },
  { id:"IT-00067", type:"IT Asset",    requestor:"Sneha M",    amount:"₹78,500",    status:"Rejected",  act:false },
];

const ACTIVITY = [
  { ic:"✓",  bg:V.greenDim,  msg:<>Priya approved <b>PR-00889</b></>,  time:"2 min ago"  },
  { ic:"📤", bg:V.tealDim,   msg:<><b>IT-00068</b> submitted</>,        time:"14 min ago" },
  { ic:"✕",  bg:V.redDim,    msg:<>IT-00067 rejected</>,               time:"1h ago"     },
  { ic:"⏰", bg:V.yellowDim, msg:<>SLA breach: TR-00125</>,             time:"2h ago"     },
];

/* ─── CARD component (matches .card and .card-gold) ─── */
function Card({ gold, children, sx={} }) {
  return (
    <Box sx={{
      background: V.navyCard,
      border: `1px solid ${gold ? V.border : V.border2}`,
      borderRadius: "16px",
      padding: "22px",
      backdropFilter: "blur(14px)",
      transition: "border-color .2s",
      "&:hover": { borderColor: V.border },
      ...sx,
    }}>
      {children}
    </Box>
  );
}

/* ─── MAIN ─── */
export default function Dashboard() {
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* exact .content padding */}
      <Box sx={{
        minHeight: "100vh",
        background: V.navy,
        backgroundImage:
          `radial-gradient(ellipse 80% 60% at 10% 20%, rgba(201,168,76,0.06) 0%, transparent 60%),` +
          `radial-gradient(ellipse 60% 50% at 90% 80%, rgba(45,212,191,0.05) 0%, transparent 55%)`,
        padding: "28px",
        fontFamily: "'DM Sans', sans-serif",
        color: V.white,
        position: "relative",
        "&::before": {
          content: '""', position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),` +
            `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        },
      }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>

          {/* ── HEADER — exact from HTML ── */}
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:"20px" }}>
            <Box>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:V.white }}>
                Dashboard
              </Typography>
              <Typography sx={{ fontSize:12, color:V.slate, mt:"2px" }}>
                Welcome, Ravi Pillai · Tuesday 03 Mar 2026
              </Typography>
            </Box>
            <Stack direction="row" spacing="8px">
              {/* btn-ghost btn-sm */}
              <Box
                component="button"
                onClick={() => showToast("Report exported! ✓")}
                sx={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  padding:"6px 14px", borderRadius:"9px", fontSize:12, fontWeight:600,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:"none",
                  background:"transparent", border:`1px solid ${V.border2}`, color:V.slate,
                  transition:"all .2s",
                  "&:hover":{ borderColor:V.border, color:V.white },
                }}
              >⬇ Export</Box>
              {/* btn-primary btn-sm */}
              <Box
                component="button"
                sx={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  padding:"6px 14px", borderRadius:"9px", fontSize:12, fontWeight:600,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:"none",
                  background:`linear-gradient(135deg,${V.gold},${V.goldLight})`, color:V.navy,
                  transition:"all .2s",
                  "&:hover":{ transform:"translateY(-1px)", boxShadow:`0 6px 20px ${V.goldGlow}` },
                }}
              >+ New Request</Box>
            </Stack>
          </Box>

          {/* ── KPI ROW — grid-template-columns:repeat(4,1fr) gap:14px ── */}
          <Box sx={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:"14px", mb:"20px",
          }}>
            {KPI_DATA.map((k) => (
              <Box
                key={k.label}
                sx={{
                  background: V.navyCard,
                  border: `1px solid ${V.border2}`,
                  borderRadius:"13px", padding:"18px 20px",
                  backdropFilter:"blur(14px)", transition:"border-color .2s",
                  "&:hover":{ borderColor:V.border },
                  // card-gold
                  borderColor: V.border,
                }}
              >
                {/* kpi-l */}
                <Typography sx={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:V.slate, mb:"10px" }}>
                  {k.label}
                </Typography>
                {/* kpi-v */}
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, lineHeight:1, color:k.valueColor }}>
                  {k.value}
                </Typography>
                {/* kpi-c */}
                <Typography sx={{ fontSize:11, fontWeight:600, mt:"6px", color:k.subColor }}>
                  {k.sub}
                </Typography>
                {/* pbar */}
                <Box sx={{ height:4, background:"rgba(139,154,181,.10)", borderRadius:2, overflow:"hidden", mt:"8px" }}>
                  <Box sx={{ height:"100%", borderRadius:2, width:k.progW, background:k.progBg }} />
                </Box>
              </Box>
            ))}
          </Box>

          {/* ── DASH2 ROW 1: Monthly Volume (2fr) + By Category (1fr) ── */}
          <Box sx={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"16px", mb:"16px" }}>

            {/* Monthly Volume — card card-gold */}
            <Card gold>
              {/* card-head */}
              <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:"16px" }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:V.white }}>
                  Monthly Volume
                </Typography>
                <Typography sx={{ fontSize:12, color:V.goldLight, cursor:"pointer", fontWeight:500, "&:hover":{ opacity:.75 } }}>
                  Full Report →
                </Typography>
              </Box>
              {/* .bars — height:64px */}
              <Box sx={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"64px", mt:"6px" }}>
                {BARS.map((b, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex:1, height:b.h, borderRadius:"3px 3px 0 0",
                      opacity: b.dim ? 0.3 : 0.75,
                      cursor:"pointer", transition:"opacity .15s",
                      background: b.alt
                        ? `linear-gradient(to top,${V.teal},rgba(45,212,191,.25))`
                        : `linear-gradient(to top,${V.gold},rgba(201,168,76,.3))`,
                      "&:hover":{ opacity:1 },
                    }}
                  />
                ))}
              </Box>
              {/* b-labels */}
              <Box sx={{ display:"flex", gap:"5px", mt:"6px" }}>
                {BAR_LABELS.map((l) => (
                  <Box key={l} sx={{ flex:1, textAlign:"center" }}>
                    <Typography sx={{ fontSize:9, color:V.slate }}>{l}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* By Category — card (no gold) */}
            <Card>
              {/* card-title */}
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:V.white, mb:"16px" }}>
                By Category
              </Typography>
              {/* donut-row */}
              <Box sx={{ display:"flex", alignItems:"center", gap:"18px", mt:"8px" }}>
                {/* exact SVG from HTML */}
                <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink:0 }}>
                  <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(139,154,181,.1)" strokeWidth="12"/>
                  {DONUT.map((d, i) => (
                    <circle
                      key={i}
                      cx="45" cy="45" r="35"
                      fill="none"
                      stroke={d.color}
                      strokeWidth="12"
                      strokeDasharray={d.dash}
                      strokeDashoffset={d.offset}
                      transform="rotate(-90 45 45)"
                    />
                  ))}
                  <text x="45" y="42" textAnchor="middle" fontSize="13" fontWeight="800" fill="#F4F6FB" fontFamily="Syne">186</text>
                  <text x="45" y="54" textAnchor="middle" fontSize="8"  fill="#8B9AB5"  fontFamily="DM Sans">total</text>
                </svg>
                {/* dleg */}
                <Box sx={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {DONUT.map((d) => (
                    <Box key={d.label} sx={{ display:"flex", alignItems:"center", gap:"7px" }}>
                      {/* dleg-sq */}
                      <Box sx={{ width:8, height:8, borderRadius:"2px", background:d.color, flexShrink:0 }} />
                      <Typography sx={{ fontSize:12, color:V.white }}>{d.label} {d.pct}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Card>
          </Box>

          {/* ── DASH2 ROW 2: Recent Requests (2fr) + Activity (1fr) ── */}
          <Box sx={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"16px" }}>

            {/* Recent Requests — card card-gold */}
            <Card gold>
              <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:"16px" }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:V.white }}>
                  Recent Requests
                </Typography>
                <Typography sx={{ fontSize:12, color:V.goldLight, cursor:"pointer", fontWeight:500, "&:hover":{ opacity:.75 } }}>
                  View All →
                </Typography>
              </Box>
              {/* tbl-wrap */}
              <Box sx={{ overflow:"hidden", borderRadius:"12px", border:`1px solid ${V.border2}` }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr>
                      {["ID","Type","Requestor","Amount","Status",""].map((h) => (
                        <th key={h} style={{
                          padding:"10px 14px", fontSize:10, fontWeight:700,
                          letterSpacing:".08em", textTransform:"uppercase", color:V.slate,
                          background:"rgba(26,37,64,0.8)", textAlign:"left",
                          borderBottom:`1px solid ${V.border2}`,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT.map((r) => {
                      const p = PILL[r.status];
                      return (
                        <tr
                          key={r.id}
                          style={{ borderBottom:`1px solid ${V.border2}`, cursor:"pointer", transition:"background .12s" }}
                          onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,0.03)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                        >
                          {/* ID */}
                          <td style={{ padding:"11px 14px", fontSize:13, fontWeight:700, color:r.act ? V.goldLight : V.white }}>
                            {r.id}
                          </td>
                          {/* Type */}
                          <td style={{ padding:"11px 14px", fontSize:13, color:V.slate }}>{r.type}</td>
                          {/* Requestor */}
                          <td style={{ padding:"11px 14px", fontSize:13, color:V.white }}>{r.requestor}</td>
                          {/* Amount */}
                          <td style={{ padding:"11px 14px", fontSize:13, color:V.white }}>{r.amount}</td>
                          {/* Status pill */}
                          <td style={{ padding:"11px 14px" }}>
                            <span style={{
                              display:"inline-flex", alignItems:"center", gap:4,
                              padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:600,
                              color:p.color, background:p.bg,
                            }}>
                              <span style={{ width:5, height:5, borderRadius:"50%", background:p.color, display:"inline-block" }}/>
                              {r.status}
                            </span>
                          </td>
                          {/* Action */}
                          <td style={{ padding:"11px 14px" }}>
                            <Box
                              component="button"
                              onClick={() => showToast(`Opening ${r.id}…`)}
                              sx={{
                                padding:"4px 10px", borderRadius:9, fontSize:11, fontWeight:600,
                                cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif",
                                ...(r.act
                                  ? { background:`linear-gradient(135deg,${V.gold},${V.goldLight})`, color:V.navy,
                                      "&:hover":{ transform:"translateY(-1px)", boxShadow:`0 4px 14px ${V.goldGlow}` } }
                                  : { background:"transparent", border:`1px solid ${V.border2}`, color:V.slate,
                                      "&:hover":{ borderColor:V.border, color:V.white } }
                                ),
                              }}
                            >
                              {r.act ? "Review" : "View"}
                            </Box>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Box>
            </Card>

            {/* Activity — card (no gold) */}
            <Card>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:V.white, mb:"16px" }}>
                Activity
              </Typography>
              {/* act-list */}
              <Box sx={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {ACTIVITY.map((a, i) => (
                  <Box key={i} sx={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    {/* act-ic */}
                    <Box sx={{
                      width:28, height:28, borderRadius:"8px", flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:13, background:a.bg,
                    }}>
                      {a.ic}
                    </Box>
                    <Box>
                      {/* act-msg */}
                      <Typography sx={{ fontSize:12, color:V.white, lineHeight:1.45 }}>
                        {a.msg}
                      </Typography>
                      {/* act-time */}
                      <Typography sx={{ fontSize:10, color:V.slate, mt:"1px" }}>
                        {a.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>

        </Box>{/* z-index wrapper */}

        {/* TOAST */}
        {toast && (
          <Box sx={{
            position:"fixed", bottom:22, right:22, zIndex:9999,
            background:"rgba(26,37,64,0.92)",
            border:`1px solid ${V.border}`,
            backdropFilter:"blur(16px)",
            color:V.goldLight, borderRadius:"10px",
            px:"16px", py:"10px",
            fontSize:12, fontWeight:600,
            boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
            animation:"tIn .25s ease",
          }}>
            {toast}
          </Box>
        )}


      </Box>
    </ThemeProvider>
  );
}
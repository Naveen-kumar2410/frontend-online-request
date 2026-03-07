import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f1421",
      paper: "#141c2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#6b7a99",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
});

const reportCards = [
  {
    icon: "⏱️",
    title: "Turnaround Time",
    desc: "Avg approval time by dept, category & level.",
    updated: "Updated today",
  },
  {
    icon: "✅",
    title: "Approval Rate",
    desc: "Approval vs rejection by approver & category.",
    updated: "Updated today",
  },
  {
    icon: "🔍",
    title: "Bottleneck Detection",
    desc: "Identify levels causing workflow delays.",
    updated: "Updated 2h ago",
  },
  {
    icon: "🏢",
    title: "Department Summary",
    desc: "Requests, spends & stats per department.",
    updated: "Updated yesterday",
  },
  {
    icon: "📋",
    title: "Audit Log",
    desc: "Full immutable history for compliance.",
    updated: "Real-time",
  },
  {
    icon: "💰",
    title: "Spend Analytics",
    desc: "Budget utilization and category-wise spends.",
    updated: "Updated today",
  },
];

const volumeData = [
  { month: "Apr", value: 55 },
  { month: "May", value: 75 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 92 },
  { month: "Aug", value: 108 },
  { month: "Sep", value: 125 },
  { month: "Oct", value: 150 },
  { month: "Nov", value: 138 },
  { month: "Dec", value: 118 },
  { month: "Jan", value: 132 },
  { month: "Feb", value: 112 },
  { month: "Mar", value: 98 },
];

// Gold → teal gradient colors matching screenshot
const barColors = [
  "#7A5C10",
  "#8B6914",
  "#9B7820",
  "#A8852A",
  "#B59235",
  "#1AB882",
  "#1DC998",
  "#1DD4A8",
  "#1BBFA0",
  "#19AB90",
  "#179880",
  "#158870",
];

const approvalRates = [
  { dept: "IT",         rate: 92, barColor: "#D4A017", textColor: "#F5C842" },
  { dept: "Finance",    rate: 88, barColor: "#D4A017", textColor: "#F5C842" },
  { dept: "HR",         rate: 95, barColor: "#D4A017", textColor: "#F5C842" },
  { dept: "Operations", rate: 78, barColor: "#1DC9A0", textColor: "#1DC9A0" },
  { dept: "Sales",      rate: 84, barColor: "#D4A017", textColor: "#F5C842" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#1e2a3a",
          border: "1px solid #2a3a50",
          borderRadius: "8px",
          px: 1.5,
          py: 1,
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>
          {label}: {payload[0].value}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function Reports() {
  const [period, setPeriod] = useState("This Month");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0f1421",
          px: "32px",
          py: "24px",
        }}
      >
        {/* ── HEADER ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: "28px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "#ffffff",
                letterSpacing: "-0.4px",
                lineHeight: 1.15,
              }}
            >
              Reports
            </Typography>
            <Typography
              sx={{
                color: "#6b7a99",
                fontSize: "0.82rem",
                mt: "5px",
                fontWeight: 400,
              }}
            >
              Analytics and workflow insights
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              size="small"
              sx={{
                color: "#c8d4e8",
                backgroundColor: "transparent",
                border: "none",
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                ".MuiSelect-icon": { color: "#6b7a99", fontSize: "1.1rem" },
                fontSize: "0.875rem",
                fontWeight: 500,
                "& .MuiSelect-select": { pr: "28px !important", pl: 0, py: "6px" },
              }}
            >
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="Last Quarter">Last Quarter</MenuItem>
              <MenuItem value="This Year">This Year</MenuItem>
            </Select>

            <Button
              variant="contained"
              startIcon={<FileUploadIcon sx={{ fontSize: "1rem !important" }} />}
              sx={{
                backgroundColor: "#E8A020",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "10px",
                textTransform: "none",
                px: "20px",
                py: "7px",
                minWidth: "auto",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#D4901A", boxShadow: "none" },
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* ── 6 REPORT CARDS ── */}
        <Grid container spacing={2} sx={{ mb: "18px" }}>
          {reportCards.map((card, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  backgroundColor: "#141c2e",
                  border: "1px solid #1c2742",
                  borderRadius: "14px",
                  boxShadow: "none",
                  height: "100%",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "#2d3f6b" },
                }}
              >
                <CardContent
                  sx={{
                    p: "24px",
                    "&:last-child": { pb: "20px" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ fontSize: "1.5rem", mb: "16px", lineHeight: 1 }}>
                    {card.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.925rem",
                      color: "#ffffff",
                      mb: "6px",
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      color: "#6b7a99",
                      fontSize: "0.8rem",
                      lineHeight: 1.55,
                      flex: 1,
                    }}
                  >
                    {card.desc}
                  </Typography>

                  {/* Footer */}
                  <Box
                    sx={{
                      borderTop: "1px solid #1c2742",
                      mt: "20px",
                      pt: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#6b7a99", fontSize: "0.76rem" }}>
                      {card.updated}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#E8A020",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        "&:hover": { color: "#F5B830" },
                      }}
                    >
                      View →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ── BOTTOM ROW ── */}
        <Grid container spacing={2}>
          {/* Volume Bar Chart */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                backgroundColor: "#141c2e",
                border: "1px solid #1c2742",
                borderRadius: "14px",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: "24px 24px 12px 24px", "&:last-child": { pb: "12px" } }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.925rem",
                    color: "#ffffff",
                    mb: "24px",
                  }}
                >
                  Volume (Last 12 Months)
                </Typography>
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart
                    data={volumeData}
                    barCategoryGap="22%"
                    margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7a99",
                        fontSize: 11,
                        fontFamily: "Inter, sans-serif",
                      }}
                      dy={10}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.025)" }}
                    />
                    <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                      {volumeData.map((_, index) => (
                        <Cell key={index} fill={barColors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Approval Rate by Dept */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "#141c2e",
                border: "1px solid #1c2742",
                borderRadius: "14px",
                boxShadow: "none",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: "24px", "&:last-child": { pb: "24px" } }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.925rem",
                    color: "#ffffff",
                    mb: "26px",
                  }}
                >
                  Approval Rate by Dept
                </Typography>
                <Stack spacing={2.5}>
                  {approvalRates.map((item, i) => (
                    <Box key={i}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: "8px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#c8d4e8",
                            fontSize: "0.82rem",
                            fontWeight: 500,
                          }}
                        >
                          {item.dept}
                        </Typography>
                        <Typography
                          sx={{
                            color: item.textColor,
                            fontSize: "0.82rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.rate}%
                        </Typography>
                      </Box>
                      {/* Custom progress bar */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "6px",
                          borderRadius: "3px",
                          backgroundColor: "#1c2742",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${item.rate}%`,
                            height: "100%",
                            borderRadius: "3px",
                            backgroundColor: item.barColor,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
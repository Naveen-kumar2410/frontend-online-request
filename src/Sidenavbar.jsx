import React, { useState } from "react";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Badge,
  IconButton,
  InputBase,
  Paper,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { path: "/home", label: "Home", icon: <HomeIcon /> },
      { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      { path: "/approvals", label: "My Approvals", icon: <CheckCircleIcon />, badge: 9 },
      // Removed "New Request" from here
    ],
  },
  {
    label: "Insights",
    items: [
      { path: "/reports", label: "Reports", icon: <AssessmentIcon /> },
    ],
  },
  {
    label: "System",
    items: [
      { path: "/admin", label: "Admin", icon: <SettingsIcon /> },
    ],
  },
];

export default function Sidenavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  // Responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNewRequest = () => {
    // Navigate to new request page
    navigate("/new-request");
  };

  const getCurrentPageTitle = () => {
    const allItems = NAV_SECTIONS.flatMap(section => section.items);
    const currentItem = allItems.find(item => 
      location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    );
    return currentItem ? currentItem.label : "Home";
  };

  const drawerWidth = collapsed ? 80 : 260;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", bgcolor: "#0A0F1E", overflow: "hidden" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "rgba(10,15,30,0.97)",
            borderRight: "1px solid rgba(201,168,76,0.20)",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            backgroundImage: "radial-gradient(circle at top right, rgba(201,168,76,0.12), transparent 70%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
          },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            p: collapsed ? "24px 13px 18px" : "26px 20px 18px",
            borderBottom: "1px solid rgba(201,168,76,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#C9A84C",
                color: "#0A0F1E",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              OA
            </Avatar>

            {!collapsed && (
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#F4F6FB",
                    lineHeight: 1.2,
                  }}
                >
                  OAHS
                </Typography>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: "#8B9AB5",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    mt: 0.5,
                  }}
                >
                  Approval System
                </Typography>
              </Box>
            )}
          </Box>

          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            size="small"
            sx={{
              width: 20,
              height: 20,
              bgcolor: "rgba(201,168,76,0.14)",
              border: "1px solid rgba(201,168,76,0.28)",
              color: "#C9A84C",
              "&:hover": {
                bgcolor: "rgba(201,168,76,0.25)",
              },
            }}
          >
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, py: 2, px: collapsed ? 1 : 2, overflowY: "auto", overflowX: "hidden" }}>
          {NAV_SECTIONS.map((section) => (
            <Box key={section.label} sx={{ mb: 2 }}>
              {!collapsed && (
                <Typography
                  sx={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(139,154,181,0.40)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    px: 1,
                    mb: 1,
                  }}
                >
                  {section.label}
                </Typography>
              )}

              <List sx={{ p: 0 }}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  location.pathname.startsWith(item.path + "/");

                  return (
                    <ListItem
                      key={item.path}
                      disablePadding
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      <Tooltip
                        title={
                          collapsed ? (
                            <Box>
                              {item.label}
                              {item.badge && (
                                <Badge
                                  badgeContent={item.badge}
                                  color="error"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Box>
                          ) : null
                        }
                        placement="right"
                        arrow
                      >
                        <ListItemButton
                          component={NavLink}
                          to={item.path}
                          sx={{
                            minHeight: 48,
                            justifyContent: collapsed ? "center" : "initial",
                            px: collapsed ? 2.5 : 2,
                            borderRadius: 1,
                            bgcolor: isActive ? "rgba(201,168,76,0.15)" : "transparent",
                            border: isActive ? "1px solid rgba(201,168,76,0.22)" : "1px solid transparent",
                            "&:hover": {
                              bgcolor: "rgba(201,168,76,0.07)",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: collapsed ? "auto" : 2,
                              justifyContent: "center",
                              color: isActive ? "#E4C97A" : "#8B9AB5",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          
                          {!collapsed && (
                            <>
                              <ListItemText
                                primary={item.label}
                                sx={{
                                  "& .MuiListItemText-primary": {
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: isActive ? "#E4C97A" : "#8B9AB5",
                                  },
                                }}
                              />
                              {item.badge && (
                                <Badge
                                  badgeContent={item.badge}
                                  color="error"
                                  sx={{
                                    "& .MuiBadge-badge": {
                                      fontSize: 9,
                                      height: 18,
                                      minWidth: 18,
                                    },
                                  }}
                                />
                              )}
                            </>
                          )}
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ))}
        </Box>

        {/* User Section */}
        <Box
          sx={{
            p: collapsed ? "14px 12px" : "14px 16px",
            borderTop: "1px solid rgba(201,168,76,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : 2,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#C9A84C",
              backgroundImage: "linear-gradient(135deg,#C9A84C,#2DD4BF)",
              color: "#0A0F1E",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            RP
          </Avatar>

          {!collapsed && (
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#F4F6FB" }}>
                Ravi Pillai
              </Typography>
              <Typography sx={{ fontSize: 10, color: "#8B9AB5" }}>
                Finance Controller
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: `calc(100vw - ${drawerWidth}px)`,
          bgcolor: "#0A0F1E",
          overflow: "hidden",
        }}
      >
        {/* Top Bar */}
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: "rgba(10,15,30,0.97)",
            borderBottom: "1px solid rgba(201,168,76,0.20)",
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" sx={{ color: "#F4F6FB", fontWeight: 600, fontSize: isVerySmallScreen ? "16px" : "20px" }}>
            {getCurrentPageTitle()}
          </Typography>

          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: isVerySmallScreen ? 0.5 : 1.5,
            flexShrink: 0,
          }}>
            {/* New Request Button - Added here before search */}
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleNewRequest}
              component={NavLink}
              to="/new-request"
              sx={{
                background: "linear-gradient(135deg, #C9A84C, #E4C97A)",
                color: "#0A0F1E",
                fontWeight: 600,
                fontSize: "13px",
                textTransform: "none",
                px: 2,
                py: 1,
                minWidth: isVerySmallScreen ? "40px" : "120px",
                "&:hover": {
                  background: "linear-gradient(135deg, #b5943a, #d4b561)",
                },
                mr: 1,
                textDecoration: "none",
              }}
            >
              {isVerySmallScreen ? <AddIcon /> : "New Request"}
            </Button>

            {/* Search - Responsive width */}
            {!isVerySmallScreen && (
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: isSmallScreen ? 180 : 260,
                  bgcolor: "rgba(26,37,64,0.7)",
                  border: "1px solid rgba(201,168,76,0.20)",
                  borderRadius: 1,
                }}
              >
                <IconButton sx={{ p: "6px" }} aria-label="search">
                  <SearchIcon sx={{ color: "#8B9AB5", fontSize: 20 }} />
                </IconButton>
                <InputBase
                  sx={{ ml: 0.5, flex: 1, color: "#F4F6FB", fontSize: "14px" }}
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Paper>
            )}

            {/* Mobile search icon - visible only on very small screens */}
            {isVerySmallScreen && (
              <IconButton
                sx={{
                  bgcolor: "rgba(26,37,64,0.7)",
                  border: "1px solid rgba(201,168,76,0.20)",
                  borderRadius: 1,
                  p: 1.5,
                }}
              >
                <SearchIcon sx={{ color: "#C9A84C", fontSize: 20 }} />
              </IconButton>
            )}

            {/* Notifications - Always visible */}
            <IconButton
              onClick={handleNotificationClick}
              sx={{
                bgcolor: "rgba(26,37,64,0.7)",
                border: "1px solid rgba(201,168,76,0.20)",
                borderRadius: 1,
                p: 1.5,
                "&:hover": {
                  bgcolor: "rgba(26,37,64,0.9)",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon sx={{ color: "#C9A84C", fontSize: 20 }} />
              </Badge>
            </IconButton>

            {/* User Avatar - Always visible */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#C9A84C",
                backgroundImage: "linear-gradient(135deg,#C9A84C,#2DD4BF)",
                color: "#0A0F1E",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              RP
            </Avatar>
          </Box>
        </Paper>

        {/* Content Area - This is where Dashboard will render */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "#0A0F1E",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            bgcolor: "#1A2540",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "#F4F6FB",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Notifications (3)
          </Typography>
        </Box>
        
        <MenuItem sx={{ flexDirection: "column", alignItems: "flex-start", py: 1.5 }}>
          <Typography variant="body2" sx={{ color: "#F4F6FB", mb: 0.5 }}>
            New approval request from John
          </Typography>
          <Typography variant="caption" sx={{ color: "#8B9AB5" }}>
            2 min ago
          </Typography>
        </MenuItem>
        
        <Divider sx={{ borderColor: "rgba(201,168,76,0.10)" }} />
        
        <MenuItem sx={{ flexDirection: "column", alignItems: "flex-start", py: 1.5 }}>
          <Typography variant="body2" sx={{ color: "#F4F6FB", mb: 0.5 }}>
            Monthly report ready for review
          </Typography>
          <Typography variant="caption" sx={{ color: "#8B9AB5" }}>
            1 hour ago
          </Typography>
        </MenuItem>
        
        <Divider sx={{ borderColor: "rgba(201,168,76,0.10)" }} />
        
        <MenuItem sx={{ flexDirection: "column", alignItems: "flex-start", py: 1.5 }}>
          <Typography variant="body2" sx={{ color: "#F4F6FB", mb: 0.5 }}>
            System update completed successfully
          </Typography>
          <Typography variant="caption" sx={{ color: "#8B9AB5" }}>
            Yesterday
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
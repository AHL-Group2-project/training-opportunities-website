import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { accountMenuItems, getNavEntries } from "../navigation";
import logo from "../../../assets/images/logo.png";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role ?? "public";
  const userName = user?.name ?? "Guest";
  const notificationCount = 0; // TODO: Replace with real notification count from API

  const navEntries = useMemo(() => getNavEntries(role), [role]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState<string | null>(null);
  const [groupAnchor, setGroupAnchor] = useState<HTMLElement | null>(null);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);

  const closeGroupMenu = () => {
    setActiveEntry(null);
    setGroupAnchor(null);
  };

  const initials = useMemo(
    () =>
      userName
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase() || "U",
    [userName],
  );
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          minHeight: 72,
          gap: 2,
          px: { xs: 2, md: 3 },
          position: "relative",
        }}
      >
        {/* Logo */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ minWidth: 0, flexShrink: 0, alignItems: "center" }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
              cursor: "pointer",
            }}
          />
          <Stack spacing={0} sx={{ minWidth: 0, color: "inherit" }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              Internship Hub
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7, display: { xs: 'none', sm: 'block' } }} noWrap>
              Internship management platform
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ flex: 1, minWidth: 0 }} />

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 0.5,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          {/* Navigation */}
          {navEntries.map((entry) => {
            if (entry.type === "link") {
              return (
                <Button
                  key={entry.item.path}
                  component={RouterLink}
                  to={entry.item.path}
                  sx={{ px: 1.5, py: 1, color: "inherit" }}
                >
                  {entry.item.label}
                </Button>
              );
            }

            {
              /* Dropdown Menu */
            }
            const isOpen = activeEntry === entry.label;

            return (
              <Box key={entry.label}>
                <Button
                  onClick={(event) => {
                    if (isOpen) {
                      closeGroupMenu();
                      return;
                    }

                    setActiveEntry(entry.label);
                    setGroupAnchor(event.currentTarget);
                  }}
                  endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
                  sx={{ px: 1.5, py: 1, color: "inherit" }}
                >
                  {entry.label}
                </Button>
                <Menu
                  anchorEl={groupAnchor}
                  open={isOpen && Boolean(groupAnchor)}
                  onClose={closeGroupMenu}
                  slotProps={{ list: { dense: true } }}
                >
                  {entry.items.map((item) => (
                    <MenuItem
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      onClick={closeGroupMenu}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            );
          })}
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ flexShrink: 0, alignItems: "center" }}
        >
          {/* Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Open navigation">
              <IconButton
                aria-label="Open navigation"
                onClick={() => setMobileOpen(true)}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {/* Notifications */}
          {isAuthenticated ? (
            <>
              <Tooltip title="Notifications">
                <IconButton
                  aria-label="Notifications"
                  onClick={() => navigate("/notifications")}
                >
                  <Badge
                    badgeContent={notificationCount}
                    color="primary"
                    invisible={notificationCount === 0}
                  >
                    <NotificationsNoneRoundedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title={userName}>
                <IconButton
                  aria-label="Open account menu"
                  onClick={(event) => setAccountAnchor(event.currentTarget)}
                  sx={{ ml: 0.5 }}
                >
                  <Avatar
                    src={user?.avatarUrl}
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "primary.main",
                      fontSize: 14,
                    }}
                  >
                    {!user?.avatarUrl && initials}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={() => setAccountAnchor(null)}
                slotProps={{ list: { dense: true } }}
              >
                {accountMenuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      setAccountAnchor(null);

                      switch (item.label) {
                        case "Logout":
                          logout();
                          navigate("/");
                          return;
                        // Route based on role
                        case "Profile":
                          switch (user?.role) {
                            case "company":
                              navigate("/company/profile");
                              break;
                            case "admin":
                              navigate("/admin/profile");
                              break;
                            case "supervisor":
                              navigate("/supervisor/profile");
                              break;
                            case "student":
                            default:
                              navigate("/profile");
                          }
                          return;
                        default:
                          if (item.path) navigate(item.path);
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{ ml: 1 }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
      {/* Mobile Navigation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Internship Hub
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Navigation
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <List dense disablePadding>
            {navEntries.map((entry) => {
              if (entry.type === "link") {
                return (
                  <ListItemButton
                    key={entry.item.path}
                    component={RouterLink}
                    to={entry.item.path}
                    onClick={() => setMobileOpen(false)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemText primary={entry.item.label} />
                  </ListItemButton>
                );
              }

              return (
                <Box key={entry.label} sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 1, mb: 0.5, display: "block" }}
                  >
                    {entry.label}
                  </Typography>
                  <List dense disablePadding>
                    {entry.items.map((item) => (
                      <ListItemButton
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;

import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { Notification } from "../../../mock/notifications";

const TYPE_META: Record<
  Notification["type"],
  { icon: React.ReactNode; color: string; bg: string }
> = {
  request_approved: {
    icon: <CheckCircleIcon fontSize="small" />,
    color: "#059669",
    bg: "#ECFDF5",
  },
  request_rejected: {
    icon: <CancelIcon fontSize="small" />,
    color: "#DC2626",
    bg: "#FEF2F2",
  },
  hours_approved: {
    icon: <AccessTimeIcon fontSize="small" />,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  company_approved: {
    icon: <BusinessIcon fontSize="small" />,
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  new_request: {
    icon: <AssignmentIcon fontSize="small" />,
    color: "#D97706",
    bg: "#FFFBEB",
  },
  new_report: {
    icon: <AssignmentIcon fontSize="small" />,
    color: "#0891B2",
    bg: "#ECFEFF",
  },
};

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </Typography>
          )}
        </Box>
        {unreadCount > 0 && (
          <Button
            startIcon={<DoneAllIcon />}
            onClick={markAllAsRead}
            size="small"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      {/* Notifications list */}
      {notifications.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(100,116,139,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <NotificationsNoneIcon
              sx={{ fontSize: 36, color: "text.secondary" }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            You're all caught up!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No notifications yet. Updates about your applications and training
            will appear here.
          </Typography>
        </Card>
      ) : (
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Stack divider={<Divider />}>
            {notifications.map((n) => {
              const meta = TYPE_META[n.type];
              return (
                <Box
                  key={n._id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    px: 3,
                    py: 2,
                    bgcolor: n.read ? "transparent" : "rgba(245,158,11,0.04)",
                    transition: "background 0.2s",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                  }}
                >
                  {/* Type icon */}
                  <Box
                    sx={{
                      mt: 0.5,
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      bgcolor: meta.bg,
                      color: meta.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {meta.icon}
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: n.read ? 500 : 700,
                          fontSize: "0.95rem",
                          color: "text.primary",
                        }}
                      >
                        {n.message}
                      </Typography>
                      {!n.read && (
                        <Chip
                          label="New"
                          size="small"
                          color="primary"
                          sx={{
                            height: 18,
                            fontSize: "0.68rem",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ mt: 0.3, lineHeight: 1.5 }}>
                      {n.link && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          <a href={n.link} style={{ color: 'inherit', textDecoration: 'underline' }}>View Details</a>
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {formatRelativeTime(n.createdAt)}
                    </Typography>
                  </Box>

                  {/* Mark as read */}
                  {!n.read && (
                    <Tooltip title="Mark as read">
                      <IconButton
                        size="small"
                        onClick={() => markAsRead(n._id)}
                        sx={{
                          color: "text.disabled",
                          "&:hover": { color: "success.main" },
                        }}
                      >
                        <CheckCircleOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Card>
      )}
    </Container>
  );
}

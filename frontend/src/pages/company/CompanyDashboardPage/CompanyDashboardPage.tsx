import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/authContext";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";

interface CompanyApplication {
  id: string;
  student: {
    name: string;
  } | null;
  opportunity: {
    title: string;
  } | null;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconColor: string;
  iconBackground: string;
  onClick: () => void;
}

function StatCard({
  title,
  value,
  icon,
  iconColor,
  iconBackground,
  onClick,
}: StatCardProps) {
  return (
    <Card sx={{ height: "100%", borderRadius: 4 }}>
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: iconBackground,
                color: iconColor,
                display: "flex",
              }}
            >
              {icon}
            </Box>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function CompanyDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [opportunitiesResponse, applicationsResponse] = await Promise.all(
          [
            api.get<Opportunity[]>("/opportunities/company/me"),
            api.get<CompanyApplication[]>("/applications/company"),
          ],
        );

        if (isMounted) {
          setOpportunities(opportunitiesResponse.data);
          setApplications(applicationsResponse.data);
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError<{ message?: string }>(requestError)
            ? requestError.response?.data?.message
            : undefined;

          setError(
            typeof message === "string"
              ? message
              : "Unable to load the dashboard. Please try again.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const activeOpportunities = opportunities.filter(
    (opportunity) => opportunity.status === "active",
  ).length;
  const draftOpportunities = opportunities.filter(
    (opportunity) => opportunity.status === "draft",
  ).length;
  const archivedOpportunities = opportunities.filter(
    (opportunity) => opportunity.status === "archived",
  ).length;
  const recentApplications = applications.slice(0, 5);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Company Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.name || "your company"}
      </Typography>

      {error && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Retry
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Active Opportunities"
                value={activeOpportunities}
                icon={<BusinessCenterOutlinedIcon fontSize="small" />}
                iconColor="#3B82F6"
                iconBackground="rgba(59, 130, 246, 0.1)"
                onClick={() => navigate("/company/opportunities")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Draft Opportunities"
                value={draftOpportunities}
                icon={<DraftsOutlinedIcon fontSize="small" />}
                iconColor="#F59E0B"
                iconBackground="rgba(245, 158, 11, 0.1)"
                onClick={() => navigate("/company/opportunities")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Archived Opportunities"
                value={archivedOpportunities}
                icon={<ArchiveOutlinedIcon fontSize="small" />}
                iconColor="#6B7280"
                iconBackground="rgba(107, 114, 128, 0.1)"
                onClick={() => navigate("/company/opportunities")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Total Applications"
                value={applications.length}
                icon={<AssignmentOutlinedIcon fontSize="small" />}
                iconColor="#A855F7"
                iconBackground="rgba(168, 85, 247, 0.1)"
                onClick={() => navigate("/company/applications")}
              />
            </Grid>
          </Grid>

          <Card sx={{ mt: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Applications
                </Typography>
                {applications.length > 0 && (
                  <Button
                    onClick={() => navigate("/company/applications")}
                    sx={{ textTransform: "none" }}
                  >
                    View all
                  </Button>
                )}
              </Box>

              {recentApplications.length === 0 ? (
                <Typography
                  color="text.secondary"
                  sx={{ py: 5, textAlign: "center" }}
                >
                  No applications yet.
                </Typography>
              ) : (
                <List disablePadding>
                  {recentApplications.map((application) => (
                    <ListItem
                      key={application.id}
                      divider
                      secondaryAction={
                        <Chip label="Submitted" size="small" color="info" />
                      }
                    >
                      <ListItemText
                        primary={
                          application.student?.name ?? "Unavailable student"
                        }
                        secondary={`${application.opportunity?.title ?? "Unavailable opportunity"} • ${
                          application.appliedAt
                            ? new Date(
                                application.appliedAt,
                              ).toLocaleDateString()
                            : "Unknown date"
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}

export default CompanyDashboardPage;

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import axios from "axios";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";
import { useAuth } from "../../../context/authContext";

function OpportunityApplicationPage() {
  const { id } = useParams();
  const { user } = useAuth();

  // Reset form and request state when the opportunity or account changes.
  return (
    <OpportunityApplicationForm
      key={JSON.stringify([id, user?.id, user?.role])}
    />
  );
}

function OpportunityApplicationForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const isStudent = user?.role === "student";

  useEffect(() => {
    let isMounted = true;

    const loadOpportunity = async () => {
      let checkingApplications = false;
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError("");

        if (!isStudent) {
          setLoadError("Please sign in with a student account to apply.");
          return;
        }

        const response = await api.get<Opportunity>(`/opportunities/${id}`);

        checkingApplications = true;
        const applicationsResponse =
          await api.get<{ opportunityId: string | null }[]>("/applications/me");
        if (!Array.isArray(applicationsResponse.data)) {
          throw new Error("Invalid applications response");
        }
        const alreadyApplied = applicationsResponse.data.some(
          (application) =>
            application.opportunityId != null &&
            String(application.opportunityId) === String(response.data.id),
        );

        if (isMounted) {
          setOpportunity(response.data);
          setHasApplied(alreadyApplied);
        }
      } catch (error) {
        if (isMounted) {
          setOpportunity(null);
          setLoadError(
            checkingApplications
              ? "Unable to check your application status. Please try again."
              : axios.isAxiosError(error) && error.response?.status === 404
                ? "Opportunity not found."
                : "Unable to load the opportunity. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunity();

    return () => {
      isMounted = false;
    };
  }, [id, isStudent, retryKey]);

  const fullName = user?.name ?? "";
  const email = user?.email ?? "";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submitInProgress = useRef(false);

  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={() => {
              setLoading(true);
              setRetryKey((value) => value + 1);
            }}
          >
            Try again
          </Button>
          <Button
            component={Link}
            to={id ? `/opportunities/${id}` : "/opportunities"}
          >
            Back to opportunity
          </Button>
        </Box>
      </Box>
    );
  }

  if (!opportunity) {
    return (
      <Box
        sx={{
          py: 10,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          Opportunity not found
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
          }}
        >
          The opportunity you are looking for does not exist.
        </Typography>

        <Button
          component={Link}
          to="/opportunities"
          variant="contained"
          sx={{
            mt: 3,
            textTransform: "none",
          }}
        >
          Back to opportunities
        </Button>
      </Box>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!opportunity || hasApplied || submitted || submitInProgress.current)
      return;

    if (user?.role !== "student") {
      setSubmitError("Please sign in with a student account to apply.");
      return;
    }

    if (!phoneNumber.trim()) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    submitInProgress.current = true;
    setSubmitting(true);
    setSubmitError("");

    try {
      await api.post("/applications", {
        opportunityId: String(opportunity.id),
        coverLetter: coverLetter.trim(),
        phoneNumber: phoneNumber.trim(),
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setHasApplied(true);
        setSubmitError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      setSubmitError(
        typeof message === "string"
          ? message
          : "Unable to submit your application. Please try again.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      submitInProgress.current = false;
      setSubmitting(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FAFAFC",
        px: { xs: 2, sm: 3 },
        py: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {/* Back button */}
        <Button
          component={Link}
          to={`/opportunities/${opportunity.id}`}
          sx={{
            mb: 2,
            px: 0,
            color: "text.primary",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          ← Back to opportunity
        </Button>

        {/* Page header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              color: "text.primary",
              fontWeight: 700,
            }}
          >
            {hasApplied
              ? "Already Applied"
              : submitted
                ? "Application Submitted"
                : "Apply for this opportunity"}
          </Typography>

          <Typography color="text.secondary">
            {hasApplied || submitted
              ? "You can view your application or return to the opportunity details."
              : "Complete the application form. CV upload is temporarily unavailable."}
          </Typography>
        </Box>

        {/* Success message */}
        {hasApplied && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            You have already applied to this opportunity.
          </Alert>
        )}

        {submitted && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            Your application has been submitted successfully.
          </Alert>
        )}

        {(submitted || hasApplied) && (
          <Button component={Link} to="/applications" sx={{ mb: 3 }}>
            Go to My Applications
          </Button>
        )}

        {submitError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {submitError}
          </Alert>
        )}

        {/* Opportunity summary */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "#F4F8FF",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              color: "text.secondary",
            }}
          >
            {opportunity.company}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "text.primary",
              fontWeight: 700,
            }}
          >
            {opportunity.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Chip
              label={opportunity.location}
              size="small"
              sx={{
                backgroundColor: "transparent",
              }}
            />

            <Chip
              label={`${opportunity.seats} seats`}
              size="small"
              sx={{
                backgroundColor: "transparent",
              }}
            />
          </Box>
        </Paper>

        {/* Application form */}
        {!hasApplied && !submitted && (
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            {/* Student information */}
            <Typography
              variant="h6"
              sx={{
                mb: 0.5,
                color: "text.primary",
                fontWeight: 700,
              }}
            >
              Student information
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Your name, email, and university ID are taken from your registered
              student profile. Enter your contact phone number below.
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: 2.5,
              }}
            >
              <TextField
                required
                fullWidth
                label="Full name"
                value={fullName}
                disabled
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                value={email}
                disabled
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                label="University ID"
                value="Taken from your student profile"
                disabled
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                required
                fullWidth
                type="tel"
                label="Phone number"
                disabled={submitting || submitted}
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                slotProps={{
                  htmlInput: { maxLength: 30 },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Box>

            {/* Cover letter */}
            <TextField
              fullWidth
              multiline
              minRows={5}
              label="Cover letter"
              disabled={submitting || submitted}
              placeholder="Tell the company why you are interested in this opportunity..."
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              slotProps={{
                htmlInput: { maxLength: 5000 },
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{ mt: 2.5 }}
            />

            <Divider sx={{ my: 4 }} />

            {/* CV upload is deferred; no file is collected or sent. */}
            <Alert severity="info">
              CV upload is temporarily unavailable. You can submit your
              application without a CV. No file will be attached.
            </Alert>

            {/* Actions */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  sm: "row",
                },
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to={`/opportunities/${opportunity.id}`}
                variant="outlined"
                sx={{
                  px: 3,
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={submitting || submitted || user?.role !== "student"}
                startIcon={
                  submitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : undefined
                }
                sx={{
                  px: 4,
                  backgroundColor: "primary.main",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#2A3F6B",
                    boxShadow: "none",
                  },
                }}
              >
                {submitting
                  ? "Submitting..."
                  : submitted
                    ? "Submitted"
                    : "Submit application"}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default OpportunityApplicationPage;

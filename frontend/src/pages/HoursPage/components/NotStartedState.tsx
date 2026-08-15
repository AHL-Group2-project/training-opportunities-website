import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { NavigateFunction } from "react-router-dom";
import type { TrainingType } from "../../../mock/hoursLog.ts";
import type {
  SingleTrainingState,
  StudentProfile,
} from "../../../mock/studentTrainingState.ts";
import type { RolePermissions } from "../HoursPage.types";
import PageHeader from "./PageHeader.tsx";

interface NotStartedStateProps {
  activeFt: TrainingType;
  ftState: SingleTrainingState;
  perms: RolePermissions;
  isViewingOther: boolean;
  studentProfile?: StudentProfile;
  navigate: NavigateFunction;
  onFtChange: (dir: "prev" | "next") => void;
  isFt2Locked: boolean;
  pageError: string | null;
  pageSuccess: string | null;
  onDismissError: () => void;
  onDismissSuccess: () => void;
}

export default function NotStartedState({
  activeFt,
  ftState,
  perms,
  isViewingOther,
  studentProfile,
  navigate,
  onFtChange,
  isFt2Locked,
  pageError,
  pageSuccess,
  onDismissError,
  onDismissSuccess,
}: NotStartedStateProps) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <PageHeader
          title="Training Hours"
          subtitle={
            isViewingOther && studentProfile
              ? `Viewing ${studentProfile.name}`
              : "Manage your internship training hours"
          }
          activeFt={activeFt}
          onFtChange={onFtChange}
          isFt2Locked={isFt2Locked}
          studentProfile={studentProfile}
        />

        {pageError && (
          <Alert
            severity="error"
            sx={{ borderRadius: 2 }}
            onClose={onDismissError}
          >
            {pageError}
          </Alert>
        )}
        {pageSuccess && (
          <Alert
            severity="success"
            sx={{ borderRadius: 2 }}
            onClose={onDismissSuccess}
          >
            {pageSuccess}
          </Alert>
        )}

        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          {ftState.status === "request_rejected" && (
            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
              <Typography sx={{ variant: "subtitle2", fontWeight: 700 }}>
                Request Rejected
              </Typography>
              <Typography variant="body2">
                {ftState.requestRejectionReason ||
                  "Your training request was rejected."}
              </Typography>
            </Alert>
          )}

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            {ftState.status === "request_pending" ? (
              <AccessTimeIcon sx={{ fontSize: 28, color: "#5C6BC0" }} />
            ) : (
              <SendIcon sx={{ fontSize: 28, color: "#5C6BC0" }} />
            )}
          </Box>

          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
          >
            {activeFt} —{" "}
            {ftState.status === "request_pending"
              ? "Request Pending"
              : ftState.status === "request_rejected"
                ? "Request Rejected"
                : "Not Started"}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 480, mx: "auto" }}
          >
            {ftState.status === "request_pending"
              ? "Your training request is under supervisor review. You will be notified once it is approved or rejected."
              : ftState.status === "request_rejected"
                ? "Your previous request was rejected. Review the feedback and submit a new request."
                : "You need to submit a training request before you can start logging hours."}
          </Typography>

          {perms.canEditHours &&
            (ftState.status === "not_started" ||
              ftState.status === "request_rejected") && (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/training/request")}
                sx={{
                  bgcolor: "text.primary",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.2,
                  px: 4,
                }}
              >
                Go to Training Request Page
              </Button>
            )}

          {!perms.canEditHours && (
            <Alert
              severity="info"
              sx={{ maxWidth: 400, mx: "auto", textAlign: "left" }}
            >
              {ftState.status === "request_pending"
                ? "Waiting for supervisor to review the request."
                : "Waiting for student to submit a training request."}
            </Alert>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}

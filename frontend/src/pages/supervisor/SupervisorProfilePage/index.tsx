import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Stack,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import AvatarUpload from "../../../components/AvatarUpload";
import api from "../../../lib/axios";

interface SupervisorProfileData {
  name: string;
  university: string;
  department: string;
  phone: string;
  officeHours: string;
  avatarUrl: string | null;
}

const EMPTY_PROFILE: SupervisorProfileData = {
  name: "",
  university: "",
  department: "",
  phone: "",
  officeHours: "",
  avatarUrl: null,
};

// These two fields are not self-editable — changes must go through
// the admin-reviewed change-request workflow instead.
type RequestableField = "university" | "department";

interface ChangeRequestItem {
  _id: string;
  field: RequestableField;
  currentValue: string;
  requestedValue: string;
  status: "pending" | "approved" | "rejected";
  reviewNote?: string;
  createdAt: string;
}

const FIELD_LABELS: Record<RequestableField, string> = {
  university: "University",
  department: "Department",
};

export default function SupervisorProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] =
    useState<SupervisorProfileData>(EMPTY_PROFILE);

  // Change-request state
  const [changeRequests, setChangeRequests] = useState<ChangeRequestItem[]>(
    [],
  );
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [requestDialogField, setRequestDialogField] =
    useState<RequestableField | null>(null);
  const [requestValue, setRequestValue] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get<SupervisorProfileData>(
        "/supervisors/me/profile",
      );
      setProfileData(response.data);
    } catch (err) {
      console.error("Failed to load supervisor profile:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChangeRequests = async () => {
    try {
      setIsLoadingRequests(true);
      const response = await api.get<ChangeRequestItem[]>(
        "/change-requests/mine",
      );
      setChangeRequests(response.data);
    } catch (err) {
      console.error("Failed to load change requests:", err);
      // Non-fatal: the profile itself can still be shown without this.
    } finally {
      setIsLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchChangeRequests();
  }, []);

  const handleChange = (field: keyof SupervisorProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      // university and department are not self-editable — they go through
      // the change-request workflow instead, so they're never sent here.
      const { name, phone, officeHours, avatarUrl } = profileData;
      const response = await api.patch<SupervisorProfileData>(
        "/supervisors/me/profile",
        { name, phone, officeHours, avatarUrl },
      );
      setProfileData(response.data);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to save supervisor profile:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const pendingRequestFor = (field: RequestableField) =>
    changeRequests.find((r) => r.field === field && r.status === "pending");

  const openRequestDialog = (field: RequestableField) => {
    setRequestDialogField(field);
    setRequestValue("");
    setRequestError(null);
  };

  const closeRequestDialog = () => {
    setRequestDialogField(null);
    setRequestValue("");
    setRequestError(null);
  };

  const submitChangeRequest = async () => {
    if (!requestDialogField || !requestValue.trim()) return;

    try {
      setIsSubmittingRequest(true);
      setRequestError(null);
      await api.post("/change-requests", {
        field: requestDialogField,
        requestedValue: requestValue.trim(),
      });
      setRequestSuccess(true);
      closeRequestDialog();
      await fetchChangeRequests();
    } catch (err) {
      console.error("Failed to submit change request:", err);
      setRequestError("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const renderRequestableField = (
    field: RequestableField,
    value: string,
  ) => {
    const pending = pendingRequestFor(field);

    return (
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
          <TextField
            label={FIELD_LABELS[field]}
            value={value}
            disabled
            fullWidth
            variant="outlined"
            helperText={
              pending
                ? undefined
                : `Your ${FIELD_LABELS[field].toLowerCase()} is managed by your admin.`
            }
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => openRequestDialog(field)}
            disabled={Boolean(pending)}
            sx={{ mt: 1, whiteSpace: "nowrap" }}
          >
            Request Change
          </Button>
        </Stack>
        {pending && (
          <Chip
            size="small"
            color="warning"
            variant="outlined"
            label={`Pending review: "${pending.requestedValue}"`}
            sx={{ alignSelf: "flex-start" }}
          />
        )}
      </Stack>
    );
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 6, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {requestSuccess && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setRequestSuccess(false)}
          >
            Your change request was submitted and is now pending admin review.
          </Alert>
        )}

        <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, boxShadow: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" } as const}
            spacing={3}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              mb: 4,
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" } as const}
              spacing={3}
              sx={{ alignItems: "center" }}
            >
              {isEditMode ? (
                <AvatarUpload
                  src={profileData.avatarUrl ?? ""}
                  size={120}
                  onFileSelect={(file) =>
                    handleChange("avatarUrl", URL.createObjectURL(file))
                  }
                />
              ) : (
                <Box
                  component="img"
                  src={
                    profileData.avatarUrl ||
                    "https://ui-avatars.com/api/?name=S"
                  }
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "4px solid white",
                    backgroundColor: "primary.main",
                    boxShadow: 2,
                  }}
                />
              )}
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {profileData.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  {profileData.department}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  Guiding students towards their full potential.
                </Typography>
              </Box>
            </Stack>

            <Button
              size="small"
              variant={isEditMode ? "contained" : "outlined"}
              color={isEditMode ? "primary" : "inherit"}
              startIcon={
                isSaving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : isEditMode ? (
                  <SaveIcon />
                ) : (
                  <EditIcon />
                )
              }
              disabled={isSaving}
              onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
              sx={{ borderRadius: 2 }}
            >
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </Button>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
            Personal Information
          </Typography>

          <Stack spacing={3}>
            <Stack direction={{ xs: "column", md: "row" } as const} spacing={3}>
              <TextField
                label="Full Name"
                value={profileData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Phone Number"
                value={profileData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
              />
            </Stack>

            {/* University and Department require admin approval to change */}
            {renderRequestableField("university", profileData.university)}
            {renderRequestableField("department", profileData.department)}

            <TextField
              label="Office Hours"
              value={profileData.officeHours}
              onChange={(e) => handleChange("officeHours", e.target.value)}
              disabled={!isEditMode}
              fullWidth
              variant="outlined"
              placeholder="e.g. Sun/Mon 14:00-16:00"
            />
          </Stack>

          {!isLoadingRequests && changeRequests.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Change Request History
              </Typography>
              <Stack spacing={1.5}>
                {changeRequests.map((request) => (
                  <Stack
                    key={request._id}
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: "action.hover",
                    }}
                  >
                    <Chip
                      size="small"
                      label={request.status}
                      color={
                        request.status === "approved"
                          ? "success"
                          : request.status === "rejected"
                            ? "error"
                            : "warning"
                      }
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {FIELD_LABELS[request.field]}: "{request.currentValue}"
                      → "{request.requestedValue}"
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Card>
      </Container>

      <Dialog
        open={Boolean(requestDialogField)}
        onClose={closeRequestDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Request {requestDialogField && FIELD_LABELS[requestDialogField]} Change
        </DialogTitle>
        <DialogContent>
          {requestError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {requestError}
            </Alert>
          )}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label={`Current ${requestDialogField ? FIELD_LABELS[requestDialogField] : ""}`}
              value={
                requestDialogField ? profileData[requestDialogField] : ""
              }
              disabled
              fullWidth
            />
            <TextField
              label={`Requested ${requestDialogField ? FIELD_LABELS[requestDialogField] : ""}`}
              value={requestValue}
              onChange={(e) => setRequestValue(e.target.value)}
              fullWidth
              autoFocus
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog} disabled={isSubmittingRequest}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={
              isSubmittingRequest ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            onClick={submitChangeRequest}
            disabled={isSubmittingRequest || !requestValue.trim()}
          >
            {isSubmittingRequest ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
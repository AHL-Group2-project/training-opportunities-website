import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "../../context/authContext.ts";
import {
  type HoursEntry,
  type TrainingType,
  calcHours,
  formatHours,
  getDayName,
  validateHoursEntry,
  getNextHoursId,
} from "../../mock/hoursLog.ts";


import type { RejectTarget } from "../../types/HoursPage.types.ts";
import {
  getPermissions,
  getFtState,
} from "./HoursPage.utils";
import * as hoursApi from "../../services/hoursService";
import type { HourWeekResponse } from "../../services/hoursService";
import PageHeader from "./components/PageHeader.tsx";
import StatsCards from "./components/StatsCards.tsx";
import HoursTable from "./components/HoursTable.tsx";
import RejectDialog from "./components/RejectDialog.tsx";
import FinalApproveDialog from "./components/FinalApproveDialog.tsx";
import NotStartedState from "./components/NotStartedState.tsx";

export default function HoursPage() {
  const { user } = useAuth();
  const { studentId: studentIdParam } = useParams<{ studentId?: string }>();
  const navigate = useNavigate();

  const isViewingOther = !!studentIdParam;
  const targetStudentId = isViewingOther
    ? (studentIdParam as string)
    : (user?.id as string);

  const perms = getPermissions(user?.role ?? "", !isViewingOther);

  const [trainingOverview, setTrainingOverview] = useState<any>({
    ft1: { status: "not_started", requiredHours: 150 },
    ft2: { status: "not_started", requiredHours: 150 },
  });

  const studentProfile = useMemo(
    () => ({ name: trainingOverview.studentName || "Student" } as any),
    [trainingOverview.studentName],
  );

  const [activeFt, setActiveFt] = useState<TrainingType>("FT1");
  const [allEntries, setAllEntries] = useState<HoursEntry[]>([]);
  

  const [rowErrors, setRowErrors] = useState<Record<number, string>>({});
  const [pageError, setPageError] = useState<string | null>(null);
  const [pageSuccess, setPageSuccess] = useState<string | null>(null);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<RejectTarget | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [finalApproveDialogOpen, setFinalApproveDialogOpen] = useState(false);

  const ftKey = activeFt === "FT1" ? "ft1" : "ft2";
  const ftState = getFtState(trainingOverview, ftKey);

  const fetchRealHours = async () => {
    try {
      // setLoading(true);
      let data: HourWeekResponse[] = [];
      let ts: any = null;

      if (user?.role === "student") {
        data = await hoursApi.getMyHours();
        ts = await hoursApi.getMyTrainingState();
      } else if (user?.role === "company") {
        data = await hoursApi.getInternHours(targetStudentId.toString());
        ts = await hoursApi.getInternTrainingState(targetStudentId.toString());
      } else if (user?.role === "supervisor") {
        data = await hoursApi.getStudentHours(targetStudentId.toString());
        ts = await hoursApi.getStudentTrainingState(targetStudentId.toString());
      }

      if (ts) {
        setTrainingOverview(ts);
      }

      let flatId = 10000;
      const flatRows: HoursEntry[] = [];
      
      for (const week of data) {
        if (!week.dailyLogs) continue; // Skip old documents without dailyLogs
        for (const log of week.dailyLogs) {
          flatRows.push({
            id: ++flatId,
            studentId: targetStudentId,
            weekId: week._id,
            day: log.date ? getDayName(log.date.split("T")[0]) : "",
            date: log.date ? log.date.split("T")[0] : "",
            startTime: log.startTime || "",
            endTime: log.endTime || "",
            location: (log.location?.toLowerCase() === "remotely" ? "remotely" : "office"),
            hours: log.hours,
            taskDescription: log.description,
            status: week.companyStatus === "pending" ? "pending" : "approved",
            companyStatus: week.companyStatus,
            supervisorComment: week.companyComment,
            trainingType: String(week.trainingType).toUpperCase() as TrainingType,
          });
        }
      }
      setAllEntries(flatRows);
    } catch (err: any) {
      console.error(err);
      setPageError(`Failed to fetch hours: ${err.response?.data?.message || err.message || String(err)}`);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchRealHours();
  }, [targetStudentId, user?.role]);

  const isFt2Locked = useMemo(() => {
    if (activeFt === "FT1") return false;
    const ft1State = getFtState(trainingOverview, "ft1");
    return ft1State.status !== "completed";
  }, [trainingOverview, activeFt]);

  const filteredEntries = useMemo(
    () => allEntries.filter((e) => e.trainingType === activeFt),
    [allEntries, activeFt],
  );

  const stats = useMemo(() => {
    const getRowHours = (e: HoursEntry) => (e.startTime && e.endTime) ? calcHours(e.startTime, e.endTime) : (e.hours || 0);

    const companyApproved = filteredEntries
      .filter((e) => e.companyStatus === "approved")
      .reduce((sum, e) => sum + getRowHours(e), 0);
    const pending = filteredEntries
      .filter((e) => e.companyStatus === "pending")
      .reduce((sum, e) => sum + getRowHours(e), 0);
    const rejected = filteredEntries
      .filter((e) => e.companyStatus === "rejected")
      .reduce((sum, e) => sum + getRowHours(e), 0);
    return {
      companyApproved,
      pending,
      rejected,
      total: companyApproved + pending + rejected,
    };
  }, [filteredEntries]);

  const canSupervisorFinalApprove = useMemo(() => {
    if (!perms.canSupervisorFinal) return false;
    if (ftState.status !== "in_progress") return false;
    if (ftState.supervisorFinalStatus !== "pending") return false;
    const allReviewed = filteredEntries.every(
      (e) => e.companyStatus === "approved",
    );
    const meetsHours = stats.companyApproved >= ftState.requiredHours;
    return allReviewed && meetsHours;
  }, [perms, ftState, filteredEntries, stats]);

  const handleFtChange = useCallback(
    (direction: "prev" | "next") => {
      setPageError(null);
      setPageSuccess(null);
      setRowErrors({});

      if (activeFt === "FT1" && direction === "next") {
        if (isFt2Locked) {
          setPageError("Training 2 is locked. Complete Training 1 first.");
          return;
        }
        setActiveFt("FT2");
        return;
      }
      if (activeFt === "FT2" && direction === "prev") {
        setActiveFt("FT1");
        return;
      }
    },
    [activeFt, isFt2Locked],
  );

  const updateRow = (id: number, field: keyof HoursEntry, value: string) => {
    if (!perms.canEditHours) return;
    if (ftState.status !== "in_progress") return;
    setAllEntries((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value } as HoursEntry;
        if (field === "date" && value) updated.day = getDayName(value);
        return updated;
      }),
    );
    setRowErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateRow = (id: number): boolean => {
    const row = allEntries.find((e) => e.id === id);
    if (!row) return true;
    const siblings = allEntries.filter(
      (e) =>
        e.trainingType === activeFt &&
        e.studentId === targetStudentId &&
        e.id !== id,
    );
    const result = validateHoursEntry(row, siblings, id);
    if (!result.valid) {
      setRowErrors((prev) => ({ ...prev, [id]: result.error! }));
      return false;
    }
    return true;
  };

  const addRow = () => {
    if (!perms.canEditHours || ftState.status !== "in_progress") {
      setPageError("Cannot add hours. Training is not in progress.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const dayName = getDayName(today);
    if (dayName === "Friday") {
      setPageError("Cannot log hours on Fridays.");
      return;
    }
    const newRow: HoursEntry = {
      id: getNextHoursId(),
      studentId: targetStudentId,
      day: dayName,
      date: today,
      startTime: "09:00",
      endTime: "17:00",
      location: "office",
      status: "pending",
      companyStatus: "pending",
      trainingType: activeFt,
      isNew: true,
    };
    setAllEntries((prev) => [...prev, newRow]);
    setPageError(null);
  };

  const deleteRow = (id: number) => {
    if (!perms.canEditHours) return;
    setAllEntries((prev) => prev.filter((e) => e.id !== id));
    setRowErrors((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleCompanyApproveRow = async (entryId: number) => {
    if (!perms.canCompanyApprove && !perms.canSupervisorFinal) return; // supervisor can approve if no company account
    
    const row = allEntries.find((e) => e.id === entryId);
    if (!row || !row.weekId) return;

    try {
      if (user?.role === "company") {
        await hoursApi.reviewInternHours(row.weekId, "approved");
      } else if (user?.role === "supervisor") {
        await hoursApi.reviewStudentHours(row.weekId, "approved");
      }
      
      setAllEntries((prev) =>
        prev.map((e) =>
          e.weekId === row.weekId ? { ...e, companyStatus: "approved" as const, status: "approved" as const } : e,
        ),
      );
      setPageSuccess("Week approved successfully.");
    } catch (error) {
      setPageError("Failed to approve hours.");
    }
  };

  const handleCompanyRejectRow = (entryId: number) => {
    if (!perms.canCompanyApprove && !perms.canSupervisorFinal) return;
    setRejectTarget({ type: "row", entryId });
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const confirmRowReject = async () => {
    if (!rejectTarget || rejectTarget.type !== "row" || !rejectTarget.entryId) return;
    if (!rejectReason.trim()) {
      setPageError("Rejection reason is required.");
      return;
    }

    const row = allEntries.find((e) => e.id === rejectTarget.entryId);
    if (!row || !row.weekId) return;

    try {
      if (user?.role === "company") {
        await hoursApi.reviewInternHours(row.weekId, "rejected", rejectReason);
      } else if (user?.role === "supervisor") {
        await hoursApi.reviewStudentHours(row.weekId, "rejected", rejectReason);
      }

      setAllEntries((prev) =>
        prev.map((e) =>
          e.weekId === row.weekId
            ? {
                ...e,
                companyStatus: "rejected" as const,
                supervisorComment: rejectReason,
              }
            : e,
        ),
      );
      setRejectDialogOpen(false);
      setRejectReason("");
      setPageSuccess("Week rejected with comment.");
    } catch (error) {
      setPageError("Failed to reject hours.");
    }
  };

  const handleSupervisorFinalApprove = () => {
    if (!perms.canSupervisorFinal) return;
    if (!canSupervisorFinalApprove) {
      setPageError(
        "Cannot approve. All rows must be company-approved and hours requirement met.",
      );
      return;
    }
    setFinalApproveDialogOpen(true);
  };

  const confirmFinalApprove = () => {
    setTrainingOverview((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated[ftKey] = {
        ...updated[ftKey],
        status: "completed",
        supervisorFinalStatus: "approved",
        companyApprovedHours: stats.companyApproved,
      };
      return updated;
    });
    setFinalApproveDialogOpen(false);
    setPageSuccess(`${activeFt} final-approved. Student can proceed.`);
  };

  const handleSupervisorFinalReject = () => {
    if (!perms.canSupervisorFinal) return;
    setRejectTarget({ type: "final" });
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const confirmFinalReject = () => {
    if (!rejectReason.trim()) {
      setPageError("Rejection reason is required.");
      return;
    }
    setTrainingOverview((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated[ftKey] = {
        ...updated[ftKey],
        status: "in_progress",
        supervisorFinalStatus: "rejected",
        supervisorFinalComment: rejectReason,
      };
      return updated;
    });
    setRejectDialogOpen(false);
    setRejectReason("");
    setPageSuccess(`${activeFt} final-rejected. Student must fix issues.`);
  };

  const handleSubmitHours = async () => {
    if (!perms.canEditHours) return;
    const pendingRows = allEntries.filter(
      (e) =>
        e.trainingType === activeFt &&
        e.studentId === targetStudentId &&
        (e.status === "pending" || e.isNew),
    );
    if (pendingRows.length === 0) {
      setPageError("No pending entries to submit.");
      return;
    }
    
    const errors: Record<number, string> = {};
    let hasError = false;
    pendingRows.forEach((row) => {
      const siblings = allEntries.filter(
        (e) =>
          e.trainingType === activeFt &&
          e.studentId === targetStudentId &&
          e.id !== row.id,
      );
      const result = validateHoursEntry(row, siblings, row.id);
      if (!result.valid) {
        errors[row.id] = result.error!;
        hasError = true;
      }
    });
    if (hasError) {
      setRowErrors(errors);
      setPageError("Fix errors before submitting.");
      return;
    }
    
    try {
      await hoursApi.submitMyHoursBulk({
        trainingType: activeFt,
        entries: pendingRows.map(e => ({
          date: e.date,
          startTime: e.startTime,
          endTime: e.endTime,
          location: e.location,
          description: e.taskDescription,
          hours: (e.startTime && e.endTime) ? calcHours(e.startTime, e.endTime) : (e.hours || 0)
        }))
      });
      
      setPageSuccess(`${pendingRows.length} entries submitted for review.`);
      fetchRealHours(); // Refresh to get the grouped weekIds from backend
    } catch (error) {
      setPageError("Failed to submit hours to the server.");
    }
  };

  const hasExistingHours = filteredEntries.length > 0;

  if (
    !hasExistingHours &&
    (ftState.status === "not_started" ||
    ftState.status === "request_pending" ||
    ftState.status === "request_rejected")
  ) {
    return (
      <NotStartedState
        activeFt={activeFt}
        ftState={ftState}
        perms={perms}
        isViewingOther={isViewingOther}
        studentProfile={studentProfile}
        navigate={navigate}
        onFtChange={handleFtChange}
        isFt2Locked={isFt2Locked}
        pageError={pageError}
        pageSuccess={pageSuccess}
        onDismissError={() => setPageError(null)}
        onDismissSuccess={() => setPageSuccess(null)}
      />
    );
  }

  const isTableLocked =
    ftState.status === "not_started" ||
    ftState.status === "request_pending" ||
    ftState.status === "request_rejected" ||
    ftState.status === "completed" ||
    ftState.supervisorFinalStatus !== "pending";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <PageHeader
          title="Training Hours"
          subtitle={
            isViewingOther && studentProfile
              ? `Viewing ${studentProfile.name}`
              : "Manage your internship training hours"
          }
          activeFt={activeFt}
          onFtChange={handleFtChange}
          isFt2Locked={isFt2Locked}
          studentProfile={studentProfile}
        />

        <Collapse in={!!pageError}>
          <Alert
            severity="error"
            sx={{ borderRadius: 2 }}
            onClose={() => setPageError(null)}
          >
            {pageError}
          </Alert>
        </Collapse>
        <Collapse in={!!pageSuccess}>
          <Alert
            severity="success"
            sx={{ borderRadius: 2 }}
            onClose={() => setPageSuccess(null)}
          >
            {pageSuccess}
          </Alert>
        </Collapse>

        {hasExistingHours &&
          (ftState.status === "not_started" ||
            ftState.status === "request_pending" ||
            ftState.status === "request_rejected") && (
            <Alert
              severity="warning"
              icon={<CancelIcon />}
              sx={{ borderRadius: 2 }}
            >
              <Typography sx={{ variant: "subtitle2", fontWeight: 700 }}>
                No Active Training Request
              </Typography>
              <Typography variant="body2">
                You have existing hours, but no active training request for {activeFt}. You must{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/training/request")}
                  sx={{ fontWeight: "bold" }}
                >
                  submit a request
                </Link>{" "}
                and have it approved before you can log new hours.
              </Typography>
            </Alert>
          )}

        {ftState.status === "completed" && (
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ borderRadius: 2 }}
          >
            <Typography sx={{ variant: "subtitle2", fontWeight: 700 }}>
              {activeFt} — Completed
            </Typography>
            {ftState.supervisorFinalComment && (
              <Typography variant="body2">
                {ftState.supervisorFinalComment}
              </Typography>
            )}
          </Alert>
        )}
        {ftState.supervisorFinalStatus === "rejected" && (
          <Alert
            severity="error"
            icon={<CancelIcon />}
            sx={{ borderRadius: 2 }}
          >
            <Typography sx={{ variant: "subtitle2", fontWeight: 700 }}>
              {activeFt} — Final Rejected
            </Typography>
            {ftState.supervisorFinalComment && (
              <Typography variant="body2">
                {ftState.supervisorFinalComment}
              </Typography>
            )}
          </Alert>
        )}

        <StatsCards
          companyApproved={stats.companyApproved}
          pending={stats.pending}
          rejected={stats.rejected}
          requiredHours={ftState.requiredHours}
        />

        <HoursTable
          entries={filteredEntries}
          activeFt={activeFt}
          rowErrors={rowErrors}
          perms={perms}
          ftState={ftState}
          isTableLocked={isTableLocked}
          onUpdateRow={updateRow}
          onValidateRow={validateRow}
          onDeleteRow={deleteRow}
          onCompanyApproveRow={handleCompanyApproveRow}
          onCompanyRejectRow={handleCompanyRejectRow}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {perms.canEditHours && !isTableLocked && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addRow}
                sx={{
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                Add Row
              </Button>
            )}
            {perms.canEditHours && !isTableLocked && (
              <Button
                variant="contained"
                onClick={handleSubmitHours}
                sx={{
                  bgcolor: "text.primary",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Submit Hours
              </Button>
            )}
          </Box>

          {perms.canSupervisorFinal && ftState.status !== "completed" && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {stats.companyApproved >= ftState.requiredHours
                  ? "All requirements met"
                  : `Need ${formatHours(ftState.requiredHours - stats.companyApproved)} more`}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleSupervisorFinalReject}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Final Reject
              </Button>
              <Button
                variant="contained"
                onClick={handleSupervisorFinalApprove}
                disabled={!canSupervisorFinalApprove}
                sx={{
                  bgcolor: "#2E7D32",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#1B5E20" },
                }}
              >
                Final Approve
              </Button>
            </Box>
          )}
        </Box>
      </Stack>

      <RejectDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        rejectTarget={rejectTarget}
        rejectReason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirmRowReject={confirmRowReject}
        onConfirmFinalReject={confirmFinalReject}
      />

      <FinalApproveDialog
        open={finalApproveDialogOpen}
        onClose={() => setFinalApproveDialogOpen(false)}
        activeFt={activeFt}
        companyApprovedHours={stats.companyApproved}
        ftState={ftState}
        allEntriesReviewed={filteredEntries.every(
          (e) => e.companyStatus === "approved",
        )}
        onConfirm={confirmFinalApprove}
      />
    </Container>
  );
}

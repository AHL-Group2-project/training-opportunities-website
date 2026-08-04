import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import type { HoursEntry } from "../../../mock/hoursLog.ts";
import { calcHours, formatHours } from "../../../mock/hoursLog.ts";
import type { SingleTrainingState } from "../../../mock/studentTrainingState.ts";
import type { RolePermissions } from "../../../types/HoursPage.types.ts";
import {
  DAYS,
  LOCATION_STYLES,
  COMPANY_STATUS_STYLES,
} from "../HoursPage.constants.ts";

interface HoursTableRowProps {
  row: HoursEntry;
  idx: number;
  error?: string;
  perms: RolePermissions;
  ftState: SingleTrainingState;
  isTableLocked: boolean;
  onUpdateRow: (id: number, field: keyof HoursEntry, value: string) => void;
  onValidateRow: (id: number) => void;
  onDeleteRow: (id: number) => void;
  onCompanyApproveRow: (id: number) => void;
  onCompanyRejectRow: (id: number) => void;
}

export default function HoursTableRow({
  row,
  idx,
  error: err,
  perms,
  ftState,
  isTableLocked,
  onUpdateRow,
  onValidateRow,
  onDeleteRow,
  onCompanyApproveRow,
  onCompanyRejectRow,
}: HoursTableRowProps) {
  const hours = calcHours(row.startTime, row.endTime);
  const isPending = row.status === "pending";
  const compStyle = COMPANY_STATUS_STYLES[row.companyStatus ?? "pending"];
  const canEditThis =
    perms.canEditHours &&
    isPending &&
    !isTableLocked &&
    row.companyStatus !== "approved";

  return (
    <TableRow
      sx={{
        bgcolor: idx % 2 === 0 ? "white" : "#fafafa",
        ...(err && { bgcolor: "#fff5f5 !important" }),
      }}
    >
      {/* Day */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        {canEditThis ? (
          <Select
            value={row.day}
            onChange={(e) => onUpdateRow(row.id, "day", e.target.value)}
            size="small"
            sx={{ minWidth: 100, fontSize: 12 }}
          >
            {DAYS.map((d) => (
              <MenuItem key={d} value={d} sx={{ fontSize: 12 }}>
                {d}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography sx={{ fontSize: 13 }}>{row.day}</Typography>
        )}
      </TableCell>

      {/* Date */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        {canEditThis ? (
          <TextField
            type="date"
            value={row.date}
            onChange={(e) => onUpdateRow(row.id, "date", e.target.value)}
            size="small"
            error={!!err && err.includes("Friday")}
            helperText={!!err && err.includes("Friday") ? err : undefined}
            slotProps={{
              formHelperText: { sx: { fontSize: 10 } },
              input: { sx: { fontSize: 12 } },
            }}
            sx={{ minWidth: 130, fontSize: 12 }}
          />
        ) : (
          <Typography sx={{ fontSize: 13 }}>{row.date}</Typography>
        )}
      </TableCell>

      {/* Start */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        {canEditThis ? (
          <TextField
            type="time"
            value={row.startTime}
            onChange={(e) => onUpdateRow(row.id, "startTime", e.target.value)}
            onBlur={() => onValidateRow(row.id)}
            size="small"
            error={!!err && (err.includes("Start") || err.includes("after"))}
            helperText={
              !!err && (err.includes("Start") || err.includes("after"))
                ? err
                : undefined
            }
            slotProps={{
              formHelperText: { sx: { fontSize: 10, whiteSpace: "nowrap" } },
              input: {
                sx: { fontSize: 12 },
                startAdornment: (
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ mr: 0.5, color: "text.secondary" }}
                  />
                ),
              },
            }}
            sx={{ minWidth: 115, fontSize: 12 }}
          />
        ) : (
          <Typography sx={{ fontSize: 13, fontFamily: "monospace" }}>
            {row.startTime}
          </Typography>
        )}
      </TableCell>

      {/* End */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        {canEditThis ? (
          <TextField
            type="time"
            value={row.endTime}
            onChange={(e) => onUpdateRow(row.id, "endTime", e.target.value)}
            onBlur={() => onValidateRow(row.id)}
            size="small"
            error={!!err && err.includes("End")}
            helperText={!!err && err.includes("End") ? err : undefined}
            slotProps={{
              formHelperText: { sx: { fontSize: 10, whiteSpace: "nowrap" } },
              input: {
                sx: { fontSize: 12 },
                startAdornment: (
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ mr: 0.5, color: "text.secondary" }}
                  />
                ),
              },
            }}
            sx={{ minWidth: 115, fontSize: 12 }}
          />
        ) : (
          <Typography sx={{ fontSize: 13, fontFamily: "monospace" }}>
            {row.endTime}
          </Typography>
        )}
      </TableCell>

      {/* Location */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        {canEditThis ? (
          <Select
            value={row.location}
            onChange={(e) =>
              onUpdateRow(
                row.id,
                "location",
                e.target.value as "office" | "remotely",
              )
            }
            size="small"
            sx={{ minWidth: 110, fontSize: 12 }}
            renderValue={(v) => (
              <Chip
                label={v}
                size="small"
                sx={{
                  bgcolor:
                    LOCATION_STYLES[v as keyof typeof LOCATION_STYLES].bg,
                  color:
                    LOCATION_STYLES[v as keyof typeof LOCATION_STYLES].color,
                  fontWeight: 700,
                  fontSize: 10,
                  borderRadius: 10,
                  height: 22,
                }}
              />
            )}
          >
            <MenuItem value="office" sx={{ fontSize: 12 }}>
              <Chip
                label="office"
                size="small"
                sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontSize: 10 }}
              />
            </MenuItem>
            <MenuItem value="remotely" sx={{ fontSize: 12 }}>
              <Chip
                label="remotely"
                size="small"
                sx={{ bgcolor: "#FFF8E1", color: "#F57F17", fontSize: 10 }}
              />
            </MenuItem>
          </Select>
        ) : (
          <Chip
            label={row.location}
            size="small"
            sx={{
              bgcolor: LOCATION_STYLES[row.location].bg,
              color: LOCATION_STYLES[row.location].color,
              fontWeight: 700,
              fontSize: 10,
              borderRadius: 10,
              height: 22,
            }}
          />
        )}
      </TableCell>

      {/* Hours */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: 600,
            color: err ? "error.main" : "#1C2B4A",
          }}
        >
          {formatHours(hours)}
        </Typography>
      </TableCell>

      {/* Company Review */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Chip
            label={compStyle.label}
            size="small"
            sx={{
              bgcolor: compStyle.bg,
              color: compStyle.color,
              fontWeight: 700,
              fontSize: 10,
              borderRadius: 1,
              letterSpacing: 0.3,
            }}
          />
          {row.supervisorComment && (
            <Tooltip title={row.supervisorComment} arrow>
              <InfoIcon
                fontSize="small"
                sx={{ color: "text.secondary", fontSize: 16 }}
              />
            </Tooltip>
          )}
        </Box>
        {perms.canCompanyApprove &&
          row.companyStatus === "pending" &&
          ftState.status === "in_progress" && (
            <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => onCompanyApproveRow(row.id)}
                sx={{
                  textTransform: "none",
                  fontSize: 10,
                  py: 0.2,
                  px: 1,
                  minWidth: 0,
                  borderColor: "#2E7D32",
                  color: "#2E7D32",
                }}
              >
                Approve
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => onCompanyRejectRow(row.id)}
                sx={{
                  textTransform: "none",
                  fontSize: 10,
                  py: 0.2,
                  px: 1,
                  minWidth: 0,
                  borderColor: "#C62828",
                  color: "#C62828",
                }}
              >
                Reject
              </Button>
            </Box>
          )}
      </TableCell>

      {/* Status */}
      <TableCell sx={{ borderRight: "1px solid #e5e7eb", p: 1 }}>
        <Chip
          label={row.status === "approved" ? "Logged" : "Pending"}
          size="small"
          sx={{
            bgcolor: row.status === "approved" ? "#E3F2FD" : "#F5F5F5",
            color: row.status === "approved" ? "#1565C0" : "#666",
            fontWeight: 600,
            fontSize: 10,
          }}
        />
      </TableCell>

      {/* Actions */}
      <TableCell sx={{ p: 1 }}>
        {canEditThis && (
          <IconButton
            size="small"
            onClick={() => onDeleteRow(row.id)}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

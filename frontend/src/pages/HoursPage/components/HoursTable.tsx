import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { HoursEntry, TrainingType } from "../../../mock/hoursLog.ts";
import type { SingleTrainingState } from "../../../mock/studentTrainingState.ts";
import type { RolePermissions } from "../../../types/HoursPage.types.ts";
import HoursTableRow from "./HoursTableRow.tsx";

const COLUMNS = [
  "Day",
  "Date",
  "Start",
  "End",
  "Location",
  "Hours",
  "Company Review",
  "Status",
  "",
];

interface HoursTableProps {
  entries: HoursEntry[];
  activeFt: TrainingType;
  rowErrors: Record<number, string>;
  perms: RolePermissions;
  ftState: SingleTrainingState;
  isTableLocked: boolean;
  onUpdateRow: (id: number, field: keyof HoursEntry, value: string) => void;
  onValidateRow: (id: number) => void;
  onDeleteRow: (id: number) => void;
  onCompanyApproveRow: (id: number) => void;
  onCompanyRejectRow: (id: number) => void;
}

export default function HoursTable({
  entries,
  activeFt,
  rowErrors,
  perms,
  ftState,
  isTableLocked,
  onUpdateRow,
  onValidateRow,
  onDeleteRow,
  onCompanyApproveRow,
  onCompanyRejectRow,
}: HoursTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "none",
        background: "transparent",
        border: "none",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "background.paper" }}>
            {COLUMNS.map((h) => (
              <TableCell
                key={h}
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  fontSize: 12,
                  borderRight: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary">
                  No entries for {activeFt}.{" "}
                  {perms.canEditHours &&
                    !isTableLocked &&
                    "Click Add Row to start logging hours."}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            entries.map((row, idx) => (
              <HoursTableRow
                key={row.id}
                row={row}
                idx={idx}
                error={rowErrors[row.id]}
                perms={perms}
                ftState={ftState}
                isTableLocked={isTableLocked}
                onUpdateRow={onUpdateRow}
                onValidateRow={onValidateRow}
                onDeleteRow={onDeleteRow}
                onCompanyApproveRow={onCompanyApproveRow}
                onCompanyRejectRow={onCompanyRejectRow}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import { Box, Paper, Typography } from "@mui/material";
import { formatHours } from "../../../mock/hoursLog.ts";

interface StatsCardsProps {
  companyApproved: number;
  pending: number;
  rejected: number;
  requiredHours: number;
}

export default function StatsCards({
  companyApproved,
  pending,
  rejected,
  requiredHours,
}: StatsCardsProps) {
  const cardSx = {
    flex: 1,
    minWidth: 140,
    p: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Paper sx={cardSx}>
        <Typography variant="caption" color="text.secondary">
          Company Approved
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2E7D32" }}>
          {formatHours(companyApproved)}
        </Typography>
      </Paper>
      <Paper sx={cardSx}>
        <Typography variant="caption" color="text.secondary">
          Pending Review
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#F57F17" }}>
          {formatHours(pending)}
        </Typography>
      </Paper>
      <Paper sx={cardSx}>
        <Typography variant="caption" color="text.secondary">
          Rejected
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#C62828" }}>
          {formatHours(rejected)}
        </Typography>
      </Paper>
      <Paper sx={cardSx}>
        <Typography variant="caption" color="text.secondary">
          Required / Approved
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          {formatHours(companyApproved)}{" "}
          <Typography component="span" variant="caption" color="text.secondary">
            / {requiredHours}:00
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}

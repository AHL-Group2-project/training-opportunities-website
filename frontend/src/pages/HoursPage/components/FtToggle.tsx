import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LockIcon from "@mui/icons-material/Lock";
import type { TrainingType } from "../../../mock/hoursLog.ts";

interface FtToggleProps {
  activeFt: TrainingType;
  onChange: (dir: "prev" | "next") => void;
  isFt2Locked: boolean;
}

export default function FtToggle({
  activeFt,
  onChange,
  isFt2Locked,
}: FtToggleProps) {
  return (
    <Tooltip
      title={
        isFt2Locked && activeFt === "FT1" ? "Complete FT1 to unlock FT2" : ""
      }
      arrow
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "#f6f3ee",
          borderRadius: 2,
          p: 0.5,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onChange("prev")}
          disabled={activeFt === "FT1"}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box sx={{ px: 2, py: 0.5, minWidth: 60, textAlign: "center" }}>
          <Typography sx={{ fontWeight: 700, color: "#1C2B4A", fontSize: 15 }}>
            {activeFt}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => onChange("next")}
          disabled={activeFt === "FT2"}
          sx={{
            color:
              activeFt === "FT1" && isFt2Locked ? "text.disabled" : "inherit",
          }}
        >
          {activeFt === "FT1" && isFt2Locked ? (
            <LockIcon fontSize="small" />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
    </Tooltip>
  );
}

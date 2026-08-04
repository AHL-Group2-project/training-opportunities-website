import { Box, Typography } from "@mui/material";
import type { TrainingType } from "../../../mock/hoursLog.ts";
import type { StudentProfile } from "../../../mock/studentTrainingState.ts";
import FtToggle from "./FtToggle.tsx";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  activeFt: TrainingType;
  onFtChange: (dir: "prev" | "next") => void;
  isFt2Locked: boolean;
  studentProfile?: StudentProfile;
}

// NOTE: `subtitle` and `studentProfile` are accepted for API compatibility with
// the original component but are not rendered here — this matches the
// original HoursPage.tsx behavior exactly (the subtitle was never displayed).
export default function PageHeader({
  title,
  activeFt,
  onFtChange,
  isFt2Locked,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1C2B4A" }}>
          {title}
        </Typography>
      </Box>
      <FtToggle
        activeFt={activeFt}
        onChange={onFtChange}
        isFt2Locked={isFt2Locked}
      />
    </Box>
  );
}

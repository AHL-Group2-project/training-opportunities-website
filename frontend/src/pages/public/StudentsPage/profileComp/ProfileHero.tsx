import { Box } from "@mui/material";

export default function ProfileHero() {
  return (
    <Box
      sx={{
        height: 260,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, transparent 100%)`,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    />
  );
}

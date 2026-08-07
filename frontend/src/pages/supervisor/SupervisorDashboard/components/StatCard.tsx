import { Box, Card, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  iconColor: string;
  iconBackground: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBackground,
}: StatCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        p: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2.5,
          backgroundColor: iconBackground,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ fontSize: 28 }} />
      </Box>
    </Card>
  );
}

export default StatCard;

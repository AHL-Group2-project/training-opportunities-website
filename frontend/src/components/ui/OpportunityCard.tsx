import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Opportunity } from "../../types/opportunity.types";
import fallbackLogo from "../../assets/images/logo.png";
interface Props {
  opportunity: Opportunity;
}

function OpportunityCard({ opportunity }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 320,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
        transition: "transform .2s, box-shadow .2s",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Logo */}
      <CardMedia
        component="img"
        alt={opportunity.company}
        height="100"
        image={
          !opportunity.logo || opportunity.logo.includes("via.placeholder.com")
            ? fallbackLogo
            : opportunity.logo
        }
        onError={(event) => {
          event.currentTarget.src = fallbackLogo;
        }}
        sx={{ objectFit: "contain", p: 1.5, bgcolor: "transparent" }}
      />

      <CardContent sx={{ flexGrow: 1, py: 1.5, px: 2 }}>
        {" "}
        <Chip
          label={opportunity.type || opportunity.workMode}
          size="small"
          sx={{
            mb: 0.75,
            bgcolor: "rgba(74, 144, 217, 0.1)",
            color: "info.main",
            fontWeight: 500,
            height: 22,
            fontSize: "0.7rem",
          }}
        />
        {/* Title */}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.25,
          }}
        >
          {opportunity.title}
        </Typography>
        {/* Company Name */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: "0.8rem" }}
        >
          {opportunity.company}
        </Typography>
        {/* Skills */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mb: 1 }}>
          {opportunity.skills.slice(0, 3).map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"

              sx={{ fontSize: "0.7rem", height: 22 }}
            />
          ))}
          {opportunity.skills.length > 3 && (
            <Chip
              label={`+${opportunity.skills.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem", height: 22 }}
            />
          )}
        </Box>
        <Divider sx={{ my: 0.75 }} />
        {/* Meta Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "text.secondary",
            fontSize: "0.75rem",
            mt: 0.5,
          }}
        >
          <span>📍 {opportunity.location}</span>
          <span>🪑 {opportunity.seats}</span>
          <span>
            ⏳{" "}
            {opportunity.daysLeft === null
              ? "No deadline"
              : `${opportunity.daysLeft}d`}
          </span>{" "}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 1.5, pt: 0 }}>
        {" "}
        <Button
          size="small"
          onClick={() => navigate(`/opportunities/${opportunity.id}`)}
          sx={{ color: "info.main", fontWeight: 600, fontSize: "0.8rem" }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default OpportunityCard;

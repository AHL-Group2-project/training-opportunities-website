import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

interface CompanyCardProps {
  id: string;
  name: string;
  industry: string;
  logoUrl?: string;
  activeOpportunities: number;
  description: string;
  location: string;
}

function stringToColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 65%)`;
}

function stringToBackgroundColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 15%)`;
}

function CompanyCard({
  id,
  name,
  industry,
  logoUrl,
  activeOpportunities,
  description,
  location,
}: CompanyCardProps): import("react").JSX.Element {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        border: "1px solid",
        borderColor: "divider",
        height: 260,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
          borderColor: "primary.main",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/companies/${id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: "100%", p: 3 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            {logoUrl ? (
              <Box
                component="img"
                src={logoUrl}
                alt={name}
                sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "contain", border: "1px solid", borderColor: "divider" }}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: stringToBackgroundColor(name),
                  color: stringToColor(name),
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                {initials}
              </Avatar>
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
                {name}
              </Typography>
              <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                {industry}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.6,
            }}
          >
            {description || "No description provided."}
          </Typography>

          <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-start" }}>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: "center", color: "text.secondary" }}
            >
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {location || "Location not specified"}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CompanyCard;

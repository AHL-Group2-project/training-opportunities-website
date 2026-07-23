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
  id: number;
  name: string;
  industry: string;
  logo?: string;
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
  return `hsl(${hue}, 70%, 45%)`;
}

function stringToBackgroundColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 92%)`;
}

function CompanyCard({
  id,
  name,
  industry,
  logo,
  activeOpportunities,
  description,
  location,
}: CompanyCardProps): import("react").JSX.Element {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        boxShadow: 4,
        height: 280,
        display: "flex",
        flexDirection: "column",
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
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
            {logo ? (
              <Box
                component="img"
                src={logo}
                alt={name}
                sx={{ width: 48, height: 48, borderRadius: "50%" }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: stringToBackgroundColor(name),
                  color: stringToColor(name),
                  fontWeight: "bold",
                }}
              >
                {initials}
              </Avatar>
            )}
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {industry}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center" }}
              >
                <LocationOnOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2">{location}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center" }}
              >
                <WorkOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2">{activeOpportunities}</Typography>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CompanyCard;

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import uwaveLogo from "../../../assets/images/companies/uwave.png";
import asalLogo from "../../../assets/images/companies/asal.png";
import jawwalLogo from "../../../assets/images/companies/Jawwal.png";
import foothillLogo from "../../../assets/images/companies/foothill.png";

// Static data — replace later with data from API
const OPPORTUNITIES = [
  {
    id: 1,
    title: "Frontend Intern",
    type: "Full-time",
    company: "uWave",
    logo: uwaveLogo,
    link: "/opportunities/1",
  },
  {
    id: 2,
    title: "Data Analytics Intern",
    type: "Remote",
    company: "ASAL Technologies",
    logo: asalLogo,
    link: "/opportunities/2",
  },
  {
    id: 3,
    title: "Mobile App Intern",
    type: "Hybrid",
    company: "Jawwal",
    logo: jawwalLogo,
    link: "/opportunities/3",
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    type: "Full-time",
    company: "Foothill",
    logo: foothillLogo,
    link: "/opportunities/4",
  },
];

export default function FeaturedOpportunities({
  opportunities = OPPORTUNITIES,
}) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "grey.100",
        overflow: "hidden",
      }}
    >
      {" "}
      <Box sx={{ py: 8, px: 4, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Featured Opportunities
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {opportunities.map((opp) => (
            <Card
              key={opp.id}
              sx={{
                width: "100%",
                transition: "transform .2s, box-shadow .2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                alt={opp.company}
                height="140"
                image={opp.logo}
                sx={{ objectFit: "contain", p: 2, bgcolor: "#fff" }}
              />
              <CardContent>
                <Chip label={opp.type} size="small" sx={{ mb: 1 }} />
                <Typography gutterBottom variant="h6" component="div">
                  {opp.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {opp.company}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={opp.link}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

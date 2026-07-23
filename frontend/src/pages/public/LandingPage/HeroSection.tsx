import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";

import aauj from "../../../assets/images/university/aauj.png";
import bethlehem from "../../../assets/images/university/bethlehem.png";
import bzu from "../../../assets/images/university/bzu.png";
import hebron from "../../../assets/images/university/hebron.png";
import najah from "../../../assets/images/university/najah.webp";
import ppu from "../../../assets/images/university/ppu.png";
import ptuk from "../../../assets/images/university/ptuk.webp";
import quds from "../../../assets/images/university/quds.png";
import zust from "../../../assets/images/university/zust.png";

const orbitIcons = [
  [{ img: ppu }, { img: bethlehem }, { img: aauj }],
  [
    { img: bzu },
    { img: ptuk },
    { img: hebron },
    { img: najah },
    { img: quds },
    { img: zust },
  ],
];

const orbitSizes = [200, 330];
const orbitSpeeds = [14, 22];
const ORBIT_BASE = 400;

// Component for rendering an orbit ring with university logos
function OrbitRing({
  size,
  speed,
  icons,
}: {
  size: number;
  speed: number;
  icons: { img?: string; Icon?: React.ElementType; color?: string }[];
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1.5px dashed rgba(74,144,217,0.25)",
        animation: `spin ${speed}s linear infinite`,
        "@keyframes spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      }}
    >
      {icons.map((item, i) => {
        const angle = (360 / icons.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 50 * Math.cos(rad);
        const y = 50 + 50 * Math.sin(rad);

        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              animation: `counter-spin ${speed}s linear infinite`,
              "@keyframes counter-spin": {
                from: { transform: "translate(-50%, -50%) rotate(0deg)" },
                to: { transform: "translate(-50%, -50%) rotate(-360deg)" },
              },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                p: 0.5,
              }}
            >
              {item.img ? (
                <Box
                  component="img"
                  src={item.img}
                  alt="university logo"
                  sx={{ width: 32, height: 32, objectFit: "contain" }}
                />
              ) : (
                item.Icon && (
                  <item.Icon sx={{ fontSize: 20, color: item.color }} />
                )
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={4}
          sx={{
            maxWidth: { xs: "100%", md: 480 },
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
            mx: { xs: "auto", md: 0 },
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.2rem", md: "2.8rem" },
                lineHeight: 1.2,
                color: "#1C2B4A",
              }}
            >
              Find Your{" "}
              <Box component="span" sx={{ color: "#4A90D9" }}>
                Internship
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Connect with companies, track your training progress, and improve
              your skills — all in one place.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/opportunities")}
              sx={{
                bgcolor: "#1C2B4A",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": { bgcolor: "#2a3f6b" },
              }}
            >
              Browse Opportunities
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: "#1C2B4A",
                color: "#1C2B4A",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#f0f4fa",
                  borderColor: "#1C2B4A",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          top: { md: "50%" },
          right: { xs: "auto", md: "10%", lg: "14%" },
          transform: {
            xs: "none",
            md: "translateY(-50%) scale(0.8)",
            lg: "translateY(-50%) scale(0.95)",
          },
          transformOrigin: "center right",
          width: ORBIT_BASE,
          height: ORBIT_BASE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mx: { xs: "auto", md: 0 },
          mt: { xs: 6, md: 0 },
          maxWidth: "100%",
        }}
      >
        {orbitIcons.map((icons, i) => (
          <OrbitRing
            key={i}
            size={orbitSizes[i]}
            speed={orbitSpeeds[i]}
            icons={icons}
          />
        ))}

        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "#1C2B4A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(28,43,74,0.3)",
            zIndex: 1,
          }}
        >
          <SchoolIcon sx={{ color: "white", fontSize: 32 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;

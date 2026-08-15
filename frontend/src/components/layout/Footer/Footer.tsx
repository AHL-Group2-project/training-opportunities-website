import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import logo from "../../../assets/images/logo.png";
import ahlLogo from "../../../assets/images/ahl.png";

const teamMembers = [
  "Ahmad Joba",
  "Jana Murrar",
  "Dina Albadarin",
  "Ameed Sharif",
];

const mentors = ["Maher Salamin", "Maysaa Alhaj", "Mohammad Khallaf"];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(15, 23, 42, 0.85)", // Match navbar exactly
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        color: "#94A3B8",
        py: 4,
        mt: "auto",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={1.25}
                sx={{ alignItems: "center" }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Internship Hub logo"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <Stack spacing={0}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#fff" }}
                  >
                    Internship Hub
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    Training opportunities platform
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 320,
                }}
              >
                A platform connecting students, companies, and supervisors to
                streamline the internship process.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={0.75}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#fff" }}
              >
                Team Members
              </Typography>

              <Stack spacing={0.3}>
                {teamMembers.map((name) => (
                  <Typography
                    key={name}
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {name}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={0.75}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#fff" }}
              >
                Mentors
              </Typography>

              <Stack spacing={0.3}>
                {mentors.map((name) => (
                  <Typography
                    key={name}
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {name}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Stack
              spacing={0.75}
              sx={{
                height: "100%",
                alignItems: { xs: "flex-start", md: "flex-end" },
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                Developed during training at
              </Typography>

              <Link
                href="https://ahllogics.com/"
                target="_blank"
                rel="noreferrer"
                underline="none"
              >
                <Box
                  component="img"
                  src={ahlLogo}
                  alt="AHL Logics"
                  sx={{
                    height: 42,
                    objectFit: "contain",
                    transition: "transform .2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 1.5,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.62)",
          }}
        >
          © 2026 Internship Hub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

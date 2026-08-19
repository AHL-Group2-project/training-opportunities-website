import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";

import asal from "../../../assets/images/companies/asal.png";
import foothill from "../../../assets/images/companies/foothill.png";
import jawwal from "../../../assets/images/companies/Jawwal.png";
import oredo from "../../../assets/images/companies/oredo.png";
import ahl from "../../../assets/images/companies/ahl.png";
import sada from "../../../assets/images/companies/sada.png";
import tap from "../../../assets/images/companies/tap.png";
import aliasoft from "../../../assets/images/companies/aliasoft.png";
import iztech from "../../../assets/images/companies/iztech.png";
import cotede from "../../../assets/images/companies/cotede.png";
import trust from "../../../assets/images/companies/trust.png";
import uwave from "../../../assets/images/companies/uwave.png";
import olivery from "../../../assets/images/companies/olivery.png";
import hebron from "../../../assets/images/companies/hebron.png";
import halhul from "../../../assets/images/companies/halhul.png";
import ramallah from "../../../assets/images/companies/ramallah.png";
import hadara from "../../../assets/images/companies/hadara.png";

const companies = [
  { id: 1, name: "ASAL", logo: asal },
  { id: 2, name: "Foothill", logo: foothill },
  { id: 3, name: "AHL", logo: ahl },
  { id: 4, name: "Jawwal", logo: jawwal },
  { id: 5, name: "Oredo", logo: oredo },
  { id: 6, name: "Aliasoft", logo: aliasoft },
  { id: 7, name: "Sada", logo: sada },
  { id: 8, name: "TAP", logo: tap },
  { id: 9, name: "Iztech", logo: iztech },
  { id: 10, name: "Cote de", logo: cotede },
  { id: 11, name: "Trust", logo: trust },
  { id: 12, name: "Uwave", logo: uwave },
  { id: 13, name: "Olivery", logo: olivery },
  { id: 14, name: "Hebron municipality", logo: hebron },
  { id: 15, name: "Halhul municipality", logo: halhul },
  { id: 16, name: "Ramallah municipality", logo: ramallah },
  { id: 17, name: "Hadara", logo: hadara },
];

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: number;
}

function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  gap = 6,
}: MarqueeProps) {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          gap,
          animation: `marquee ${speed}s linear infinite`,
          "@keyframes marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
          ...(pauseOnHover && {
            "&:hover": { animationPlayState: "paused" },
          }),
        }}
      >
        {children}
        {children}
      </Box>
    </Box>
  );
}

function CompaniesStrip() {
  return (
    <Box
      sx={{
        py: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
            letterSpacing: 2,
            mb: 3,
          }}
        >
          WHERE STUDENTS INTERN{" "}
        </Typography>
      </Container>

      <Marquee speed={30} pauseOnHover gap={6}>
        {companies.map((company) => (
          <Box
            key={company.id}
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
            }}
          >
            <Box
              component="img"
              src={company.logo}
              alt={company.name}
              sx={{
                height: 36,
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}

export default CompaniesStrip;

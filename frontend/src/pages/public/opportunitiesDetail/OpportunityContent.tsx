import { Box, Card, Chip, Typography } from "@mui/material";

import type { Opportunity } from "../OpportunitiesPage/opportunity.types";

type OpportunityContentProps = {
  opportunity: Opportunity;
};

function OpportunityContent({ opportunity }: OpportunityContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* وصف الفرصة - أزرق فاتح */}
      <Card
        variant="outlined"
        sx={{
          p: {
            xs: 2.5,
            md: 3.5,
          },
          borderRadius: 3,
          backgroundColor: "#EFF6FF",
          backgroundImage: "none",
          borderColor: "#BFDBFE",
          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.06)",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            color: "#1E3A8A",
            fontWeight: 700,
          }}
        >
          About this opportunity
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          {opportunity.description}
        </Typography>
      </Card>

      {/* المسؤوليات - أخضر فاتح */}
      <Card
        variant="outlined"
        sx={{
          p: {
            xs: 2.5,
            md: 3.5,
          },
          borderRadius: 3,
          backgroundColor: "#ECFDF5",
          backgroundImage: "none",
          borderColor: "#A7F3D0",
          boxShadow: "0 4px 14px rgba(5, 150, 105, 0.06)",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            color: "#065F46",
            fontWeight: 700,
          }}
        >
          Responsibilities
        </Typography>

        <Box
          component="ul"
          sx={{
            mt: 2,
            mb: 0,
            pl: 3,
          }}
        >
          {opportunity.responsibilities.map((responsibility) => (
            <Typography
              component="li"
              key={responsibility}
              sx={{
                mb: 1.25,
                color: "#475569",
                lineHeight: 1.6,

                "&::marker": {
                  color: "#059669",
                },
              }}
            >
              {responsibility}
            </Typography>
          ))}
        </Box>
      </Card>

      {/* المتطلبات - برتقالي فاتح */}
      <Card
        variant="outlined"
        sx={{
          p: {
            xs: 2.5,
            md: 3.5,
          },
          borderRadius: 3,
          backgroundColor: "#FFF7ED",
          backgroundImage: "none",
          borderColor: "#FED7AA",
          boxShadow: "0 4px 14px rgba(234, 88, 12, 0.06)",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            color: "#9A3412",
            fontWeight: 700,
          }}
        >
          Requirements
        </Typography>

        <Box
          component="ul"
          sx={{
            mt: 2,
            mb: 0,
            pl: 3,
          }}
        >
          {opportunity.requirements.map((requirement) => (
            <Typography
              component="li"
              key={requirement}
              sx={{
                mb: 1.25,
                color: "#475569",
                lineHeight: 1.6,

                "&::marker": {
                  color: "#EA580C",
                },
              }}
            >
              {requirement}
            </Typography>
          ))}
        </Box>
      </Card>

      {/* المهارات - بنفسجي فاتح */}
      <Card
        variant="outlined"
        sx={{
          p: {
            xs: 2.5,
            md: 3.5,
          },
          borderRadius: 3,
          backgroundColor: "#F5F3FF",
          backgroundImage: "none",
          borderColor: "#DDD6FE",
          boxShadow: "0 4px 14px rgba(109, 40, 217, 0.06)",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            color: "#5B21B6",
            fontWeight: 700,
          }}
        >
          Required skills
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 2,
          }}
        >
          {opportunity.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#5B21B6",
                border: "1px solid #C4B5FD",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Card>
    </Box>
  );
}

export default OpportunityContent;

import { Box, Card, Chip, Typography } from "@mui/material";
import type { Opportunity } from "../../../types/opportunity.types";
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
      {/* About this opportunity */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          borderLeft: "4px solid #3B82F6",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "#3B82F6", fontWeight: 700 }}
        >
          About this opportunity
        </Typography>
        <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>
          {opportunity.description}
        </Typography>
      </Card>

      {/* Responsibilities */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          borderLeft: "4px solid #10B981",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "#10B981", fontWeight: 700 }}
        >
          Responsibilities
        </Typography>
        <Box component="ul" sx={{ mt: 2, mb: 0, pl: 3 }}>
          {opportunity.responsibilities?.map((responsibility) => (
            <Typography
              component="li"
              key={responsibility}
              sx={{
                mb: 1.25,
                color: "text.secondary",
                lineHeight: 1.6,
                "&::marker": { color: "#10B981" },
              }}
            >
              {responsibility}
            </Typography>
          ))}
        </Box>
      </Card>

      {/* Requirements */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          borderLeft: "4px solid #F59E0B",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "#F59E0B", fontWeight: 700 }}
        >
          Requirements
        </Typography>
        <Box component="ul" sx={{ mt: 2, mb: 0, pl: 3 }}>
          {opportunity.requirements?.map((requirement) => (
            <Typography
              component="li"
              key={requirement}
              sx={{
                mb: 1.25,
                color: "text.secondary",
                lineHeight: 1.6,
                "&::marker": { color: "#F59E0B" },
              }}
            >
              {requirement}
            </Typography>
          ))}
        </Box>
      </Card>

      {/* Skills */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          borderLeft: "4px solid #A855F7",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "#A855F7", fontWeight: 700 }}
        >
          Required skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {opportunity.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                backgroundColor: "rgba(168, 85, 247, 0.15)",
                color: "#C084FC",
                fontWeight: 600,
                border: "1px solid rgba(168, 85, 247, 0.3)",
              }}
            />
          ))}
        </Box>
      </Card>
    </Box>
  );
}

export default OpportunityContent;

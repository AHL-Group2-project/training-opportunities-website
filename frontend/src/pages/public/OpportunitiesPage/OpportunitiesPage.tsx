import { useState } from "react";
import { Box, Typography } from "@mui/material";

import OpportunitiesHeader from "./OpportunitiesHeader";
import OpportunityFilters from "./OpportunityFilters";
import OpportunityCard from "./OpportunityCard";

import type { TrainingType } from "./OpportunityFilters";
import { opportunitiesMock } from "./mock";

function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [field, setField] = useState("all");

  const [trainingType, setTrainingType] =
    useState<TrainingType>("all");

  return (
    <Box
      sx={{
        maxWidth: "1520px",
        mx: "auto",
        px: {
          xs: 1,
          sm: 2,
        },
        pb: 6,
      }}
    >
      <OpportunitiesHeader />

      <Box sx={{ mt: 4 }}>
        <OpportunityFilters
          searchTerm={searchTerm}
          department={department}
          field={field}
          trainingType={trainingType}
          onSearchChange={setSearchTerm}
          onDepartmentChange={setDepartment}
          onFieldChange={setField}
          onTrainingTypeChange={setTrainingType}
        />
      </Box>

      <Typography
        sx={{
          mt: 3,
          mb: 2,
          color: "text.secondary",
        }}
      >
        {opportunitiesMock.length} results
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {opportunitiesMock.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}
      </Box>
    </Box>
  );
}

export default OpportunitiesPage;
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import OpportunitiesHeader from "./OpportunitiesHeader";
import OpportunityFilters from "./OpportunityFilters";
import OpportunityCard from "../../../components/ui/OpportunityCard";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";

function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [field, setField] = useState("all");

  // TODO: Replace with API call
  // useEffect(() => {
  //   api.get("/opportunities").then(res => setOpportunities(res.data));
  // }, []);

  const [opportunities] = useState(MOCK_OPPORTUNITIES);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <OpportunitiesHeader />

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <OpportunityFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          department={department}
          onDepartmentChange={setDepartment}
          field={field}
          onFieldChange={setField}
        />
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {opportunities.length} results
      </Typography>

      {/* Cards grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </Box>
    </Box>
  );
}

export default OpportunitiesPage;

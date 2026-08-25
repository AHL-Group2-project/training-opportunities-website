import { useEffect, useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import OpportunitiesHeader from "./OpportunitiesHeader";
import OpportunityFilters from "./OpportunityFilters";
import OpportunityCard from "../../../components/ui/OpportunityCard";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";

function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [field, setField] = useState("all");

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Opportunity[]>("/opportunities");

        if (isMounted) {
          setOpportunities(response.data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load opportunities. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunities();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        normalizedSearch === "" ||
        opportunity.title.toLowerCase().includes(normalizedSearch) ||
        opportunity.company.toLowerCase().includes(normalizedSearch) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        );

      const normalizedDepartment = (opportunity.department ?? "")
        .toLowerCase()
        .replaceAll("-", " ");

      const selectedDepartment = department.toLowerCase().replaceAll("-", " ");

      const matchesDepartment =
        department === "all" ||
        normalizedDepartment.includes(selectedDepartment);

      const normalizedField = (opportunity.field ?? "").toLowerCase();

      const matchesField =
        field === "all" || normalizedField.includes(field.toLowerCase());

      return matchesSearch && matchesDepartment && matchesField;
    });
  }, [opportunities, searchTerm, department, field]);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <OpportunitiesHeader />

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

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filteredOpportunities.length} results
          </Typography>

          {filteredOpportunities.length === 0 ? (
            <Alert severity="info">
              No opportunities match the selected filters.
            </Alert>
          ) : (
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
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default OpportunitiesPage;

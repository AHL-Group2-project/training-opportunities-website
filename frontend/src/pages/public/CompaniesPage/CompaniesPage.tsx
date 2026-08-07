import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyCard from "./CompanyCard";
import { mockCompanies } from "../../../mock/Companies";

function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");

  const industries = useMemo(
    () => Array.from(new Set(mockCompanies.map((c) => c.industry))),
    [],
  );
  const locations = useMemo(
    () => Array.from(new Set(mockCompanies.map((c) => c.location))),
    [],
  );

  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((c) => {
      const matchesSearch = c.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesIndustry = industry === "all" || c.industry === industry;
      const matchesLocation = location === "all" || c.location === location;
      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [search, industry, location]);

  const hasActiveFilters =
    search.trim() !== "" || industry !== "all" || location !== "all";

  return (
    <Box>
      <Box
        sx={{
          py: 8,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          mt: "-24px",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Companies
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {mockCompanies.length} companies hosting interns this year.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 1 }}
        >
          <TextField
            fullWidth
            placeholder="Search companies by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }}>
            <InputLabel id="industry-filter-label">Industry</InputLabel>
            <Select
              labelId="industry-filter-label"
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <MenuItem value="all">All industries</MenuItem>
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>
                  {ind}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }}>
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="all">All locations</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {hasActiveFilters && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <Typography variant="body2" color="text.secondary">
              {filteredCompanies.length} result
              {filteredCompanies.length !== 1 ? "s" : ""}
            </Typography>
            {search.trim() !== "" && (
              <Chip
                size="small"
                label={`Search: ${search}`}
                onDelete={() => setSearch("")}
              />
            )}
            {industry !== "all" && (
              <Chip
                size="small"
                label={industry}
                onDelete={() => setIndustry("all")}
              />
            )}
            {location !== "all" && (
              <Chip
                size="small"
                label={location}
                onDelete={() => setLocation("all")}
              />
            )}
          </Stack>
        )}
      </Container>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {filteredCompanies.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No companies match your search.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredCompanies.map((company) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={company.id}>
                <CompanyCard
                  id={company.id}
                  name={company.name}
                  industry={company.industry}
                  activeOpportunities={company.activeOpportunities}
                  description={company.description}
                  location={company.location}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CompaniesPage;

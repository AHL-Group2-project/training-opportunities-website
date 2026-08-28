import { useMemo, useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyCard from "./CompanyCard";
import api from "../../../lib/axios";

export interface CompanyProfile {
  _id?: string;
  userId: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  logoUrl?: string;
}

function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get<CompanyProfile[]>("/companies/public");
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch public companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const industries = useMemo(
    () => Array.from(new Set(companies.map((c) => c.industry).filter(Boolean))),
    [companies],
  );
  const locations = useMemo(
    () => Array.from(new Set(companies.map((c) => c.location).filter(Boolean))),
    [companies],
  );

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const nameMatch = c.name ? c.name.toLowerCase().includes(search.trim().toLowerCase()) : false;
      const matchesSearch = search.trim() === "" || nameMatch;
      const matchesIndustry = industry === "all" || c.industry === industry;
      const matchesLocation = location === "all" || c.location === location;
      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [search, industry, location, companies]);

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
            {companies.length} verified companies hosting interns this year.
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredCompanies.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No companies match your search.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredCompanies.map((company) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={company._id || company.userId}>
                <CompanyCard
                  id={company.userId}
                  name={company.name}
                  industry={company.industry}
                  activeOpportunities={0}
                  description={company.description}
                  location={company.location}
                  logoUrl={company.logoUrl}
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

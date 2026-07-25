import { Box, Typography, Grid, Container } from "@mui/material";
import CompanyCard from "./CompanyCard";
import { mockCompanies } from "../../../mock/Companies";

function CompaniesPage() {
  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2}>
          {mockCompanies.map((company) => (
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
      </Container>
    </Box>
  );
}

export default CompaniesPage;

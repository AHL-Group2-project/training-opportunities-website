import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 3 }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/opportunities")}
            >
              Browse Opportunities
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/training/hours")}
            >
              Log Hours
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/training/reports")}
            >
              Reports
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
  <Button
    fullWidth
    variant="contained"
    onClick={() => navigate("/companies")}
  >
    Browse Companies
  </Button>
</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
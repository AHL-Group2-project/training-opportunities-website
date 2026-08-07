import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth

              size="large"
              startIcon={<SearchOutlinedIcon />}
              onClick={() => navigate("/opportunities")}
              sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderStyle: "dashed",
              }}
            >
              <Box component="span" sx={{ fontSize: "0.9rem" }}>
                Opportunities
              </Box>
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={() => navigate("/training/hours")}
              sx={{ py: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Box component="span" sx={{ fontSize: "0.9rem" }}>
                Log Hours
              </Box>
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<AssessmentOutlinedIcon />}
              onClick={() => navigate("/training/reports")}
              sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderStyle: "dashed",
              }}
            >
              <Box component="span" sx={{ fontSize: "0.9rem" }}>
                Reports
              </Box>
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<BusinessOutlinedIcon />}
              onClick={() => navigate("/companies")}
              sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderStyle: "dashed",
              }}
            >
              <Box component="span" sx={{ fontSize: "0.9rem" }}>
                Companies
              </Box>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

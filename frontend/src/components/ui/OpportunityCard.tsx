import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Opportunity } from "../../mock/opportunities";

interface Props {
  opportunity: Opportunity;
}

function OpportunityCard({ opportunity }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "none",
        transition: "transform .2s, box-shadow .2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        alt={opportunity.company}
        height="140"
        image={opportunity.logo}
        sx={{ objectFit: "contain", p: 2, bgcolor: "white" }}
      />
      <CardContent>
        <Chip label={opportunity.type} size="small" sx={{ mb: 1 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "#1C2B4A" }}
        >
          {opportunity.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {opportunity.company}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/opportunities/${opportunity.id}`)}
          sx={{ color: "#4A90D9", fontWeight: 600 }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default OpportunityCard;

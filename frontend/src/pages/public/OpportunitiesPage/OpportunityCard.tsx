import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

import type { Opportunity } from "./opportunity.types";
import { Link } from "react-router-dom";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const companyInitials = opportunity.company.slice(0, 2).toUpperCase();

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        p: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFD",
        borderColor: "#D8E0EC",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {/* الجزء العلوي */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 54,
              height: 54,
              fontWeight: 700,
            }}
          >
            {companyInitials}
          </Avatar>

          <Box>
            <Typography color="text.secondary">
              {opportunity.company}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              {opportunity.title}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* المهارات */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mt: 3,
        }}
      >
        {opportunity.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            sx={{
              bgcolor: "grey.100",
            }}
          />
        ))}
      </Box>

      {/* معلومات الفرصة */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 3,
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">
          Location: {opportunity.location}
        </Typography>

        <Typography variant="body2">{opportunity.seats} seats</Typography>

        <Typography variant="body2">{opportunity.daysLeft}d left</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* أسفل البطاقة */}
      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          component={Link}
          to={`/opportunities/${opportunity.id}`}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View & Apply
        </Button>
      </Box>
    </Card>
  );
}

export default OpportunityCard;

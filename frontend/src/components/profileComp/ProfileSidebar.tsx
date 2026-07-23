import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function ProfileSidebar({ student }: Props) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "primary.main",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          {student.initials}
        </Avatar>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h5">{student.name}</Typography>

          <Typography sx={{ color: "text.secondary" }}>
            {student.major}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {student.year}
          </Typography>
        </Box>

        <Button fullWidth variant="contained">
          Download Resume
        </Button>

        <Divider flexItem />

        <Typography sx={{ color: "text.secondary" }}>
          {student.location}
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          {student.availableFor}
        </Typography>
      </Stack>
    </Card>
  );
}

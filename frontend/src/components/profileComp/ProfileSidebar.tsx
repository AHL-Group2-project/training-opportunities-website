import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function ProfileSidebar({ student }: Props) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        position: "sticky",
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

        <Stack spacing={1.5} sx={{ width: "100%" }}>
          {(student.graduationYear || student.year) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Class of {student.graduationYear || student.year}
              </Typography>
            </Box>
          )}

          {student.contactEmail && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {student.contactEmail}
              </Typography>
            </Box>
          )}

          {student.phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {student.phone}
              </Typography>
            </Box>
          )}
        </Stack>

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

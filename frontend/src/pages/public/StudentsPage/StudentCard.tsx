import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import type { Student } from "../../../types/student.types";

type Props = {
  student: Student;
};

export default function StudentCard({ student }: Props) {
  return (
<Card
  sx={{
    width: "100%",
    height: 330,
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    p: 1.5,
  }}
>
    
      <CardContent
  sx={{
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "&:last-child": {
      pb: 1.5,
    },
  }}
>
  <Avatar
    sx={{
      width: 56,
      height: 56,
      fontSize: 20,
      mb: 1.5,
      bgcolor: "primary.main",
      fontWeight: 700,
      mx: "auto",
    }}
  >
    {student.initials}
  </Avatar>

  <Typography variant="h6" sx={{ fontWeight: 700 }}>
    {student.name}
  </Typography>

  <Typography
    variant="caption"
    color="text.secondary"
    sx={{
      mb: 1.5,
      fontSize: 13,
    }}
  >
    {student.major}
  </Typography>

  <Stack
  direction="row"
  spacing={1}
  sx={{
    justifyContent: "center",
    flexWrap: "wrap",
    mb: 2,
    height: 55,
    overflow: "hidden",
  }}
>
    {student.skills.map((skill) => (
      <Chip
        key={skill}
        label={skill}
        size="small"
      />
    ))}
  </Stack>

  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 1,
      mb: 2,
    }}
  >
    <Chip
      label={student.ft1 ? "FT1 ✓" : "FT1 ✕"}
      color={student.ft1 ? "success" : "default"}
      size="small"
      sx={{
        fontSize: 11,
        height: 24,
      }}
    />

    <Chip
      label={student.ft2 ? "FT2 ✓" : "FT2 ✕"}
      color={student.ft2 ? "success" : "default"}
      size="small"
    />
  </Box>

<Button
  variant="contained"
  fullWidth
  sx={{
    mt: "auto",
  }}
>
  View Profile
</Button>
</CardContent>
    </Card>
  );
}
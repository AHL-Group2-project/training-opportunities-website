import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function CertificatesCard({ student }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Certificates
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {student.certificates.map((certificate) => (
            <Chip key={certificate} label={certificate} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

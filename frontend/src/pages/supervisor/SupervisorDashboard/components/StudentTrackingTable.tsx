import {
  Avatar,
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

type InternshipStatus = "Active" | "Completed" | "Pending";

interface Student {
  id: number;
  name: string;
  email: string;
  company: string;
  trainingType: "FT1" | "FT2";
  progress: number;
  status: InternshipStatus;
}

const students: Student[] = [
  {
    id: 1,
    name: "Lina Ahmad",
    email: "lina.ahmad@example.com",
    company: "Exalt Technologies",
    trainingType: "FT2",
    progress: 75,
    status: "Active",
  },
  {
    id: 2,
    name: "Omar Khalil",
    email: "omar.khalil@example.com",
    company: "ASAL Technologies",
    trainingType: "FT2",
    progress: 100,
    status: "Completed",
  },
  {
    id: 3,
    name: "Sara Ali",
    email: "sara.ali@example.com",
    company: "Hulul Group",
    trainingType: "FT1",
    progress: 40,
    status: "Active",
  },
  {
    id: 4,
    name: "Yousef Nasser",
    email: "yousef.nasser@example.com",
    company: "Palestine Techno Park",
    trainingType: "FT1",
    progress: 0,
    status: "Pending",
  },
];

const statusStyles = {
  Active: {
    color: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
  },
  Completed: {
    color: "#10B981",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
  },
  Pending: {
    color: "#F59E0B",
    backgroundColor: "rgba(245, 158, 11, 0.15)",
  },
};

function StudentTrackingTable() {
  return (
    <Card
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Student Tracking
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            Monitor students and their internship progress.
          </Typography>
        </Box>

        <Button
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          View All Students
        </Button>
      </Box>

      {/* Table */}
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Training Type</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => {
              const studentInitials = student.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2);

              return (
                <TableRow
                  key={student.id}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "rgba(168, 85, 247, 0.15)",
                          color: "#C084FC",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {studentInitials}
                      </Avatar>

                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {student.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                          }}
                        >
                          {student.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{student.company}</Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={student.trainingType}
                      size="small"
                      sx={{
                        color: "#C084FC",
                        backgroundColor: "rgba(168, 85, 247, 0.15)",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: 140,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          height: 7,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${student.progress}%`,
                            height: "100%",
                            backgroundColor:
                              student.progress === 100 ? "#10B981" : "#A855F7",
                            borderRadius: 10,
                          }}
                        />
                      </Box>

                      <Typography
                        variant="caption"
                        sx={{
                          minWidth: 32,
                          color: "text.secondary",
                          fontWeight: 600,
                        }}
                      >
                        {student.progress}%
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={student.status}
                      size="small"
                      sx={{
                        color: statusStyles[student.status].color,
                        backgroundColor:
                          statusStyles[student.status].backgroundColor,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<VisibilityOutlinedIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default StudentTrackingTable;

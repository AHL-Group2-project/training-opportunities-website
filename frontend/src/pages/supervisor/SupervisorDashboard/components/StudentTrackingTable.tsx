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
    color: "#1976D2",
    backgroundColor: "#EAF3FF",
  },
  Completed: {
    color: "#258354",
    backgroundColor: "#E7F7EF",
  },
  Pending: {
    color: "#C77700",
    backgroundColor: "#FFF4DF",
  },
};

function StudentTrackingTable() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* عنوان الجدول */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "grey.200",
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
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          View All Students
        </Button>
      </Box>

      {/* الجدول */}
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#FAFAFC",
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Training Type
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Progress</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Action
              </TableCell>
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
                  {/* الطالب */}
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
                          backgroundColor: "#EEE8FF",
                          color: "#6D4CCB",
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

                  {/* الشركة */}
                  <TableCell>
                    <Typography variant="body2">
                      {student.company}
                    </Typography>
                  </TableCell>

                  {/* نوع التدريب */}
                  <TableCell>
                    <Chip
                      label={student.trainingType}
                      size="small"
                      sx={{
                        color: "#6D4CCB",
                        backgroundColor: "#F0EBFF",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* نسبة التقدم */}
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
                          backgroundColor: "#ECECF1",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${student.progress}%`,
                            height: "100%",
                            backgroundColor:
                              student.progress === 100
                                ? "#2E9D65"
                                : "#6D4CCB",
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

                  {/* الحالة */}
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

                  {/* زر العرض */}
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
    </Box>
  );
}

export default StudentTrackingTable;
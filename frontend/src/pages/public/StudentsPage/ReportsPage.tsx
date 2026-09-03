import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Collapse,
  IconButton,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
export interface Report {
  _id: string;
  period: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  status: "pending" | "reviewed" | "rejected";
  supervisorFeedback?: string;
  createdAt: string;
}

const statusColors: Record<string, "success" | "warning" | "default"> = {
  reviewed: "success",
  rejected: "warning",
  pending: "default",
};

type PeriodType = "Week" | "Month";

export default function ReportsPage() {
  const [history, setHistory] = useState<Report[]>([]);
  const [periodType, setPeriodType] = useState<PeriodType>("Month");
  const [periodLabel, setPeriodLabel] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/students/me/reports");
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodTypeChange = (event: SelectChangeEvent) => {
    setPeriodType(event.target.value as PeriodType);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!periodLabel.trim() || !content.trim()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("period", periodLabel.trim());
      formData.append("content", content.trim());
      if (file) {
        formData.append("file", file);
      }

      const { data } = await api.post("/students/me/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setHistory((prev) => [data, ...prev]);
      setPeriodLabel("");
      setContent("");
      setFile(null);
    } catch (err) {
      console.error("Failed to submit report", err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Internship Reports
      </Typography>

      {/* Submit Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Submit a Report
        </Typography>

        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="period-type-label">Period</InputLabel>
              <Select
                labelId="period-type-label"
                value={periodType}
                label="Period"
                onChange={handlePeriodTypeChange}
              >
                <MenuItem value="Week">Week</MenuItem>
                <MenuItem value="Month">Month</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label={
                periodType === "Week"
                  ? "e.g. Week 3 - May 2026"
                  : "e.g. May 2026"
              }
              value={periodLabel}
              onChange={(e) => setPeriodLabel(e.target.value)}
              size="small"
              fullWidth
            />
          </Stack>

          <TextField
            label="Report Content"
            multiline
            minRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ alignSelf: "flex-start" }}
          >
            {file ? file.name : "Upload PDF/DOCX"}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ alignSelf: "flex-start" }}
          >
            Submit
          </Button>
        </Stack>
      </Paper>

      {/* History List */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Report History
      </Typography>

      {history.length === 0 ? (
        <Typography color="text.secondary">
          No reports submitted yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Submitted Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Supervisor Feedback</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((report) => (
                <>
                  <TableRow key={report._id} hover>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        size="small"
                        color={statusColors[report.status]}
                      />
                    </TableCell>
                    <TableCell>
                      {report.supervisorFeedback ? (
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ maxWidth: 200 }}
                        >
                          {report.supervisorFeedback}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(report._id)}
                      >
                        {expandedId === report._id ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
                      <Collapse in={expandedId === report._id}>
                        <Box sx={{ p: 2, backgroundColor: "grey.50" }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {report.content}
                          </Typography>
                          {report.fileName && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Attached file: <a href={report.fileUrl} target="_blank" rel="noreferrer">{report.fileName}</a>
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

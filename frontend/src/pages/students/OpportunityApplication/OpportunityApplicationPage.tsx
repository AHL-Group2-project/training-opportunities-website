import { useState, type FormEvent } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import { useAuth } from "../../../context/authContext";

function OpportunityApplicationPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [cvFile, setCvFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const opportunity = MOCK_OPPORTUNITIES.find((item) => item.id === Number(id));

  if (!opportunity) {
    return (
      <Box
        sx={{
          py: 10,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          Opportunity not found
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
          }}
        >
          The opportunity you are looking for does not exist.
        </Typography>

        <Button
          component={Link}
          to="/opportunities"
          variant="contained"
          sx={{
            mt: 3,
            textTransform: "none",
          }}
        >
          Back to opportunities
        </Button>
      </Box>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!opportunity || !cvFile) {
      return;
    }

    const applicationData = {
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      company: opportunity.company,

      student: {
        id: user?.id,
        name: fullName,
        email,
        universityId: studentId,
        phoneNumber,
      },

      coverLetter,
      cvFile,
    };

    console.log("Application data:", applicationData);

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FAFAFC",
        px: { xs: 2, sm: 3 },
        py: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {/* Back button */}
        <Button
          component={Link}
          to={`/opportunities/${opportunity.id}`}
          sx={{
            mb: 2,
            px: 0,
            color: "#1C2B4A",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          ← Back to opportunity
        </Button>

        {/* Page header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              color: "#1C2B4A",
              fontWeight: 700,
            }}
          >
            Apply for this opportunity
          </Typography>

          <Typography color="text.secondary">
            Complete the application form and upload the required documents.
          </Typography>
        </Box>

        {/* Success message */}
        {submitted && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            Your application has been submitted successfully.
          </Alert>
        )}

        {/* Opportunity summary */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: "1px solid",
            borderColor: "#DDE3EC",
            borderRadius: 3,
            backgroundColor: "#F4F8FF",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              color: "text.secondary",
            }}
          >
            {opportunity.company}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "#1C2B4A",
              fontWeight: 700,
            }}
          >
            {opportunity.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Chip
              label={opportunity.location}
              size="small"
              sx={{
                backgroundColor: "white",
              }}
            />

            <Chip
              label={`${opportunity.seats} seats`}
              size="small"
              sx={{
                backgroundColor: "white",
              }}
            />
          </Box>
        </Paper>

        {/* Application form */}
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            border: "1px solid",
            borderColor: "grey.200",
            borderRadius: 3,
          }}
        >
          {/* Student information */}
          <Typography
            variant="h6"
            sx={{
              mb: 0.5,
              color: "#1C2B4A",
              fontWeight: 700,
            }}
          >
            Student information
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Review your account information and enter the required university
            details.
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 2.5,
            }}
          >
            <TextField
              required
              fullWidth
              label="Full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              required
              fullWidth
              label="University ID"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              required
              fullWidth
              type="tel"
              label="Phone number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>

          {/* Cover letter */}
          <TextField
            fullWidth
            multiline
            minRows={5}
            label="Cover letter"
            placeholder="Tell the company why you are interested in this opportunity..."
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mt: 2.5 }}
          />

          <Divider sx={{ my: 4 }} />

          {/* Required documents */}
          <Typography
            variant="h6"
            sx={{
              mb: 0.5,
              color: "#1C2B4A",
              fontWeight: 700,
            }}
          >
            Required documents
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Upload your CV. Accepted formats: PDF, DOC and DOCX.
          </Typography>

          <Box
            sx={{
              maxWidth: 450,
            }}
          >
            {/* CV */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                CV *
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{
                  minHeight: 54,
                  px: 2,
                  textTransform: "none",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    width: "100%",
                    fontWeight: 600,
                  }}
                >
                  {cvFile ? cvFile.name : "Upload CV"}
                </Typography>

                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) =>
                    setCvFile(event.target.files?.[0] ?? null)
                  }
                />
              </Button>

              {cvFile && (
                <Button
                  size="small"
                  color="error"
                  onClick={() => setCvFile(null)}
                  sx={{
                    mt: 0.5,
                    px: 0,
                    textTransform: "none",
                  }}
                >
                  Remove file
                </Button>
              )}
            </Box>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: {
                xs: "column-reverse",
                sm: "row",
              },
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to={`/opportunities/${opportunity.id}`}
              variant="outlined"
              sx={{
                px: 3,
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={!cvFile}
              sx={{
                px: 4,
                backgroundColor: "#1C2B4A",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "none",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#2A3F6B",
                  boxShadow: "none",
                },
              }}
            >
              Submit application
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default OpportunityApplicationPage;

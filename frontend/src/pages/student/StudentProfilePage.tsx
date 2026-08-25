import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

import api from "../../lib/axios";
import type { Student } from "../../types/student.types";
import ProfileSidebar from "../../components/profileComp/ProfileSidebar";
import SkillsCard from "../../components/profileComp/SkillsCard";
import ExperienceCard from "../../components/profileComp/ExperienceCard";
import ProjectsCard from "../../components/profileComp/ProjectsCard";

import ProfileEditHero from "./ProfileEditHero";
import ProfileEditBio from "./ProfileEditBio";
import ProfileEditSkills from "./ProfileEditSkills";
import ProfileEditExperience from "../student/ProfileEditExperience";
import ProfileEditProjects from "../student/ProfileEditProjects";
import ProfileEditCV from "../student/ProfileEditCV";
import ProfileEditSocialPrivacy from "../student/ProfileEditSocialPrivacy";

export interface ExperienceEntry {
  year: string;
  title: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string;
  githubLink?: string;
  liveDemoLink?: string;
}

export interface CertificateEntry {
  name: string;
  issuer: string;
  date: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface EditableProfileData {
  name: string;
  university: string;
  major: string;
  graduationYear: string;
  contactEmail: string;
  phone: string;
  avatar?: string;
  bio: string;
  skills: string[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  certificates: CertificateEntry[];
  cvFileName: string | null;
  social: SocialLinks;
  isPublic: boolean;
}

interface StudentProfileApiResponse {
  name: string;
  university: string;
  major: string;
  studentId: string;
  year?: string; // e.g. "Fourth Year"
  graduationYear?: string;
  about?: string;
  cvUrl?: string | null;
  avatarUrl?: string | null;
  contactEmail?: string;
  phone?: string;
  social?: SocialLinks;
  isPublic?: boolean;
  skills?: string[];
  experience?: ExperienceEntry[];
  projects?: ProjectEntry[];
  certificates?: { title: string; issuer: string; date: string; url?: string }[];
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function mapApiResponseToProfileData(
  data: StudentProfileApiResponse,
): EditableProfileData {
  return {
    name: data.name ?? "",
    university: data.university ?? "",
    major: data.major ?? "",
    graduationYear: data.graduationYear ?? "",
    contactEmail: data.contactEmail ?? "",
    phone: data.phone ?? "",
    avatar: data.avatarUrl ?? undefined,
    bio: data.about ?? "",
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    projects: data.projects ?? [],
    certificates: (data.certificates ?? []).map((c) => ({
      name: c.title,
      issuer: c.issuer,
      date: c.date,
    })),
    cvFileName: data.cvUrl ?? null,
    social: data.social ?? { linkedin: "", github: "", portfolio: "" },
    isPublic: data.isPublic ?? false,
  };
}

// Reverse mapping: form field names -> backend/DB schema field names.
// IMPORTANT: backend's updateMyProfile only strips userId/studentId and
// writes everything else in req.body as-is, so field names sent here
// must match the StudentProfile schema, not the form's internal names.
function mapProfileDataToApiPayload(
  data: EditableProfileData,
): Partial<StudentProfileApiResponse> {
  return {
    name: data.name,
    university: data.university,
    major: data.major,
    graduationYear: data.graduationYear,
    contactEmail: data.contactEmail,
    phone: data.phone,
    avatarUrl: data.avatar ?? null,
    about: data.bio,
    skills: data.skills,
    experience: data.experience,
    projects: data.projects,
    certificates: data.certificates.map((c) => ({
      title: c.name,
      issuer: c.issuer,
      date: c.date,
    })),
    cvUrl: data.cvFileName,
    social: data.social,
    isPublic: data.isPublic,
  };
}

export default function StudentProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<EditableProfileData | null>(
    null,
  );
  const [apiYear, setApiYear] = useState<string>("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get<StudentProfileApiResponse>(
          "/students/me/profile",
        );
        if (isMounted) {
          setProfileData(mapApiResponseToProfileData(response.data));
          setApiYear(response.data.year ?? "");
        }
      } catch (err) {
        console.error("Failed to load student profile:", err);
        if (isMounted) {
          setError("Failed to load profile data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateField = <K extends keyof EditableProfileData>(
    key: K,
    value: EditableProfileData[K],
  ) => {
    setProfileData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!profileData) return;

    try {
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      const payload = mapProfileDataToApiPayload(profileData);
      const response = await api.patch<StudentProfileApiResponse>(
        "/students/me/profile",
        payload,
      );

      // Re-sync local state with what the server actually persisted,
      // the same way the initial fetch does, so we never show stale
      // or optimistic data that doesn't match the DB.
      setProfileData(mapApiResponseToProfileData(response.data));
      setApiYear(response.data.year ?? "");
      setSaveSuccess(true);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to update student profile:", err);
      setSaveError("Failed to save profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography>Student not found.</Typography>
      </Container>
    );
  }

  const displayStudent: Student = {
    id: 0,
    name: profileData.name,
    initials: getInitials(profileData.name),
    major: profileData.major,
    year: apiYear,
    graduationYear: profileData.graduationYear,
    email: profileData.contactEmail,
    contactEmail: profileData.contactEmail,
    phone: profileData.phone,
    bio: profileData.bio,
    location: "",
    availableFor: "",
    skills: profileData.skills,
    ft1: false,
    ft2: false,
    experience: profileData.experience,
    projects: profileData.projects.map((p) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
    })),
    certificates: profileData.certificates.map((c) => c.name),
    training: {
      ft1: {
        registered: false,
        completed: false,
        requiredHours: 0,
        loggedHours: 0,
      },
      ft2: {
        registered: false,
        completed: false,
        requiredHours: 0,
        loggedHours: 0,
      },
      hoursHistory: [],
      reports: [],
      applications: [],
      deadlines: [],
      supervisorStatus: "Not Started",
      evaluation: {
        score: null,
        notes: "",
      },
    },
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        {saveError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSaveError(null)}>
            {saveError}
          </Alert>
        )}
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaveSuccess(false)}>
            Profile updated successfully.
          </Alert>
        )}

        <Stack
          direction="row"
          sx={{ justifyContent: "flex-end", mb: 2 }}
          spacing={1}
        >
          {isEditMode ? (
            <Button
              variant="contained"
              startIcon={
                isSaving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditMode(true)}
            >
              Edit Profile
            </Button>
          )}

          {isEditMode && (
            <Button
              variant="text"
              startIcon={<VisibilityIcon />}
              onClick={() => setIsEditMode(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
          )}
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box sx={{ width: { xs: "100%", md: 320 }, flexShrink: 0 }}>
            {isEditMode ? (
              <ProfileEditHero data={profileData} onChange={updateField} />
            ) : (
              <ProfileSidebar student={displayStudent} />
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            {isEditMode ? (
              <ProfileEditBio
                bio={profileData.bio}
                onChange={(value) => updateField("bio", value)}
              />
            ) : (
              <Box
                sx={{
                  mb: 3,
                  p: 3,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  About
                </Typography>
                <Typography color="text.secondary">
                  {profileData.bio}
                </Typography>
              </Box>
            )}

            {isEditMode ? (
              <ProfileEditSkills
                skills={profileData.skills}
                onChange={(value: string[]) => updateField("skills", value)}
                field={profileData.major}
              />
            ) : (
              <SkillsCard student={displayStudent} />
            )}

            {isEditMode ? (
              <ProfileEditExperience
                experience={profileData.experience}
                onChange={(value: ExperienceEntry[]) =>
                  updateField("experience", value)
                }
              />
            ) : (
              <ExperienceCard student={displayStudent} />
            )}

            {isEditMode ? (
              <ProfileEditProjects
                projects={profileData.projects}
                onChange={(value: ProjectEntry[]) =>
                  updateField("projects", value)
                }
              />
            ) : (
              <ProjectsCard student={displayStudent} />
            )}

            {isEditMode && (
              <>
                <Divider sx={{ my: 3 }} />
                <ProfileEditCV
                  cvFileName={profileData.cvFileName}
                  onChange={(value: string | null) =>
                    updateField("cvFileName", value)
                  }
                />
                <ProfileEditSocialPrivacy
                  social={profileData.social}
                  isPublic={profileData.isPublic}
                  onSocialChange={(value: SocialLinks) =>
                    updateField("social", value)
                  }
                  onPrivacyChange={(value: boolean) =>
                    updateField("isPublic", value)
                  }
                />
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
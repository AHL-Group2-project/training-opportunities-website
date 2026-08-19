import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

import { students } from "../../mock/students";
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

const CURRENT_STUDENT_ID = 101;

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

export default function StudentProfilePage() {
  const baseStudent = students.find((s) => s.id === CURRENT_STUDENT_ID);

  const [isEditMode, setIsEditMode] = useState(false);

  const [profileData, setProfileData] = useState<EditableProfileData>({
    name: baseStudent?.name ?? "",
    university: "Palestine Polytechnic University",
    major: baseStudent?.major ?? "",
    graduationYear: "2027",
    contactEmail: baseStudent?.email ?? "",
    phone: "",
    bio: baseStudent?.bio ?? "",
    skills: baseStudent?.skills ?? [],
    experience: baseStudent?.experience ?? [],
    projects:
      baseStudent?.projects.map((p) => ({
        title: p.title,
        description: p.description,
        technologies: p.technologies,
      })) ?? [],
    certificates:
      baseStudent?.certificates.map((c) => ({
        name: c,
        issuer: "",
        date: "",
      })) ?? [],
    cvFileName: null,
    social: { linkedin: "", github: "", portfolio: "" },
    isPublic: true,
  });

  const updateField = <K extends keyof EditableProfileData>(
    key: K,
    value: EditableProfileData[K],
  ) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditMode(false);
  };

  if (!baseStudent) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography>Student not found.</Typography>
      </Container>
    );
  }

  const displayStudent = {
    ...baseStudent,
    name: profileData.name,
    major: profileData.major,
    graduationYear: profileData.graduationYear,
    skills: profileData.skills,
    experience: profileData.experience,
    projects: profileData.projects.map((p) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
    })),
    certificates: profileData.certificates.map((c) => c.name),
    contactEmail: profileData.contactEmail,
    phone: profileData.phone,
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "flex-end", mb: 2 }}
          spacing={1}
        >
          {isEditMode ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
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

import { Box, Typography, Link as MuiLink } from "@mui/material";

import type { StudentProfile } from "../StudentsPage";
type Props = {
  student: StudentProfile;
};

export default function ProjectsCard({ student }: Props) {
  const projects = student.projects || [];
  
  if (projects.length === 0) return null;

  return (
    <Box component="section" sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Projects
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {projects.map((project, index) => (
          <Box 
            key={index} 
            sx={{ 
              pb: 3, 
              borderBottom: index !== projects.length - 1 ? "1px solid" : "none", 
              borderColor: "divider" 
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {project.title}
              </Typography>
              
              {(project.githubLink || project.liveDemoLink) && (
                <Box sx={{ display: "flex", gap: 2 }}>
                  {project.githubLink && (
                    <MuiLink href={project.githubLink} target="_blank" variant="body2" sx={{ fontWeight: 500, color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.main", textDecoration: "underline" } }}>
                      GitHub
                    </MuiLink>
                  )}
                  {project.liveDemoLink && (
                    <MuiLink href={project.liveDemoLink} target="_blank" variant="body2" sx={{ fontWeight: 500, color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                      Live Demo
                    </MuiLink>
                  )}
                </Box>
              )}
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </Typography>

            {project.technologies && (
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                {project.technologies}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

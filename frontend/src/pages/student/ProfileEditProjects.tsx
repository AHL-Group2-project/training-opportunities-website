import { useState } from "react";
import {
  Card,
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProjectEntry } from "./StudentProfilePage";

interface Props {
  projects: ProjectEntry[];
  onChange: (value: ProjectEntry[]) => void;
}

const EMPTY_PROJECT: ProjectEntry = {
  title: "",
  description: "",
  technologies: "",
  githubLink: "",
  liveDemoLink: "",
};

export default function ProfileEditProjects({ projects, onChange }: Props) {
  const [draft, setDraft] = useState<ProjectEntry>(EMPTY_PROJECT);

  const handleAdd = () => {
    if (!draft.title.trim()) return;
    onChange([...projects, draft]);
    setDraft(EMPTY_PROJECT);
  };

  const handleDelete = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Projects
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {projects.map((project, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {project.title}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
              <Typography variant="caption" color="primary.main">
                {project.technologies}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Add new project
      </Typography>
      <Stack spacing={1.5}>
        <TextField
          label="Project Name"
          size="small"
          fullWidth
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <TextField
          label="Description"
          size="small"
          fullWidth
          multiline
          minRows={2}
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
        <TextField
          label="Tech Stack"
          size="small"
          fullWidth
          value={draft.technologies}
          onChange={(e) => setDraft({ ...draft, technologies: e.target.value })}
        />
        <Stack direction="row" spacing={1.5}>
          <TextField
            label="GitHub Link"
            size="small"
            fullWidth
            value={draft.githubLink}
            onChange={(e) => setDraft({ ...draft, githubLink: e.target.value })}
          />
          <TextField
            label="Live Demo Link"
            size="small"
            fullWidth
            value={draft.liveDemoLink}
            onChange={(e) =>
              setDraft({ ...draft, liveDemoLink: e.target.value })
            }
          />
        </Stack>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ alignSelf: "flex-start" }}
        >
          Add Project
        </Button>
      </Stack>
    </Card>
  );
}

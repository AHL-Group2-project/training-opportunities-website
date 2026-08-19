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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ExperienceEntry } from "./StudentProfilePage";

interface Props {
  experience: ExperienceEntry[];
  onChange: (value: ExperienceEntry[]) => void;
}

const EMPTY_ENTRY: ExperienceEntry = { year: "", title: "", description: "" };

export default function ProfileEditExperience({ experience, onChange }: Props) {
  const [draft, setDraft] = useState<ExperienceEntry>(EMPTY_ENTRY);

  const handleAdd = () => {
    if (!draft.title.trim()) return;
    onChange([...experience, draft]);
    setDraft(EMPTY_ENTRY);
  };

  const handleDelete = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleEntryChange = (
    index: number,
    field: keyof ExperienceEntry,
    value: string,
  ) => {
    const updated = experience.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry,
    );
    onChange(updated);
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Experience / Internships
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {experience.map((entry, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField
                label="Year"
                size="small"
                value={entry.year}
                onChange={(e) =>
                  handleEntryChange(index, "year", e.target.value)
                }
                sx={{ width: 100 }}
              />
              <TextField
                label="Title (Company/Position)"
                size="small"
                fullWidth
                value={entry.title}
                onChange={(e) =>
                  handleEntryChange(index, "title", e.target.value)
                }
              />
              <IconButton color="error" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
            <TextField
              label="Description"
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={entry.description}
              onChange={(e) =>
                handleEntryChange(index, "description", e.target.value)
              }
            />
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Add new entry
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <TextField
          label="Year"
          size="small"
          value={draft.year}
          onChange={(e) => setDraft({ ...draft, year: e.target.value })}
          sx={{ width: 100 }}
        />
        <TextField
          label="Company / Position / Duration"
          size="small"
          fullWidth
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </Stack>
      <TextField
        label="Description"
        size="small"
        fullWidth
        multiline
        minRows={2}
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        sx={{ mb: 1 }}
      />
      <Button startIcon={<AddIcon />} onClick={handleAdd}>
        Add Experience
      </Button>
    </Card>
  );
}

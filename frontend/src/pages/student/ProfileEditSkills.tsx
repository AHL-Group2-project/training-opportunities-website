import { useState } from "react";
import {
  Card,
  Typography,
  Stack,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SUGGESTED_SKILLS_BY_FIELD: Record<string, string[]> = {
  "Computer Engineering": ["React", "Node.js", "Docker", "AWS"],
  "Information Technology": ["SQL", "Power BI", "Networking", "Linux"],
  "Software Engineering": ["Flutter", "Java", "Git", "Agile"],
  "Computer Science": ["Python", "Algorithms", "Spring Boot", "MySQL"],
  "Artificial Intelligence": ["TensorFlow", "PyTorch", "OpenCV", "NLP"],
  "Information Systems": ["Figma", "JavaScript", "UX Research", "CSS"],
};

interface Props {
  skills: string[];
  onChange: (value: string[]) => void;
  field: string;
}

export default function ProfileEditSkills({ skills, onChange, field }: Props) {
  const [newSkill, setNewSkill] = useState("");

  const suggested = (SUGGESTED_SKILLS_BY_FIELD[field] ?? []).filter(
    (s) => !skills.includes(s),
  );

  const handleAdd = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setNewSkill("");
  };

  const handleRemove = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Skills
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}
      >
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleRemove(skill)}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd(newSkill);
          }}
        />
        <Button startIcon={<AddIcon />} onClick={() => handleAdd(newSkill)}>
          Add
        </Button>
      </Stack>

      {suggested.length > 0 && (
        <>
          <Typography variant="caption" color="text.secondary">
            Suggested for {field}:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", gap: 1, mt: 1 }}
          >
            {suggested.map((skill) => (
              <Chip
                key={skill}
                label={`+ ${skill}`}
                variant="outlined"
                onClick={() => handleAdd(skill)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Stack>
        </>
      )}
    </Card>
  );
}

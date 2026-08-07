import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

type OpportunityFiltersProps = {
  searchTerm: string;
  department: string;
  field: string;

  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onFieldChange: (value: string) => void;
};

function OpportunityFilters({
  searchTerm,
  department,
  field,
  onSearchChange,
  onDepartmentChange,
  onFieldChange,
}: OpportunityFiltersProps) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        label="Search by title, company, or skill"
        value={searchTerm}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
        size="small"
        fullWidth
      />

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="department-filter-label">
          Filter by department
        </InputLabel>
        <Select
          labelId="department-filter-label"
          value={department}
          label="Filter by department"
          onChange={(event) => {
            onDepartmentChange(event.target.value as string);
          }}
        >
          <MenuItem value="all">All Departments</MenuItem>
          <MenuItem value="engineering">Engineering</MenuItem>
          <MenuItem value="information-technology">
            Information Technology
          </MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="field-filter-label">Filter by field</InputLabel>
        <Select
          labelId="field-filter-label"
          value={field}
          label="Filter by field"
          onChange={(event) => {
            onFieldChange(event.target.value as string);
          }}
        >
          <MenuItem value="all">All Fields</MenuItem>
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="mobile">Mobile</MenuItem>
          <MenuItem value="data">Data Analysis</MenuItem>
          <MenuItem value="qa">Quality Assurance</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default OpportunityFilters;

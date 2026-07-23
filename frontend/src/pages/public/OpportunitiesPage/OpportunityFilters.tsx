import { MenuItem, Paper, Stack, TextField } from "@mui/material";

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
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#F4F7FC",
        borderColor: "#D8E0EC",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
      >
        {/* البحث */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by title, company, or skill..."
          value={searchTerm}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          sx={{
            flex: 1,
            minWidth: {
              md: 300,
            },
          }}
        />

        {/* فلتر القسم */}
        <TextField
          select
          size="small"
          value={department}
          onChange={(event) => {
            onDepartmentChange(event.target.value);
          }}
          sx={{
            minWidth: {
              xs: "100%",
              md: 210,
            },
          }}
        >
          <MenuItem value="all">All Departments</MenuItem>
          <MenuItem value="engineering">Engineering</MenuItem>
          <MenuItem value="information-technology">
            Information Technology
          </MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </TextField>

        {/* فلتر المجال */}
        <TextField
          select
          size="small"
          value={field}
          onChange={(event) => {
            onFieldChange(event.target.value);
          }}
          sx={{
            minWidth: {
              xs: "100%",
              md: 190,
            },
          }}
        >
          <MenuItem value="all">All Fields</MenuItem>
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="mobile">Mobile</MenuItem>
          <MenuItem value="data">Data Analysis</MenuItem>
          <MenuItem value="qa">Quality Assurance</MenuItem>
        </TextField>
      </Stack>
    </Paper>
  );
}

export default OpportunityFilters;

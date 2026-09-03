import InternshipRequest from "../models/InternshipRequest.js";
import Hour from "../models/Hour.js";
import StudentProfile from "../models/StudentProfile.js";

export const getStudentTrainingStateData = async (studentId) => {
  const student = await StudentProfile.findById(studentId);
  const state = {
    studentId,
    studentName: student ? student.name : "Student",
    ft1: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
    ft2: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    }
  };

  const requests = await InternshipRequest.find({ studentId });
  const hours = await Hour.find({ studentId, companyStatus: "approved" });

  for (const type of ["ft1", "ft2"]) {
    // Always sum approved hours regardless of request status
    const typeHours = hours.filter(h => h.trainingType?.toLowerCase() === type.toLowerCase());
    const totalHours = typeHours.reduce((sum, h) => sum + h.totalHours, 0);
    state[type].companyApprovedHours = totalHours;

    const req = requests.find(r => r.type?.toLowerCase() === type.toLowerCase() && (r.status === "approved" || r.status === "pending"));
    
    if (!req) {
      // If no active request but hours exist and exceed 150, we still might consider it completed?
      // No, let's keep status "not_started" but frontend will check companyApprovedHours or filteredEntries.
      continue;
    }

    state[type].requiredHours = req.expectedHours || 150;
    
    if (req.status === "pending") {
      state[type].status = "request_pending";
    } else if (req.status === "approved") {
      state[type].status = "in_progress";

      if (totalHours >= state[type].requiredHours) {
        // Technically completed if supervisor approved, but we don't have a supervisorFinalStatus on the model yet
        // For now, if hours are met, it's completed (supervisor logic can be added later)
        state[type].status = "completed";
      }
    }
  }

  return state;
};

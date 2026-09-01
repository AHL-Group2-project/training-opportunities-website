import Hour from "../models/Hour.js";
import StudentProfile from "../models/StudentProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import { getStudentTrainingStateData } from "../utils/trainingState.js";

// GET /api/student/me/training-state
export const getMyTrainingState = async (req, res, next) => {
  try {
    const studentProfile = await StudentProfile.findOne({ userId: req.user._id });
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }
    const state = await getStudentTrainingStateData(studentProfile._id);
    res.json(state);
  } catch (error) {
    next(error);
  }
};

// GET /api/student/me/hours
export const getMyHours = async (req, res, next) => {
  try {
    const studentProfile = await StudentProfile.findOne({ userId: req.user._id });
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    const hours = await Hour.find({ studentId: studentProfile._id }).sort({ weekStartDate: -1 });
    res.json(hours);
  } catch (error) {
    next(error);
  }
};

// POST /api/student/me/hours/bulk
// Accepts an array of daily entries and groups them by week to save in Hour documents
export const submitMyHoursBulk = async (req, res, next) => {
  try {
    const studentProfile = await StudentProfile.findOne({ userId: req.user._id });
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    const { entries } = req.body;
    let { trainingType } = req.body;

    if (!trainingType) {
      return res.status(400).json({ message: "Training type is required." });
    }
    trainingType = trainingType.toLowerCase();

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({ message: "Entries array is required." });
    }

    // Find the active request for this training type
    const request = await InternshipRequest.findOne({
      studentId: studentProfile._id,
      type: { $regex: new RegExp(`^${trainingType}$`, "i") },
      status: "approved"
    });

    if (!request) {
      return res.status(400).json({ message: "No approved training request found for this type." });
    }

    // Validation Rules
    for (const entry of entries) {
      const date = new Date(entry.date);
      const dayIndex = date.getDay();
      
      if (dayIndex === 5) {
        return res.status(400).json({ message: "Training is not allowed on Fridays." });
      }

      if (entry.startTime < "08:00") {
        return res.status(400).json({ message: "Start time cannot be before 8:00 AM." });
      }

      if (entry.endTime > "17:00") {
        return res.status(400).json({ message: "End time cannot be after 5:00 PM." });
      }
      
      if (entry.startTime >= entry.endTime) {
        return res.status(400).json({ message: "End time must be after start time." });
      }

      if ((entry.hours || 0) > 8) {
        return res.status(400).json({ message: "A single entry cannot exceed 8 hours." });
      }
    }

    // Group entries by week
    // A week starts on Sunday
    const getWeekStartDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDay();
      const diff = date.getDate() - day;
      return new Date(date.setDate(diff)).toISOString().split('T')[0];
    };

    const grouped = {};
    for (const entry of entries) {
      const weekStart = getWeekStartDate(entry.date);
      if (!grouped[weekStart]) {
        grouped[weekStart] = [];
      }
      grouped[weekStart].push({
        date: new Date(entry.date),
        startTime: entry.startTime,
        endTime: entry.endTime,
        location: entry.location,
        description: entry.description,
        hours: entry.hours || 0,
      });
    }

    const results = [];

    for (const [weekStart, dailyLogs] of Object.entries(grouped)) {
      const weekDate = new Date(weekStart);
      let hourDoc = await Hour.findOne({
        studentId: studentProfile._id,
        trainingType: { $regex: new RegExp(`^${trainingType}$`, "i") },
        weekStartDate: weekDate
      });

      if (!hourDoc) {
        hourDoc = new Hour({
          studentId: studentProfile._id,
          internshipRequestId: request._id,
          companyId: request.companyId || null,
          trainingType,
          weekStartDate: weekDate,
          totalHours: 0,
          dailyLogs: [],
          companyStatus: "pending"
        });
      } else {
        // If the week is already approved, reject adding more
        if (hourDoc.companyStatus === "approved") {
          continue; // Skip this week
        }
      }

      // Add or update daily logs
      for (const log of dailyLogs) {
        const existingIdx = hourDoc.dailyLogs.findIndex(d => 
          new Date(d.date).toISOString().split('T')[0] === new Date(log.date).toISOString().split('T')[0]
        );
        if (existingIdx >= 0) {
          hourDoc.dailyLogs[existingIdx] = log;
        } else {
          hourDoc.dailyLogs.push(log);
        }
      }

      // Recalculate total hours
      hourDoc.totalHours = hourDoc.dailyLogs.reduce((sum, d) => sum + d.hours, 0);
      hourDoc.companyStatus = "pending"; // Resubmit for review
      
      await hourDoc.save();
      results.push(hourDoc);
    }

    res.json({ message: "Hours submitted successfully", results });
  } catch (error) {
    next(error);
  }
};

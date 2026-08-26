import SupervisorProfile from "../models/SupervisorProfile.js";
import StudentProfile from "../models/StudentProfile.js";
import TrainingRequest from "../models/TrainingRequest.js";
import HoursLog from "../models/HoursLog.js";


export const getSupervisorRequests = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });

    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const requests = await TrainingRequest.find({
      supervisorId: supervisorProfile._id,
    })
      .populate({
        path: "studentId",
        select: "name university major",
        populate: { path: "userId", select: "email" },
      })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};


export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const request = await TrainingRequest.findOne({
      _id: id,
      supervisorId: supervisorProfile._id,
    });
    if (!request) {
      return res.status(404).json({ message: "Request not found or unauthorized." });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status} successfully.`, request });
  } catch (error) {
    next(error);
  }
};

const attachTrainingInfo = async (students) => {
  const studentIds = students.map((s) => s._id);

  const [requests, hoursAgg] = await Promise.all([
    TrainingRequest.find({ studentId: { $in: studentIds } }).sort({
      createdAt: -1,
    }),
    HoursLog.aggregate([
      {
        $match: {
          studentId: { $in: studentIds },
          status: "approved",
        },
      },
      {
        $group: {
          _id: { studentId: "$studentId", phase: "$phase" },
          totalHours: { $sum: "$hours" },
        },
      },
    ]),
  ]);

  const requestsByStudent = new Map();
  for (const req of requests) {
    const key = req.studentId.toString();
    if (!requestsByStudent.has(key)) {
      requestsByStudent.set(key, { ft1: null, ft2: null });
    }
    const entry = requestsByStudent.get(key);
    if (!entry[req.type]) entry[req.type] = req; 
  }

 
  const hoursByStudent = new Map();
  for (const row of hoursAgg) {
    const key = row._id.studentId.toString();
    if (!hoursByStudent.has(key)) {
      hoursByStudent.set(key, { ft1: 0, ft2: 0 });
    }
    hoursByStudent.get(key)[row._id.phase] = row.totalHours;
  }

  return students.map((student) => {
    const key = student._id.toString();
    const reqs = requestsByStudent.get(key) || { ft1: null, ft2: null };
    const hours = hoursByStudent.get(key) || { ft1: 0, ft2: 0 };

    const isCompleted = (phase) => {
      const request = reqs[phase];
      return Boolean(
        request &&
          request.status === "approved" &&
          hours[phase] >= request.expectedHours,
      );
    };

    const ft1Completed = isCompleted("ft1");
    const ft2Completed = isCompleted("ft2");

    const isActive = (phase) => {
      const request = reqs[phase];
      return Boolean(
        request && request.status === "approved" && !isCompleted(phase),
      );
    };

    let activePhase = null;
    if (isActive("ft1")) activePhase = "ft1";
    else if (isActive("ft2")) activePhase = "ft2";

 
    let displayPhase = activePhase;
    if (!displayPhase) {
      if (ft2Completed || reqs.ft2) displayPhase = "ft2";
      else if (ft1Completed || reqs.ft1) displayPhase = "ft1";
    }

    const totalHours = displayPhase ? hours[displayPhase] || 0 : 0;

    const currentRequest = activePhase
      ? reqs[activePhase]
      : reqs.ft2 || reqs.ft1;

    const currentInternship = currentRequest
      ? `${currentRequest.position} - ${currentRequest.companyName}`
      : null;

    let status = "Not Started";
    if (ft1Completed && ft2Completed) status = "Completed";
    else if (reqs.ft1 || reqs.ft2) status = "Active";

    return {
      id: student._id,
      name: student.name,
      university: student.university,
      major: student.major,
      year: student.year,
      currentInternship,
      ft1: ft1Completed,
      ft2: ft2Completed,
      totalHours,
      status,
    };
  });
};

export const getMyStudents = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const search = (req.query.search || "").trim();
    const status = req.query.status || "all";

    const filter = { supervisorId: req.user._id };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const students = await StudentProfile.find(filter).sort({ name: 1 });
    let enriched = await attachTrainingInfo(students);

    if (status !== "all") {
      enriched = enriched.filter((s) => s.status === status);
    }

    const total = enriched.length;
    const start = (page - 1) * limit;
    const data = enriched.slice(start, start + limit);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const exportMyStudents = async (req, res, next) => {
  try {
    const search = (req.query.search || "").trim();
    const status = req.query.status || "all";

    const filter = { supervisorId: req.user._id };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const students = await StudentProfile.find(filter).sort({ name: 1 });
    let enriched = await attachTrainingInfo(students);

    if (status !== "all") {
      enriched = enriched.filter((s) => s.status === status);
    }

    const header = [
      "Name",
      "University",
      "Major",
      "Year",
      "Current Internship",
      "FT1",
      "FT2",
      "Total Hours",
      "Status",
    ];

    const escapeCsv = (val) => {
      const str = String(val ?? "");
      return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const rows = enriched.map((s) =>
      [
        s.name,
        s.university,
        s.major,
        s.year,
        s.currentInternship || "-",
        s.ft1 ? "Done" : "Pending",
        s.ft2 ? "Done" : "Pending",
        s.totalHours,
        s.status,
      ]
        .map(escapeCsv)
        .join(","),
    );

    const csv = [header.join(","), ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="my-students.csv"',
    );
    res.status(200).send("\uFEFF" + csv);
  } catch (error) {
    next(error);
  }
};
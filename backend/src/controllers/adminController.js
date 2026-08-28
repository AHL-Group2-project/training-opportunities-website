import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import SupervisorProfile from "../models/SupervisorProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import AdminProfile from "../models/AdminProfile.js";
import crypto from "crypto";

// Mapping of universities to their official email domains
const UNIVERSITY_DOMAINS = {
  "Palestine Polytechnic University": "@ppu.edu.ps",
  "Birzeit University": "@birzeit.edu.ps",
  "An-Najah National University": "@najah.edu.ps",
  "Al-Quds University": "@alquds.edu",
  "Arab American University": "@aaup.edu",
  "Hebron University": "@hebron.edu.ps",
  "Al-Quds Open University": "@qou.edu.ps",
  "Al-Zaytoonah University": "@zaytoonah.edu.ps",
  "Palestine Technical University - Kadoorie": "@ptuk.edu.ps",
};

// Generate a random temporary password
const generateTempPassword = () => {
  return crypto.randomBytes(4).toString("hex") + "A1!";
};

export const createStudent = async (req, res, next) => {
  try {
    const { name, email, universityId, major } = req.body;

    if (!name || !email || !universityId || !major) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found. Cannot determine university." });
    }

    const expectedDomain = UNIVERSITY_DOMAINS[adminProfile.university] || UNIVERSITY_DOMAINS[adminProfile.university.toUpperCase()];
    if (!expectedDomain) {
      return res.status(400).json({ message: `System Error: The domain for university "${adminProfile.university}" is not configured.` });
    }

    if (!email.toLowerCase().endsWith(expectedDomain)) {
      return res.status(400).json({ message: `Email must end with ${expectedDomain} for ${adminProfile.university}.` });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const profileExists = await StudentProfile.findOne({ universityId });
    if (profileExists) {
      return res.status(400).json({ message: "Student with this University ID already exists." });
    }

    const tempPassword = generateTempPassword();

    const user = await User.create({
      email,
      password: tempPassword,
      role: "student",
      mustChangePassword: true,
      isActive: true,
    });

    const studentProfile = await StudentProfile.create({
      userId: user._id,
      name,
      universityId,
      major,
      university: adminProfile.university, // Inherit from admin
    });

    res.status(201).json({
      message: "Student created successfully.",
      tempPassword,
      user: {
        id: user._id,
        email: user.email,
        profileId: studentProfile._id,
        university: studentProfile.university,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createSupervisor = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found. Cannot determine university." });
    }

    const expectedDomain = UNIVERSITY_DOMAINS[adminProfile.university] || UNIVERSITY_DOMAINS[adminProfile.university.toUpperCase()];
    if (!expectedDomain) {
      return res.status(400).json({ message: `System Error: The domain for university "${adminProfile.university}" is not configured.` });
    }

    if (!email.toLowerCase().endsWith(expectedDomain)) {
      return res.status(400).json({ message: `Email must end with ${expectedDomain} for ${adminProfile.university}.` });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const tempPassword = generateTempPassword();

    const user = await User.create({
      email,
      password: tempPassword,
      role: "supervisor",
      mustChangePassword: true,
      isActive: true,
    });

    const supervisorProfile = await SupervisorProfile.create({
      userId: user._id,
      name,
      department,
      university: adminProfile.university, // Inherit from admin
    });

    res.status(201).json({
      message: "Supervisor created successfully.",
      tempPassword,
      user: {
        id: user._id,
        email: user.email,
        profileId: supervisorProfile._id,
        university: supervisorProfile.university,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, major } = req.body;

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const student = await StudentProfile.findOne({ _id: id, university: adminProfile.university });
    if (!student) return res.status(404).json({ message: "Student not found or belongs to another university." });
    
    if (name) student.name = name;
    if (major) student.major = major;
    await student.save();
    
    res.json({ message: "Student updated successfully.", profile: student });
  } catch (error) {
    next(error);
  }
};

export const updateSupervisor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, department } = req.body;

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const supervisor = await SupervisorProfile.findOne({ _id: id, university: adminProfile.university });
    if (!supervisor) return res.status(404).json({ message: "Supervisor not found or belongs to another university." });
    
    if (name) supervisor.name = name;
    if (department) supervisor.department = department;
    await supervisor.save();
    
    res.json({ message: "Supervisor updated successfully.", profile: supervisor });
  } catch (error) {
    next(error);
  }
};

export const createCompany = async (req, res, next) => {
  try {
    const { name, email, industry, location, website, description, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const tempPassword = generateTempPassword();

    const user = await User.create({
      email,
      password: tempPassword,
      role: "company",
      mustChangePassword: true,
      isActive: true,
    });

    const companyProfile = await CompanyProfile.create({
      userId: user._id,
      name,
      contactEmail: email,
      industry: industry || "Technology",
      location: location || "",
      website: website || "",
      description: description || "",
      phone: phone || "",
      verified: true, // Automatically verify companies added by admin
    });

    res.status(201).json({
      message: "Company created successfully.",
      tempPassword,
      user: {
        id: user._id,
        email: user.email,
        profileId: companyProfile._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, industry, location, website, description, phone } = req.body;

    const companyProfile = await CompanyProfile.findById(id);
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found." });
    }

    if (name) companyProfile.name = name;
    if (industry !== undefined) companyProfile.industry = industry;
    if (location !== undefined) companyProfile.location = location;
    if (website !== undefined) companyProfile.website = website;
    if (description !== undefined) companyProfile.description = description;
    if (phone !== undefined) companyProfile.phone = phone;

    await companyProfile.save();

    res.status(200).json({
      message: "Company updated successfully.",
      profile: companyProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleCompanyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const companyProfile = await CompanyProfile.findById(id);
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found." });
    }
    
    const user = await User.findById(companyProfile.userId);
    if (!user) {
      return res.status(404).json({ message: "Company user account not found." });
    }

    user.isActive = !user.isActive;
    await user.save();
    
    companyProfile.activationStatus = user.isActive ? "active" : "suspended";
    await companyProfile.save();

    res.status(200).json({
      message: `Company account ${user.isActive ? 'activated' : 'deactivated'} successfully.`,
      isActive: user.isActive,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const students = await StudentProfile.find({ university: adminProfile.university })
      .populate("userId", "email isActive")
      .populate("supervisorId", "email");

    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const getSupervisors = async (req, res, next) => {
  try {
    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const supervisors = await SupervisorProfile.find({ university: adminProfile.university })
      .populate("userId", "email isActive");
    res.json(supervisors);
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    // Companies are global, no university filter
    const companies = await CompanyProfile.find().populate("userId", "email isActive");
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

export const assignSupervisorToStudent = async (req, res, next) => {
  try {
    const { id } = req.params; // StudentProfile ID
    const { supervisorId } = req.body; // Supervisor User ID

    if (!supervisorId) {
      return res.status(400).json({ message: "Supervisor ID is required." });
    }

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    if (studentProfile.university !== adminProfile.university) {
      return res.status(403).json({ message: "You can only manage students in your university." });
    }

    // Verify supervisor exists and belongs to the same university
    const supervisorExists = await User.findOne({ _id: supervisorId, role: "supervisor" });
    if (!supervisorExists) {
      return res.status(404).json({ message: "Supervisor not found." });
    }

    const supervisorProfile = await SupervisorProfile.findOne({ userId: supervisorId });
    if (!supervisorProfile || supervisorProfile.university !== adminProfile.university) {
      return res.status(403).json({ message: "Supervisor does not belong to your university." });
    }

    await StudentProfile.updateOne(
      { _id: id },
      { $set: { supervisorId: supervisorId } }
    );

    studentProfile.supervisorId = supervisorId;
    res.json({ message: "Supervisor assigned successfully.", studentProfile });
  } catch (error) {
    next(error);
  }
};

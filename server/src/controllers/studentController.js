import { Student } from "../models/studentModel.js";
import mongoose from "mongoose";

//get all students
const getStudents = async (req, res) => {
  const students = await Student.find({});

  res.status(200).json(students);
};

//get single student
const getStudentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(400).json({ error: "No such Student" });
  }
  res.status(200).json(student);
};

//get student by dayOfWeek
const getStudentByDay = async (req, res) => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const { dayOfWeek } = req.params;

  if (!daysOfWeek.includes(dayOfWeek.toLowerCase())) {
    return res.status(404).json({ error: "Incorrect Day of The Week" });
  }

  const students = await Student.find({});
  var filteredStudents = [];

  students.forEach((student) => {
    student.timetable.every((schedule) => {
      if (schedule.day.toLowerCase() == dayOfWeek.toLowerCase()) {
        filteredStudents.push(student);
        return false;
      }
      return true;
    });
  });
  res.status(200).json(filteredStudents);
};

//create new student
const createStudent = async (req, res) => {
  const {
    name,
    family_name,
    phone,
    mail,
    grade,
    school,
    subjects,
    timetable,
    fee,
    address,
    parent_details,
  } = req.body;

  //add document to db
  try {
    const newStudent = await Student.create({
      name,
      family_name,
      phone,
      mail,
      grade,
      school,
      subjects,
      timetable,
      fee,
      address,
      parent_details,
    });
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return res.status(400).json({ error: "No such student" });
  }
  res.status(200).json(student);
};

//update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!student) {
    return res.status(400).json({ error: "No such student" });
  }
  res.status(200).json(student);
};

export {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
  getStudentByDay,
};

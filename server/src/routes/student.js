import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
  getStudentByDay,
} from "../controllers/studentController.js";
import { requireAuth } from "../middleware/requireAuth.js";

//router
const router = express.Router();

//Authenticate before executing paths
router.use(requireAuth);

//get all students
router.get("/", getStudents);

//get student by id
router.get("/:id", getStudentById);

//get students by dayOfWeek
router.get("/filter/:dayOfWeek", getStudentByDay);

//create new student
router.post("/", createStudent);

//delete a student
router.delete("/:id", deleteStudent);

//update a student
router.patch("/:id", updateStudent);

export { router as studentRoutes };

import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

//login route
router.post("/login", loginUser);

//register
router.post("/signup", signupUser);

export { router as userRoutes };

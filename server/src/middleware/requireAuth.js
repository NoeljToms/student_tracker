import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    if (_id === "64c839f9f20f190b768cca36") {
      req.user = await User.findOne({ _id }).select("_id");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuth };

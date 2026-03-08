import express from "express";
import {
  adminController,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getDashboard,
} from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminController);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.delete("/delete-comment", auth, deleteCommentById);
adminRouter.patch("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export { adminRouter };

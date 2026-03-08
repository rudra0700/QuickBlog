import express from "express";
import {
  blogController,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, blogController);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.patch("/toggle-publish", auth, togglePublish);

export { blogRouter };

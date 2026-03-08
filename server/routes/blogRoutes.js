import express from "express";
import { blogController } from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, blogController);

export { blogRouter };

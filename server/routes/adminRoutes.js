import express from "express";
import { adminController } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminController);

export {adminRouter}
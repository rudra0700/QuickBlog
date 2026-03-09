import jwt from "jsonwebtoken";
import { Blog } from "../model/blog.js";
import { Comment } from "../model/Comment.js";

export const adminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.send({ success: false, message: "Credential Invalid" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.send({ success: true, token });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.send({ success: true, blogs });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.send({ success: true, comments });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const data = req.body;
    await Comment.findByIdAndDelete(data.id);
    res.send({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};


export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, {isApproved: true});
    res.send({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

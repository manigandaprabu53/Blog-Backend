import express from "express";
import blogController from "../Controller/blog.controller.js";
import verifyAuth from "../MiddleWare/verifyAuth.js";

const router = express.Router();

router.post("/create", verifyAuth, blogController.createBlog);
router.get("/get-all-blogs", verifyAuth, blogController.getAllBlogs);
router.get("/get", verifyAuth, blogController.getMyBlogs);
router.get("/getblog-by-id/:id", verifyAuth, blogController.getBlogById);
router.delete("/delete/:id", verifyAuth, blogController.deleteBlog);
router.put("/update-blog", verifyAuth, blogController.updateBlog);

export default router;
import express from "express";
import userRoutes from "./user.route.js";
import blogRoutes from "./blog.route.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

export default router;
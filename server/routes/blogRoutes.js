import express from 'express'
import { createBlog, deleteBlog, getAllBlogByUser, getAllBlogs, getBlogDetail, updateBlog } from '../controllers/blogController.js'

const router = express.Router()

router.get("/", getAllBlogs)
router.get("/:blogId", getBlogDetail)
router.get("/users/:userId", getAllBlogByUser)
router.post("/", createBlog)
router.put("/:blogId", updateBlog)
router.delete("/:blogId", deleteBlog)

export default router 
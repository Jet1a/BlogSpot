import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blogController.js'

const router = express.Router()

router.get("/", getAllBlogs)
router.post("/", createBlog)
router.put("/:blogId", updateBlog)
router.delete("/:blogId", deleteBlog)

export default router 
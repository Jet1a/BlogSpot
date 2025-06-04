import Blog from "../models/Blog.js"
import User from "../models/User.js"

export const getAllBlogs = async (req, res) => {

   const blogs = await Blog.find();

   try {

      if (blogs.length === 0) {
         return res.status(404).json({
            success: false,
            message: "No blogs found",
         });
      }

      return res.status(200).json({
         success: true,
         message: "All Blogs",
         count: blogs.length,
         blogs: blogs,
      });

   } catch (error) {
      console.error("Error fetch all blog:", error);
      return res.status(500).json({
         success: false,
         message: "Failed to get blog",
         error: error.message
      });
   }
}

export const createBlog = async (req, res) => {

   try {
      const { imageUrl, title, content, userId } = req.body
      if (!title || !content) {
         return res.status(400).send("Title and Content is required")
      }

      if (!userId) {
         return res.status(401).send("Unauthorized, Create not Allowed")
      }

      const user = await User.findOne({ _id: userId }).select("-password")
      if (!user) return res.status(404).send("User not found")

      const newBlog = await Blog.create({
         imageUrl,
         title,
         content,
         author: user.name,
         user: userId
      })

      await User.findByIdAndUpdate(
         userId,
         { $push: { blogs: newBlog._id } }
      );

      return res.status(201).json({
         success: true,
         message: "Blog created successfully",
         blog: newBlog
      });

   } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({
         success: false,
         message: "Failed to create blog",
         error: error.message
      });
   }
}

export const updateBlog = async (req, res) => {

   try {

      const { blogId } = req.params
      const { imageUrl, title, content, userId } = req.body

      if (!title || !content) {
         return res.status(400).send("Title and Content is required")
      }

      if (!userId) {
         return res.status(401).send("Unauthorized, Create not Allowed")
      }

      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
         return res.status(404).send("Blog does not exist with this ID.");
      }

      if (existingBlog.user.toString() !== userId) {
         return res.status(403).send("Forbidden: You are not the owner of this blog.");
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
         blogId,
         { title, content, imageUrl },
         { new: true, runValidators: true }
      )

      return res.status(200).json({
         success: true,
         message: "Blog updated successfully",
         blog: updatedBlog
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Failed to updating blog, Server Error",
         error: error.message
      });
   }
}

export const deleteBlog = async (req, res) => {
   try {

      const { blogId } = req.params
      const { userId } = req.body

      if (!userId) {
         return res.status(401).send("Unauthorized, Create not Allowed")
      }

      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
         return res.status(404).send("Blog does not exist with this ID.");
      }

      if (existingBlog.user.toString() !== userId) {
         return res.status(403).send("Forbidden: You are not the owner of this blog.");
      }

      await Blog.deleteOne({ _id: blogId });

      await User.findByIdAndUpdate(userId, {
         $pull: { blogs: blogId }
      });

      return res.status(204).json({
         success: true,
         message: "Blog deleted successfully"
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Failed to delete blog, Server Error",
         error: error.message
      });
   }
}
import Blog from "../models/Blog.js"
import User from "../models/User.js"

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
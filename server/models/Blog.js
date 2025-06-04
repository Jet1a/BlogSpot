import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
   imageUrl: String,
   title: String,
   author: String,
   content: String,
   createdOn: { type: Date, default: Date.now },
   updatedOn: { type: Date, default: Date.now },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})

export default mongoose.model("Blog", blogSchema)
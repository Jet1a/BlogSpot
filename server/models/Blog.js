import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
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

blogSchema.plugin(mongoosePaginate)

export default mongoose.model("Blog", blogSchema)
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true },
   password: String,
   createdOn: { type: Date, default: Date.now },
   updatedOn: { type: Date, default: Date.now },
   blogs: [{
      type: Schema.Types.ObjectId,
      ref: 'Blog'
   }]
})
export default mongoose.model("User", userSchema) 
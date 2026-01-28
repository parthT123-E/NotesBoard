import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email:    { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // hashed before save
}, { timestamps: true });

export default mongoose.model("User", userSchema);
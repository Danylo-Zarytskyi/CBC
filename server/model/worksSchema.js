import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  image: String,
  title: String,
  desc: String,
});

export default mongoose.model("Work", workSchema);

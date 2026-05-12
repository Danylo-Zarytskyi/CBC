import mongoose from "mongoose";

const popularServiceSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: String,
  desc: String,
  serviceId: String,
});

export default mongoose.model("PopularService", popularServiceSchema);

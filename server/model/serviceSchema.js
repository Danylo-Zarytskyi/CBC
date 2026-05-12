import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  icon: String,
  category: String,
  items: [
    {
      name: String,
      price: String,
    },
  ],
});

export default mongoose.model("Service", serviceSchema);

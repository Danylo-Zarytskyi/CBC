import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    service: String,
    comment: String,

    files: [String],

    status: {
      type: String,
      default: "new",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

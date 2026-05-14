// orderSchema.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    service: String,
    comment: String,

    files: [
      {
        filename: String,
        originalName: String,
        path: String,
        size: Number,
        mimetype: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "processing", "done", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

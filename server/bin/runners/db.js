import mongoose from "mongoose";

export default async function dbRunner() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Підключено до MongoDB");
  } catch (error) {
    console.error("❌ Помилка MongoDB:", error);
    process.exit(1);
  }
}

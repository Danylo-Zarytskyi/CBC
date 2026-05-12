import mongoose from "mongoose";

export default async function dbRunner() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Підключено до MongoDB");
  } catch (error) {
    console.error("❌ Помилка MongoDB:", error);
    process.exit(1);
  }
}

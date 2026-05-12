import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedWorks } from "./worksSeed.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.DB_URL);

  console.log("🔥 DB connected");

  await seedWorks();

  console.log("✅ Seeds done");

  process.exit();
};

run();

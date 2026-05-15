import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import orderRoutes from "./routes/orderRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import serviceRoutes from "./routes/serviceRoute.js";
import popularServicesRoute from "./routes/popularServicesRoute.js";
import workRoute from "./routes/workRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Перевірка і створення папки uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Папку 'uploads' створено");
}

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cbc-oman.onrender.com"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet з налаштуваннями для файлів
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  }),
);

// ✅ STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/popular-services", popularServicesRoute);
app.use("/api/works", workRoute);

// 404
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Маршрут не знайдено" });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Помилка:", err.stack);
  res.status(500).json({
    success: false,
    message: "Щось пішло не так!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});

export default app;

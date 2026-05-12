import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import orderRoutes from "./routes/orderRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import serviceRoutes from "./routes/serviceRoute.js";
import popularServicesRoute from "./routes/popularServicesRoute.js";
import workRoute from "./routes/workRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// ✅ STATIC FILES
app.use("/uploads", express.static("uploads"));

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
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Щось пішло не так!" });
});

export default app;

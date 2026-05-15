import app from "../../server.js";

export default function httpRunner() {
  const PORT = process.env.PORT || 4000;

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Сервер запущено на порту ${PORT}`);
  });

  server.on("error", (err) => {
    console.error("❌ Server error:", err);
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled rejection:", err);
    process.exit(1);
  });
}

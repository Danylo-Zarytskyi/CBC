import app from "../../server.js";

export default async function httpRunner() {
  const PORT = process.env.PORT || 4000;

  try {
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Помилка запуску сервера:", error);
    process.exit(1);
  }
}

import app from "../../server.js";

const httpRunner = () => {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server on ${PORT}`);
  });
};

export default httpRunner;

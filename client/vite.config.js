import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["www.cbcstryi.top", "cbcstryi.top", "cbc-oman.onrender.com"],
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: ["www.cbcstryi.top", "cbcstryi.top", "cbc-oman.onrender.com"],
  },
});

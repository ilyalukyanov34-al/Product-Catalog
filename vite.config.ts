import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Product-Catalog/",
  plugins: [react()],
  optimizeDeps: {
    include: ["react-paginate"],
  },
});

import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."), 
    },
  },
});

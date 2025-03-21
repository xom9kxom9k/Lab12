import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // admin: resolve(__dirname, "src/admin.html"),
      },
    },
  },
});

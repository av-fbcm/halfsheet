import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Stamped into the app at build time so you can tell at a glance which build is
// installed. Without this, an old installer looks identical to a new one.
const BUILD_STAMP = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

export default defineConfig({
  plugins: [react()],
  base: "./",  // required for Electron — loads assets with relative paths
  define: {
    __BUILD_STAMP__: JSON.stringify(BUILD_STAMP),
  },
});

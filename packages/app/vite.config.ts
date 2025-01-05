import { defineConfig } from "vite";
// react 插件
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:1337",
      },
    },
  },
  plugins: [reactRefresh()],
});

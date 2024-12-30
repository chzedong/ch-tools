import vite, { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:1337",
      },
    },
    // 模拟一个接口
  },
});
    
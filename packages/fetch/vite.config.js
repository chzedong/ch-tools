import vite from "vite";
import path from "path";

export default vite.defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["three"],
    },
    output: {
      // 输出文件名
      entryFileNames: "[name].js",
      dir: path.resolve(__dirname, "../../lib"),
      format: ["es", "cjs"],
    },
  },
});
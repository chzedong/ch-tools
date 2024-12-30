
import vite from "vite";
import path from "path";

export default vite.defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", 'cjs'],
    },
    minify: true,
    rollupOptions: {

      output: {
        // 输出文件名
        dir: path.resolve(__dirname, "../../lib"),
      },
    },
  },
});

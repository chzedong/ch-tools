
import vite from "vite";
import path from "path";

export default vite.defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      formats: ["es", 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    minify: true,
    rollupOptions: {
      output: {
        dir: path.resolve(__dirname, "dist"),
      },
    },
  },
});

export default {
  base: "./",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        details: "details.html",
      },
      output: {
        assetFileNames: `[name].[ext]`,
      },
    },
  },
};

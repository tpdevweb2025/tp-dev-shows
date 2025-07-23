export default {
  base: "./",
  publicDir: "public",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/main.js",
        index: "index.html",
        details: "details.html",
      },
    },
  },
};

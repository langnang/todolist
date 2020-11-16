module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "/ToDoList/" : "/",
  devServer: {
    port: 9501,
    https: true,
    proxy: {
      "/github-api": {
        target: "https://api.github.com/",
        pathRewrite: {
          "^/github-api": "",
        },
      },
      "/github": {
        target: "https://github.com/",
        pathRewrite: {
          "^/github": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "待办事项列表"; // 自定义标题
      return args;
    });
  },
};

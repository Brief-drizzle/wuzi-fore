"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  // 关闭eslint的校验
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:8080`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
    // proxy: {
    //   "/api": {
    //     target: `http://81.68.251.67:8080`,
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
  },
  //路径重写配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },

  //打包规则配置
  //规则配置
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};

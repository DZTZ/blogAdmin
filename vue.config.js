const path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  // path.join()方法用于连接路径
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: "docs",
  configureWebpack: {
    resolve: {
      alias: {
        //按需引入 antd icon
        "@ant-design/icons/lib/dist$": resolve("./src/antd/icons.js")
      }
    },
    plugins: [
      // new CompressionPlugin({
      //   test: /\.(js|css)?$/i, // 哪些文件要压缩
      //   filename: "[path].gz[query]", // 压缩后的文件名
      //   algorithm: "gzip", // 使用gzip压缩
      //   minRatio: 1, // 压缩率小于1才会压缩
      //   deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
      // })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  }
  // assetsDir: 'static',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.wjjl.cool', // 测试
  //       ws: false,
  //       changeOrigin: true,
  //     }
  //   }
  // },
};

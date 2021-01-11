const path = require("path");
function resolve(dir) {
  // path.join()方法用于连接路径
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": resolve("./src/antd/icons.js")
      }
    }
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

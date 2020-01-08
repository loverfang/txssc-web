'use strict'
// 配置学习地址 https://webpack.docschina.org/configuration/dev-server/
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '号码验证系统' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // 部署应用时的基本 URL
  publicPath: '/',
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'res/admin/',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    port: port,
    open: true,
    overlay: {
      // 如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
      // 如果你只想看 error ，不想看 warning。
      warnings: false,
      errors: true
    },
    proxy: {
      //   // change xxx-api/login => mock/login
      //   // detail: https://cli.vuejs.org/config/#devserver-proxy
      //   [process.env.VUE_APP_BASE_API]: {
      //     target: `http://127.0.0.1:${port}/mock`,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       ['^' + process.env.VUE_APP_BASE_API]: ''
      //     }
      //   }
      [process.env.VUE_APP_BASE_API]: {
        // 设置你调用的接口域名和端口号 别忘了加http
        host: "0.0.0.0",
        target: 'http://txapi.maingoo.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
          // 这里理解成用‘/api’代替target里面的地址，
          // 后面组件中我们掉接口时直接用api代替 比如我要调
          // 用'http://40.00.100.100:3002/user/add',
          // 直接写‘/api/user/add’即可
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set preserveWhitespace
    config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions.preserveWhitespace = true
          return options
        })
        .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
        .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

    config
        .when(process.env.NODE_ENV !== 'development',
            config => {
              config
                  .plugin('ScriptExtHtmlWebpackPlugin')
                  .after('html')
                  .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/
                  }])
                  .end()
              config
                  .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                  },
                  elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
              config.optimization.runtimeChunk('single')
            }
        )
  }
}

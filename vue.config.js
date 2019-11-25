const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  /* 部署应用包时的基本 URL */
  publicPath: process.env.BASE_URL,
  /* 关闭生产环境的 source map */
  productionSourceMap: false,
  /* 开发服务器配置 */
  devServer: {
    /* 是否自动打开浏览器 */
    open: true,
    host: '0.0.0.0',
    port: '8080',
    disableHostCheck: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        /* 全局注入变量 */
        data: `@import "_scss/var.scss";`
      },
      postcss: {
        plugins: [
          /* css自动补全前缀 */
          require('autoprefixer'),
          /* 自动进行px2rem */
          require('postcss-plugin-px2rem')({
            /* 排除node_module文件夹 */
            exclude: /(node_module)/,
            /* 设置最小要转换的像素值 */
            minPixelValue: 3
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_axios', resolve('src/libs/axios/modules'))
      .set('_scss', resolve('src/assets/scss'))
      .set('_images', resolve('src/assets/images'))
      .set('_views', resolve('src/views'))
  }
}

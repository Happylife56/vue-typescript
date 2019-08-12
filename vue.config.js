const path = require('path')

const resolve = dir => path.join(__dirname, dir)


module.exports = {
    /** 区分打包环境与开发环境
     */
    // 基本路径
    baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/static/erp/',
    // 输出文件目录
    outputDir: '../docker/dist/static/erp',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    chainWebpack: config => {
        // 设置静态路径的别名
        config.resolve.alias
            .set('components', resolve('src/components'))
    },
    configureWebpack: () => {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            sass: {
                // @/ 是 src/ 的别名
                // 全局变量
                data: `@import "@/styles/common.scss";`
            },
            postcss: {
                // options here will be passed to postcss-loader
                // plugins: [require('postcss-px2rem')({
                //   remUnit: 75
                // })]
            }
        }
    },
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        // host: 'shop1.deeptel.com.cn',
        host: 'localhost',
        port: 8082,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            // proxy table example
            '/shops': {
                // target: 'http://192.168.11.61:8081',
                // target: 'https://shop.deeptel.com.cn',
                target: 'http://192.168.11.210:8081',
                changeOrigin: true,
                pathRewrite: {
                    // 如果接口本身没有/api需要通过pathRewrite来重写了地址
                    //   '^api': ''
                }
            }
        }
        // before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
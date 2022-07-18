// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const root = path.resolve(__dirname, resolveApp('src'))
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    port: 8095,
  },

  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        sourceMap: true,
        prependData: `
          @import "@/scss/mixins.scss";
          @import "@/scss/functions.scss";
        `,
      },
    },
  },

  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, resolveApp('static/noscript')),
          to: 'static/noscript',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/init-loader')),
          to: 'static/init-loader',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/env.js')),
          to: 'static/env.js',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/branding')),
          to: 'static/branding',
        },
      ]),
    ],
    resolve: {
      symlinks: false,
      alias: {
        '@': `${root}/`,
        '@static': path.resolve(__dirname, resolveApp('static')),
        '@scss': `${root}/scss`,
      },
    },
  },

  chainWebpack: config => {
    // Pre-fetching ALL the chunks harms the app performance
    config.plugins.delete('prefetch')

    // Fix issue with url(...) imports in SASS
    const moduleTypes = ['vue-modules', 'vue', 'normal-modules', 'normal']
    moduleTypes.forEach(rule => {
      config.module.rule('scss')
        .oneOf(rule)
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap(options => ({
          ...options,
          sourceMap: true,
        }))
    })
  },
}

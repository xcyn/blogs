/* eslint-disable*/
const path = require('path');
const  UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  publicPath: './',

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', 'ts'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      },
    },
    devtool: process.env.NODE_ENV !== 'production' && 'source-map' 
  },

  chainWebpack: (config) => {
    // 官网相关配置
    config.module
      .rule('ts')
      .use('ts-loader')
    config.module  
      .rule('ts')
      .use('babel-loader')
    config.module    
      .rule('ts')
      .use('cache-loader')
    config
      .plugin('fork-ts-checker')
  },

  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 4000,
    disableHostCheck: true,
    proxy: {
      routerBase: {
        target: `0.0.0.0`,
        changeOrigin: true,
        pathRewrite: { '^/loveBhs': '/' },
      },
    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
};

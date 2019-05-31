/* eslint-disable*/
const path = require('path');
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  css: {
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
      '/api': {
        target: `http://test153.suanshubang.com`,
        changeOrigin: true,
        pathRewrite: { '/api': '' },
      },
    },
  },
};

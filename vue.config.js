const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = {
  publicPath: '/plume',
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      });
      return definitions;
    });
    config.resolve.alias.set('@', path.resolve(__dirname, 'src/'));
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://apis.data.go.kr',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    
  },
};

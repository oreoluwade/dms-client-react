const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    open: true
  }
});

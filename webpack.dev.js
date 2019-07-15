const webpack = require('webpack');
const dotenv = require('dotenv');
const merge = require('webpack-merge');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const baseConfig = require('./webpack.common');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval',
  plugins: [new webpack.DefinePlugin(envKeys), new WebpackBundleAnalyzer()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    open: true
  }
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
      'process.env.CLOUDNAME': JSON.stringify(process.env.CLOUDNAME),
      'process.env.UPLOAD_PRESET': JSON.stringify(process.env.UPLOAD_PRESET),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SIGNED_PRESET': JSON.stringify(process.env.SIGNED_PRESET),
      'process.env.CLOUD_KEY': JSON.stringify(process.env.CLOUD_KEY),
      'process.env.CLOUD_SECRET': JSON.stringify(process.env.CLOUD_SECRET)
    }),
    new CompressionPlugin()
  ]
};

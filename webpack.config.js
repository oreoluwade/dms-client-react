const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
  const env = dotenv.config().parsed;
  console.log('glassboom', env);

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './public/src/index.js',
    devtool: env['NODE_ENV'] === 'development' ? 'eval' : 'source-map',
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
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
      new CleanWebpackPlugin(path.resolve(__dirname, 'dist'), {
        verbose: true,
        dry: false,
        allowExternal: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: './dist',
      hot: true,
      publicPath: '/',
      historyApiFallback: true
    }
  };
};

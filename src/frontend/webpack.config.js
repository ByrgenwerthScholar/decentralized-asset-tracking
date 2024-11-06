// src/frontend/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
    assetModuleFilename: 'images/[name][ext]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../../types/'),
      // Ensure no alias conflicts with './styles'
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3001, // Ensure this matches the port you're using
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

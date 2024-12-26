// src/electron/webpack.config.js
const path = require('path');

const commonConfig = {
  mode: process.env.NODE_ENV || 'development',
  context: path.resolve(__dirname),
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // or 'ts-loader' if you prefer
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

const mainConfig = {
  ...commonConfig,
  target: 'electron-main',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};

const preloadConfig = {
  ...commonConfig,
  target: 'electron-preload', // or 'electron-renderer' if appropriate
  entry: './src/preload.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'preload.js',
  },
};

module.exports = [mainConfig, preloadConfig];

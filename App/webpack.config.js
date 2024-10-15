// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'], // Apply CSS-related loaders
      },
      {
        test: /\.tsx?$/, // Rule for TypeScript files (.ts and .tsx)
        exclude: /node_modules/, // Exclude node_modules directory
        use: 'babel-loader', // Apply Babel loader to transpile TS/JS code
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

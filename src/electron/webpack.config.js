// electron/webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    fallback: {
      // Remove fallback for native Node modules (leave to Electron to handle)
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify"),
    },
  },
  externals: {
    // Ensure native modules are available at runtime
    fsevents: "commonjs fsevents",
    fs: 'commonjs fs',
    path: 'commonjs path',
    electron: 'commonjs electron',
    child_process: 'commonjs child_process',
    'electron-reload': 'commonjs electron-reload',
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

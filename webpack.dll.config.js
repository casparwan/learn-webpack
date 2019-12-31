const webpack = require('webpack');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    vendors: ['react', 'lodash', 'react-dom'],
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'static/dll'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      // This must match the output.library option above
      name: '[name]_lib',
    }),
  ],
};

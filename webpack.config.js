const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './web/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './web/index.html',
      filename: './index.html',
    }),
    new CopyPlugin([{ from: './web/assets', to: 'assets' }]),
    new WebpackShellPlugin({
      onBuildEnd: ['babel-watch server/index.js'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

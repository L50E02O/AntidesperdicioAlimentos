const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'adminApp', // 👈 debe coincidir con el shell
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/App.vue', // 👈 componente principal
      },
      shared: ['vue'],
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new VueLoaderPlugin(),
  ],
};
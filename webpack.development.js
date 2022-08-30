const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    static: './dist',
    historyApiFallback: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader', 
          {
            loader: "sass-loader",
            options: {
              implementation: require.resolve("sass"),
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Arkink',
      template: 'src/static/index.html',
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
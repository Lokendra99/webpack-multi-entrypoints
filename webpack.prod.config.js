const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'entr-101':'./src/entry-one.js',
    'entr-102':'./src/entry-two.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  optimization:{
    splitChunks:{
      chunks:'all',
      minSize: 1000,
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(txt)$/,
        type: "asset/source",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename:'entry-101.html',
      chunks:['entr-101'],
      minify:false
    }),
    new HtmlWebpackPlugin({
      filename:'entry-102.html',
      chunks:['entr-102'],
      minify:false
    })
  ],
};

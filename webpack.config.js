const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssHotLoader = require("css-hot-loader");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
          test: /\.css$/,
          use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
          ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css'}),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

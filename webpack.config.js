const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssHotLoader = require("css-hot-loader");

module.exports = {
    entry: {
        'bundle.min.css': [
            path.resolve(__dirname, 'src/style.scss'),
            path.resolve(__dirname, 'src/normalize.css')
        ],
        'bundle.js': [
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        historyApiFallback: true
    },
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
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
        },
      {
          test: /\.css$/,
          use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
          ]
      },
        {
            test: /\.scss$/,
            use: [
                {loader: "style-loader" },
                {loader: "css-loader"},
                {loader: "sass-loader"}
            ]
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.scss'}),

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

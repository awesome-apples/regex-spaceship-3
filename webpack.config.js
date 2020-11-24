"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],

  // devServer: {
  //   contentBase: './public',
  //   inline: true,
  //   hot: true
  // },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
    filename: "bundle.js",
  },

  module: {
    // rules: [
    //   //   {
    //   //     test: [ /\.vert$/, /\.frag$/ ],
    //   //     use: 'raw-loader'
    //   //   }
    //   {
    //     test: /\.m?js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["@babel/preset-env"],
    //       },
    //     },
    //   },
    // ],
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
};

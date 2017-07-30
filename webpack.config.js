const path = require('path');
const Dotenv = require('dotenv-webpack');
const isProduction = process.env.NODE_ENV === "production";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const extractSass = new ExtractTextPlugin({
  filename: "dropkick.css"
});

const plugins = [ extractSass, new Dotenv(), HtmlWebpackPluginConfig ];
// minify the output
if (isProduction)  { plugins.push(new UglifyJSPlugin()); }

module.exports = {
  entry: ['./src/dropkick.js', './src/css/dropkick.scss'],
  output: {
    filename: 'dropkick.js',
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins
};

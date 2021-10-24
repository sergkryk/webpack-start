const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = '';
const isDev = process.env.NODE_ENV !== 'production';
isDev ? mode = 'development' : mode = 'production';

module.exports = {
  mode: mode,
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [`html-loader`]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]'
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }
};
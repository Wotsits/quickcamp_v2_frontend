const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv')

// this will update the process.env with environment variables in .env file
dotenv.config();


module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: {
            loader: 'svg-url-loader',
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
   })
  ],
};

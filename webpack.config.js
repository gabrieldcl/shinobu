require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  entry:  {
    app: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    mainFields: ['main']
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            '@babel/preset-typescript',
            [
              '@babel/preset-env',
              { targets: { node: true } }
            ]
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-optional-chaining'
          ]
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.SHINOBU_AUTH_TOKEN': JSON.stringify(process.env.SHINOBU_AUTH_TOKEN),
      'process.env.WEBPACK_BUILD': JSON.stringify(true)
    })
  ]
}

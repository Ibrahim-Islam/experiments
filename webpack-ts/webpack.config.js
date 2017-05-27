var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Optimize = webpack.optimize;

module.exports = {
  entry: {
    app: './src/app/app.ts',
    vendor: './src/app/vendor.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules:[
        {
          test: /\.ts$/,
          use: ['awesome-typescript-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader']
          })
        }
      ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/public')
    }]),
    new Optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new Optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ]
};
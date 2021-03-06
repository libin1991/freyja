/**
 * Created by bangbang93 on 16/9/20.
 */
'use strict';
const path = require('path');
const projectRoot = path.resolve(__dirname, './src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let config = (function(){
  let config = {
    build: {
      devtool: false,
    },
    dev: {
      devtool: '#source-map',
    },
  };
  return config[IS_PRODUCTION? 'build' : 'dev']
})();
module.exports = Object.assign(config, {
  name: 'freyja',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, '../node_modules'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            css: 'vue-style-loader!css-loader',
          },
          extractCss: IS_PRODUCTION
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: IS_PRODUCTION ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'vue-style-loader',
        }) : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        loader: IS_PRODUCTION ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize!sass-loader',
          fallback: 'vue-style-loader',
        }) : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
});

function assetsPath (_path) {
  const assetsSubDirectory = 'static';
  return path.join(assetsSubDirectory, _path)
}

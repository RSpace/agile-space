var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

var ENTRY_POINTS = [
  './src/js/entrypoint'
];

var JS_LOADERS = [
  'babel?cacheDirectory&presets[]=react,presets[]=es2015,presets[]=stage-0'
];

module.exports = {
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: 'bundle.js',
    path: './build',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components|vr-markup)/,
        loaders: JS_LOADERS,
        test: /\.js$/,
      }
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.json'],
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: [
      'src/js',
      'node_modules',
    ]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  devtool: 'source-map'
};

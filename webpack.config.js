var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

var ENTRY_TO_OUTPUT = {
  './src/js/entrypoint': 'bundle.js',
  './src/js/faq': 'faq.js'
};

var JS_LOADERS = [
  'babel?cacheDirectory&presets[]=react,presets[]=es2015,presets[]=stage-0'
];

module.exports = Object.keys(ENTRY_TO_OUTPUT).map(function(entry) {
  return {
    entry: entry,
    output: {
      // Bundle will be served at /bundle.js locally.
      filename: ENTRY_TO_OUTPUT[entry],
      path: './build',
      publicPath: '/',
    },
    module: {
      noParse: [
        /node_modules\/aframe\/dist\/aframe.js/,
        /node_modules\/webvr-polyfill\/build\/webvr-polyfill.js/
      ],
      loaders: [
        {
          // JS.
          exclude: /(node_modules|bower_components|vr-markup)/,
          loaders: JS_LOADERS,
          test: /\.js$/,
        },
        {
          // Images
          test: /\.png|jpg$/,
          loader: "url-loader?limit=10000"
        },
        {
          // CSS Modules
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          exclude: /node_modules/
        },
        {
          // Global CSS in node modules
          test: /\.css$/,
          loader: 'style!css-loader',
          include: /node_modules/
        },
        {
          // JSON
          test: /\.json$/,
          loader: 'json-loader'
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
  }
});

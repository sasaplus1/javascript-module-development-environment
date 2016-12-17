'use strict';

const path = require('path');

const webpack = require('webpack');

const {
  name,
  repository,
  version,
} = require('./package');

module.exports = {

  context: __dirname,

  target: 'web',

  entry: './index.js',

  output: {
    path: __dirname,
    filename: '[name].js',
    library: [
      name.replace(/-[a-z]/g,
        (s) => s.slice(1).toUpperCase()
      ),
    ],
    libraryTarget: 'umd',
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },

  node: {
    Buffer: false,
    process: false,
  },

  resolve: {
    extensions: [
      '',
      '.js',
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin,
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.BannerPlugin([
      `@license ${name}.js ver.${version} Copyright(c) 2016 sasa+1`,
      repository.url.replace(/\.git$/i, ''),
      'Released under the MIT license.',
    ].join('\n'), {
      options: {
        raw: false,
        entryOnly: true,
      },
    })
  ],

};

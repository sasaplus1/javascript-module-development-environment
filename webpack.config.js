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

  node: {
    Buffer: false,
    process: false,
  },

  resolve: {
    extensions: [
      '.js',
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.BannerPlugin({
      banner: [
        `@license ${name}.js ver.${version} Copyright(c) 2017 sasa+1`,
        repository.url.replace(/\.git$/i, ''),
        'Released under the MIT license.',
      ].join('\n'),
      entryOnly: true,
      raw: false,
    })
  ],

};

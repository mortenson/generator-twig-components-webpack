const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const fs = require('fs');

const module_config = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules\/(?!twig-components))/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        }
      }
    },
    {
      test: /\.twig$/,
      use: [
        { loader: 'raw-loader' },
        { loader: 'inline-source-loader' }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ],
    }
  ],
};

module.exports = [
  {
    entry: [
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
      './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      './components.js'
    ],
    output: {
      filename: 'dist/components.bundled.js'
    },
    devServer: {
      inline: false,
      open: true,
      host: '0.0.0.0'
    },
    module: module_config,
    plugins: [
      new MinifyPlugin()
    ]
  },
  {
    entry: [
      './components.js'
    ],
    output: {
      filename: 'dist/components.js'
    },
    externals: {
      'twig': 'Twig'
    },
    module: module_config,
    plugins: [
      new MinifyPlugin()
    ]
  },
  {
    entry: [
      './templates.js'
    ],
    output: {
      filename: 'dist/templates.js',
      libraryTarget: 'commonjs2'
    },
    module: module_config,
    plugins: [
      new WebpackOnBuildPlugin(function(stats) {
        if (fs.existsSync(__dirname + '/dist/templates.js')) {
          const templates = require(__dirname + '/dist/templates.js');
          fs.writeFileSync(__dirname + '/dist/templates.json', JSON.stringify(templates, null, 2));
        }
      }),
    ],
    target: 'node'
  }
];

const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const fs = require('fs');
const glob = require('glob');

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

/**
 * This is a "clever" way of creating an entry point for each Twig component
 * relative to the root directory. If you have a more complex setup, you may
 * want to hard code the entryObject/entryArray like so:
 * const entryObject = {
 *   'my-component': './components/my-component/my-component.js',
 * };
 * const entryArray  = [
 *   './components/my-component/my-component.js',
 * ];
 * The property names in entryObject matches the output filename in dist.
 */
let matches = glob.sync('./*/*.js', {
  ignore: ['./dist/**', './node_modules/**'],
});
let entryObject = {}, entryArray = [], name;
for (let i in matches) {
  if (matches.hasOwnProperty(i)) {
    name = path.basename(matches[i], '.js');
    entryObject[name] = matches[i];
    entryArray.push(matches[i]);
  }
}

module.exports = [
  {
    entry: [
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
    ].concat(entryArray),
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
    entry: entryArray,
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
    entry: entryObject,
    output: {
      filename: 'dist/[name].js'
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
        if (fs.existsSync(`${__dirname}/dist/templates.js`)) {
          const templates = require(`${__dirname}/dist/templates.js`);
          fs.writeFileSync(`${__dirname}/dist/templates.json`, JSON.stringify(templates, null, 2));
          for (let tag in templates) {
            if (templates.hasOwnProperty(tag)) {
              fs.writeFileSync(`${__dirname}/dist/${tag}.twig`, templates[tag]);
            }
          }
        }
      }),
    ],
    target: 'node'
  }
];

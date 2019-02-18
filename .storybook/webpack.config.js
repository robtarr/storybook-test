const webpack = require('webpack');
const { resolve } = require('path');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.module.rules.push(
    {
      test: /\.js$/,
      include: [/packages/, /polyfill/, /-entry/],
      exclude: [/-spec\.js/, /-story\.js/],
      use: 'babel-loader',
    }
  );

  storybookBaseConfig.resolve.modules = [
    'node_modules',
    'packages/**/node_modules'
  ];

  return storybookBaseConfig;
};

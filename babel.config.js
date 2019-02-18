module.exports = function config(api) {
  api.cache.never();

  const presets = [
    '@babel/preset-react',
    ['@babel/env', {
      targets: { chrome: '58', ie: '11' },
    }],
  ];

  return { presets };
};

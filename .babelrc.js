const plugins = [
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  require.resolve('@babel/plugin-proposal-class-properties'),
  require.resolve('babel-plugin-styled-components'),
];

module.exports = {
  presets: [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-flow'),
  ],
  env: {
    cjs: {
      presets: [require.resolve('@babel/preset-env')],
      plugins,
    },
    es: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
          },
        ],
      ],
      plugins,
    },
  },
};

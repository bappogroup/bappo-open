const plugins = [
  [require.resolve('@babel/plugin-transform-flow-strip-types'), false],
  require.resolve('@babel/plugin-transform-destructuring'),
  [
    require.resolve('@babel/plugin-proposal-class-properties'),
    {
      loose: true,
    },
  ],
  require.resolve('babel-plugin-lodash'),
  require.resolve('babel-plugin-styled-components'),
];

module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-react'),
      {
        useBuiltIns: true,
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ],
  overrides: [
    {
      exclude: /\.tsx?$/,
      plugins: [require.resolve('@babel/plugin-transform-flow-strip-types')],
    },
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

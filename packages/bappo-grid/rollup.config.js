// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';

const babelConfig = {
  presets: [
    [
      require('@babel/preset-env').default,
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        useBuiltIns: true,
      },
    ],
    [require('@babel/preset-typescript').default],
  ],
  plugins: [
    [require('@babel/plugin-transform-flow-strip-types').default, false],
    [
      require('@babel/plugin-transform-destructuring').default,
      {
        loose: false,
        selectiveLoose: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer',
          'useCallback',
          'useMemo',
          'useRef',
          'useImperativeHandle',
          'useLayoutEffect',
          'useDebugValue',
        ],
      },
    ],
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true,
      },
    ],
    [
      require('@babel/plugin-proposal-object-rest-spread').default,
      {
        useBuiltIns: true,
      },
    ],
    require.resolve('babel-plugin-lodash'),
    require.resolve('babel-plugin-styled-components'),
  ],
  overrides: [
    {
      exclude: /\.tsx?$/,
      plugins: [require('@babel/plugin-transform-flow-strip-types').default],
    },
  ],
};

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [babel(babelConfig)],
  },
];

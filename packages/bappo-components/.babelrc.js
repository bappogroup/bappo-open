const useESModules = process.env.BABEL_ENV === 'es';

module.exports = {
  presets: [
    [
      // Latest stable ECMAScript features
      require('@babel/preset-env').default,
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Do not transform modules to CJS
        modules: useESModules ? false : 'commonjs',
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    [require('@babel/preset-typescript').default],
  ],
  plugins: [
    // Strip flow types before any other transform, emulating the behavior
    // order as-if the browser supported all of the succeeding features
    // https://github.com/facebook/create-react-app/pull/5182
    // We will conditionally enable this plugin below in overrides as it clashes with
    // @babel/plugin-proposal-decorators when using TypeScript.
    // https://github.com/facebook/create-react-app/issues/5741
    [require('@babel/plugin-transform-flow-strip-types').default, false],
    // Necessary to include regardless of the environment because
    // in practice some other transforms (such as object-rest-spread)
    // don't work without it: https://github.com/babel/babel/issues/7215
    [
      require('@babel/plugin-transform-destructuring').default,
      {
        // Use loose mode for performance:
        // https://github.com/facebook/create-react-app/issues/5602
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
    // class { handleClick = () => { } }
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true,
      },
    ],
    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require('@babel/plugin-proposal-object-rest-spread').default,
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules,
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

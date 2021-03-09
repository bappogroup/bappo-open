// https://github.com/facebook/create-react-app/blob/v4.0.3/packages/babel-preset-react-app/create.js
const useESModules = process.env.BAPPO_OUTPUT === 'es';

module.exports = {
  presets: [
    [
      // Latest stable ECMAScript features
      require('@babel/preset-env').default,
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        corejs: 3,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
        modules: useESModules ? false : 'commonjs',
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        runtime: 'automatic',
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
    // Disabled as it's handled automatically by preset-env, and `selectiveLoose` isn't
    // yet merged into babel: https://github.com/babel/babel/pull/9486
    // Related: https://github.com/facebook/create-react-app/pull/8215
    // [
    //   require('@babel/plugin-transform-destructuring').default,
    //   {
    //     // Use loose mode for performance:
    //     // https://github.com/facebook/create-react-app/issues/5602
    //     loose: false,
    //     selectiveLoose: [
    //       'useState',
    //       'useEffect',
    //       'useContext',
    //       'useReducer',
    //       'useCallback',
    //       'useMemo',
    //       'useRef',
    //       'useImperativeHandle',
    //       'useLayoutEffect',
    //       'useDebugValue',
    //     ],
    //   },
    // ],
    // class { handleClick = () => { } }
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true,
      },
    ],
    // Adds Numeric Separators
    require('@babel/plugin-proposal-numeric-separator').default,
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: false,
        // By default, babel assumes babel/runtime version 7.0.0-beta.0,
        // explicitly resolving to match the provided helper functions.
        // https://github.com/babel/babel/issues/10261
        version: require('@babel/runtime/package.json').version,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: false,
      },
    ],
    [
      // Remove PropTypes from production build
      require('babel-plugin-transform-react-remove-prop-types').default,
      {
        removeImport: true,
      },
    ],
    // Optional chaining and nullish coalescing are supported in @babel/preset-env,
    // but not yet supported in webpack due to support missing from acorn.
    // These can be removed once webpack has support.
    // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
    require('@babel/plugin-proposal-optional-chaining').default,
    require('@babel/plugin-proposal-nullish-coalescing-operator').default,
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

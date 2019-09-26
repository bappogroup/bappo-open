const config = require('kcd-scripts/config').lintStaged;

const kcdScripts = 'kcd-scripts';

module.exports = Object.assign(config, {
  linters: {
    '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
      `${kcdScripts} format`,
      `${kcdScripts} lint`,
      `npm run test:web -- --no-watch --passWithNoTests`,
      'git add',
    ].filter(Boolean),
  },
});

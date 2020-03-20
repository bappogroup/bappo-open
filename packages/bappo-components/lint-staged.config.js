const config = require('@bappo/scripts/config').lintStaged;

const cmd = 'bappo-scripts';

module.exports = Object.assign(config, {
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx|vue)': [
    `${cmd} format`,
    `${cmd} lint`,
    `npm run test:web -- --no-watch --passWithNoTests`,
    'git add',
  ].filter(Boolean),
});

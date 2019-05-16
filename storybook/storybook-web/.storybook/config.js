import { addParameters, configure, addDecorator } from '@storybook/react';
import centered from './decorator-centered';

const context = require.context(
  '../../storybook-native/storybook/stories/',
  true,
  /Screen\.js$/,
);

addDecorator(centered);

addParameters({
  options: {
    theme: {
      brandTitle: 'Bappo Components',
      brandUrl: 'https://bappogroup.github.io/bappo-components',
    },
    isFullScreen: false,
    showPanel: false,
  },
});

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);

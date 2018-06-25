import 'babel-polyfill';
import { setOptions } from '@storybook/addon-options';
import centered from './decorator-centered';
import { configure, addDecorator } from '@storybook/react';

const context = require.context('../', true, /Screen\.js$/);

addDecorator(centered);

setOptions({
  name: 'Bappo Components',
  url: 'https://williamfeng91.github.io/bappo-components',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);

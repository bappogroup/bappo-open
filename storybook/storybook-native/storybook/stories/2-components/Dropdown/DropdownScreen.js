/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import Example from './example';

const DropdownScreen = () => (
  <UIExplorer title="Dropdown" url="2-components/Dropdown">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/Dropdown"
      text="Source Code"
    />
    <WebLink
      href="https://github.com/bappogroup/bappo-components/blob/master/storybook/storybook-native/storybook/stories/2-components/Dropdown/example.js"
      text="Example Code"
    />
    <Description>
      <AppText>Dropdown</AppText>
      <AppText>
        If the Dropdown Link is closer to the left side of the page, the
        dropdown will align with the left edge of the Button
      </AppText>
      <AppText>
        If the Dropdown Link is closer to the right side of the page. the
        dropdown will align with the right edge of the Button
      </AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('Dropdown', DropdownScreen);

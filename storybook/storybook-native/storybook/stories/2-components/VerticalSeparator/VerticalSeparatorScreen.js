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

const VerticalSeparatorScreen = () => (
  <UIExplorer title="Separator(Vertical)" url="2-components/Separator">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/primitives/VerticalSeparator"
      text="Source Code"
    />
    <WebLink
      href="https://github.com/bappogroup/bappo-components/blob/master/storybook/storybook-native/storybook/stories/2-components/VerticalSeparator/example.js"
      text="Examples Code"
    />
    <Description>
      <AppText>A vertical separator line.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add(
  'Separator(Vertical)',
  VerticalSeparatorScreen,
);

/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  storiesOf,
} from '../../../ui-explorer';
import Example from './example';

const VerticalSeparatorScreen = () => (
  <UIExplorer title="Separator(Vertical)" url="2-components/Separator">
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

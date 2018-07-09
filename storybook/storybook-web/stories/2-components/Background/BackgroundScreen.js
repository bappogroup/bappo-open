/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Example from './example';

const BackgroundScreen = () => (
  <UIExplorer title="Background" url="2-components/Background">
    <Description>
      <AppText>Background.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('Background', BackgroundScreen);

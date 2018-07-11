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

const SeparatorScreen = () => (
  <UIExplorer title="Separator" url="2-components/Separator">
    <Description>
      <AppText>Separator.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
    <DocItem name="Just a separator" description="Simple as that" />
  </UIExplorer>
);

storiesOf('Components', module).add('Separator', SeparatorScreen);

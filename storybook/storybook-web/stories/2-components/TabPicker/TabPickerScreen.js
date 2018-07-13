/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Example from './examples/tabPickerExample';

const TabPickerScreen = () => (
  <UIExplorer title="TabPicker" url="2-components/TabPicker">
    <Description>
      <AppText>Card.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('TabPicker', TabPickerScreen);

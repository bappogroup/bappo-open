/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import Example from './example';

const IconCardScreen = () => (
  <UIExplorer title="IconCard" url="2-components/IconCard">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/IconCard"
      text="Source Code"
    />
    <Description>
      <AppText>IconCard.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('IconCard', IconCardScreen);

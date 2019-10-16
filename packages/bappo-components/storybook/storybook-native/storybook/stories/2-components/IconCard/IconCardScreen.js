/* eslint-disable react/jsx-sort-props */

import React from 'react';
import { url } from '../../../url';
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
    <WebLink href={`${url}/src/components/IconCard`} text="Source Code" />
    <Description>
      <AppText>IconCard.</AppText>
    </Description>

    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/IconCard/example.js`}
      text="Examples Code"
    />
    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('IconCard', IconCardScreen);

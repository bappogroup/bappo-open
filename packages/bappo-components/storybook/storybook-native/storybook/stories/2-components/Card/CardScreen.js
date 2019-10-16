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

const CardScreen = () => (
  <UIExplorer title="Card" url="2-components/Card">
    <WebLink href={`${url}/src/components/Card`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Card/example.js`}
      text="Examples Code"
    />
    <Description>
      <AppText>A view with box shadows.</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('Card', CardScreen);

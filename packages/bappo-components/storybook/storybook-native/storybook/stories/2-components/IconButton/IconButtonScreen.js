/* eslint-disable react/jsx-sort-props */

import React from 'react';

import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import Example from './example';

const IconButtonScreen = () => (
  <UIExplorer title="IconButton" url="2-components/IconButton">
    <WebLink href={`${url}/src/components/IconButton`} text="Source Code" />
    <Description>
      <AppText>IconButton.</AppText>
    </Description>

    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/IconButton/example.js`}
      text="Examples Code"
    />
    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('IconButton', IconButtonScreen);

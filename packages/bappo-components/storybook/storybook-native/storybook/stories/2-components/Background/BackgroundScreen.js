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
import { url } from '../../../url';
const BackgroundScreen = () => (
  <UIExplorer title="Background" url="2-components/Background">
    <WebLink href={`${url}/src/components/Background`} text="Source Code" />

    <Description>
      <AppText>Background</AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('Background', BackgroundScreen);

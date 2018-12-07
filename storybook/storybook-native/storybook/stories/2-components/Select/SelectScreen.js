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

const SelectScreen = () => (
  <UIExplorer title="OldSelect" url="2-components/OldSelect">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/OldSelect"
      text="Source Code"
    />
    <Description>
      <AppText>Select</AppText>
      <AppText>
        This is the plain select component. Refer to SelectField for more usage.
      </AppText>
    </Description>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('OldSelect', SelectScreen);

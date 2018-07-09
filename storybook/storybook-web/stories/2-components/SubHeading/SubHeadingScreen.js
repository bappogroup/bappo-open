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

const SubHeadingScreen = () => (
  <UIExplorer title="SubHeading" url="2-components/SubHeading">
    <Description>
      <AppText>SubHeading.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="string"
        description="The text content of the SubHeading."
      />

      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('SubHeading', SubHeadingScreen);

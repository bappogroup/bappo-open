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

const HeadingScreen = () => (
  <UIExplorer title="Heading" url="2-components/Heading">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/Heading"
      text="Source Code"
    />
    <Description>
      <AppText>Heading.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="string"
        description="The text content of the Heading."
      />

      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Heading', HeadingScreen);

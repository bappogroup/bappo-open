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

const IconSelectorScreen = () => (
  <UIExplorer title="IconSelector" url="2-components/IconSelector">
    <WebLink href={`${url}/src/components/IconSelector`} text="Source Code" />
    <Description>
      <AppText>IconSelector.</AppText>
    </Description>

    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/IconSelector/example.js`}
      text="Examples Code"
    />
    <Section title="Props">
      <DocItem name="name?" typeInfo="string" description="Icon name." />
      <DocItem
        name="color?"
        typeInfo="string"
        description="The color of each Icon"
      />
      <DocItem name="size?" typeInfo="number" description="Size of Icon" />
      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('IconSelector', IconSelectorScreen);

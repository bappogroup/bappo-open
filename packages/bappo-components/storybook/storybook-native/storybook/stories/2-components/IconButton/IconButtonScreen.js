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
    <Section title="Props">
      <DocItem name="name?" typeInfo="string" description="Icon name." />
      <DocItem
        name="color?"
        typeInfo="string"
        description="The color of each Icon"
      />
      <DocItem
        name="size?"
        typeInfo="number | 'small' | 'medium' | 'large' "
        description="Size of Icon"
      />
      <DocItem
        name="onPress?"
        typeInfo="()=>void"
        description="Define click event"
      />
      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('IconButton', IconButtonScreen);

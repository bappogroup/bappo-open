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
import ButtonActionsExample from './examples/ButtonActionsExample';
import ButtonIconExample from './examples/ButtonIconExample';
import ButtonTypeExample from './examples/ButtonTypeExample';

const SplitButtonScreen = () => (
  <UIExplorer title="SplitButton" url="2-components/SplitButton">
    <WebLink href={`${url}/src/components/SplitButton`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/SplitButton/examples`}
      text="Examples Code"
    />

    <Description>
      <AppText>SplitButton</AppText>
      <AppText>
        The SplitButton component allows for additional actions to be executed
        by a single button
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="text?"
        typeInfo="string"
        description="The label of the primary button"
      />

      <DocItem
        name="onButtonPress"
        typeInfo="() => void"
        description="The function that is executed when the primary button is pressed"
      />

      <DocItem
        name="type?"
        typeInfo="primary | secondary | tertiary | destructive"
        example={{
          render: () => <ButtonTypeExample />,
        }}
      />

      <DocItem
        name="actions"
        typeInfo="Array<SplitButtonAction>"
        description="Determines the additional actions made available by the button"
        example={{
          render: () => <ButtonActionsExample />,
        }}
      />

      <DocItem
        name="icon?"
        typeInfo="string"
        example={{
          render: () => <ButtonIconExample />,
        }}
      />
      <DocItem name="style?" typeInfo="style" description="Styles" />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('SplitButton', SplitButtonScreen);

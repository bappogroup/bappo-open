/* eslint-disable react/jsx-sort-props */

import React from 'react';

import UIExplorer, {
  AppText,
  Code,
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
        name="value?"
        typeInfo="string"
        description={
          <AppText>
            The value to show for the IconSelector. <Code>IconSelector</Code> is
            a controlled component, which means the native <Code>value</Code>{' '}
            will be forced to match this prop if provided. Read about how{' '}
            <AppText
              href="https://facebook.github.io/react/docs/forms.html"
              target="_blank"
            >
              React form components
            </AppText>{' '}
            work. To prevent user edits to the value set{' '}
            <Code>{'readOnly={true}'}</Code>.
          </AppText>
        }
      />
      <DocItem
        name="onValueChange"
        typeInfo="(value: string) => void"
        description={
          <AppText>
            Callback that is called when the user choose the Icon in the Modal.
            The Icon name is passed as an argument to the callback handler.
          </AppText>
        }
      />
      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('IconSelector', IconSelectorScreen);

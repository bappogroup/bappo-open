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
import PropDisabled from './examples/PropDisabled';
import PropIcon from './examples/PropIcon';
import PropLoading from './examples/PropLoading';
import PropTooltip from './examples/PropTooltip';
import PropType from './examples/PropType';

const ButtonScreen = () => (
  <UIExplorer title="Button" url="2-components/Button">
    <WebLink href={`${url}/src/components/Button`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Button/examples`}
      text="Examples Code"
    />

    <Description>
      <AppText>Button.</AppText>
    </Description>

    <Section title="Props">
      {/* disabled
          icon
          loading
          onPress
          text
          type */}

      <DocItem name="text?" typeInfo="string" />

      <DocItem name="onPress" typeInfo="() => void)" />

      <DocItem
        name="type?"
        typeInfo="primary | secondary | tertiary | destructive"
        example={{
          render: () => <PropType />,
        }}
      />

      <DocItem
        name="disabled?"
        typeInfo="boolean"
        example={{
          render: () => <PropDisabled />,
        }}
      />

      <DocItem
        name="icon?"
        typeInfo="string"
        example={{
          render: () => <PropIcon />,
        }}
      />

      <DocItem
        name="loading?"
        typeInfo="boolean"
        example={{
          render: () => <PropLoading />,
        }}
      />

      <DocItem
        name="tooltip?"
        typeInfo="string"
        example={{
          render: () => <PropTooltip />,
        }}
      />

      <DocItem name="style?" typeInfo="style" description="Styles" />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Button', ButtonScreen);

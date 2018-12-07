/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import PropType from './examples/PropType';
import PropDisabled from './examples/PropDisabled';
import PropIcon from './examples/PropIcon';
import PropLoading from './examples/PropLoading';

const ButtonScreen = () => (
  <UIExplorer title="Button" url="2-components/Button">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/Button"
      text="Source Code"
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

      <DocItem name="style?" typeInfo="style" description="Styles" />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Button', ButtonScreen);

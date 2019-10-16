/* eslint-disable react/jsx-sort-props */

import React from 'react';
import { url } from '../../../url';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import PropColor from './examples/PropColor';
import PropName from './examples/PropName';
import PropSize from './examples/PropSize';
import PropBadge from './examples/PropBadge';

const AvatarScreen = () => (
  <UIExplorer title="Avatar" url="2-components/Avatar">
    <WebLink href={`${url}/src/components/Avatar`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Avatar/examples`}
      text="Examples Code"
    />

    <Description>
      <AppText>Avatar</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="backgroundColor"
        typeInfo="Colors"
        description="Background color."
        example={{
          render: () => <PropColor />,
        }}
      />

      <DocItem
        name="icon?"
        typeInfo="string"
        description="Icon name. If specified, displays the icon instead of text."
      />

      <DocItem
        name="name?"
        typeInfo="string"
        description="User name. The initial of the user name is displayed by default."
        example={{
          render: () => <PropName />,
        }}
      />

      <DocItem
        name="size?"
        typeInfo="large | medium"
        description="Avatar size."
        example={{
          render: () => <PropSize />,
        }}
      />

      <DocItem
        name="badge?"
        typeInfo="number"
        description="Notification."
        example={{
          render: () => <PropBadge />,
        }}
      />

      <DocItem name="style?" typeInfo="style" description="Styles" />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Avatar', AvatarScreen);

/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  storiesOf,
  WebLink,
  Section,
} from '../../../ui-explorer';
import Example from './example';
import { url } from '../../../url';

const DropdownScreen = () => (
  <UIExplorer title="Dropdown" url="2-components/Dropdown">
    <WebLink href={`${url}/src/components/Dropdown`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Dropdown/example.js`}
      text="Example Code"
    />

    <Description>
      <AppText>Dropdown</AppText>
      <AppText>
        If the Dropdown Link is closer to the left side of the page, the
        dropdown will align with the left edge of the Button
      </AppText>
      <AppText>
        If the Dropdown Link is closer to the right side of the page. the
        dropdown will align with the right edge of the Button
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="React.Node"
        description="A react node to render dropdown menu above. Optional - will use an icon if not specified"
      />
      <DocItem
        name="icon?"
        typeInfo="string"
        description="An icon to render dropdown menu above. Appears when children is not present. Defaults to three vertical dots."
      />
      <DocItem
        name="actions"
        typeInfo="Array of object(icon?, label and onPress)"
        description="Determins menu items - icon, label and onPress"
      />
      <DocItem
        name="width?"
        typeInfo="Number"
        description="The width of menu items. Defaults to 300 px"
      />
    </Section>

    <DocItem
      example={{
        render: () => <Example />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('Dropdown', DropdownScreen);

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
import Example from './examples/example';
import InsideModal from './examples/InsideModal';

const InlineMenuScreen = () => (
  <UIExplorer title="Inline Menu" url="2-components/InlineMenu">
    <WebLink href={`${url}/src/components/InlineMenu`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/InlineMenu/example.js`}
      text="Example Code"
    />

    <Description>
      <AppText>Inline Menu</AppText>
      <AppText>
        If the Inline Menu Link is closer to the left side of the page, the
        dropdown will align with the left edge of the Button
      </AppText>
      <AppText>
        If the Inline Menu Link is closer to the right side of the page. the
        dropdown will align with the right edge of the Button
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="React.Node"
        description="A react node to render inline menu above. Optional - will use an icon if not specified"
      />
      <DocItem
        name="icon?"
        typeInfo="string"
        description="An icon to render inline menu above. Appears when children is not present. Defaults to three vertical dots."
      />
      <DocItem
        name="actions"
        typeInfo="Array of object(icon?, label and onPress)"
        description="Determines menu items - icon, label and onPress"
      />
      <DocItem
        name="width?"
        typeInfo="Number"
        description="The width of menu items. Defaults to 300 px"
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/2-components/InlineMenu/examples`}
        text="Examples Code"
      />
      <DocItem
        example={{
          render: () => <Example />,
        }}
      />
      <DocItem
        example={{
          render: () => <InsideModal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('InlineMenu', InlineMenuScreen);

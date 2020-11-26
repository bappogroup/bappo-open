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

const MenuScreen = () => (
  <UIExplorer title="Menu" url="2-components/Menu">
    <WebLink href={`${url}/src/components/Menu`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Menu/example.js`}
      text="Example Code"
    />

    <Description>
      <AppText>Menu</AppText>
      <AppText>
        If the Menu Link is closer to the left side of the page, the dropdown
        will align with the left edge of the Button
      </AppText>
      <AppText>
        If the Menu Link is closer to the right side of the page, the dropdown
        will align with the right edge of the Button
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="icon?"
        typeInfo="string"
        description="An icon to render inline above menu. Appears when children is not present. Defaults to three vertical dots."
      />
      <DocItem
        name="iconColor?"
        typeInfo="string"
        description="The color applied to the icon. Defaults to black."
      />
      <DocItem
        name="children"
        typeInfo="React.ReactNode"
        description="Determines the items hosted by the menu."
      />
      <DocItem
        name="minWidth?"
        typeInfo="Number"
        description="The minimum width of the menu items. Defaults to 120px."
      />
      <DocItem
        name="maxWidth?"
        typeInfo="Number"
        description="The maximum width of the menu items. If the menu items exceed this width, horizontal scrolling will be applied."
      />
      <DocItem
        name="maxHeight?"
        typeInfo="Number"
        description="The maximum height of menu items. If the menu items exceed this height, vertical scrolling will be applied. Defaults to 150px."
      />
      <DocItem
        name="align?"
        typeInfo="enum('left', 'right')"
        description="Aligns the menu items to the left or right of the menu. Defaults to left aligned if the menu is closer to the left hand side of the window."
      />
      <DocItem
        name="trigger?"
        typeInfo="React.ReactNode"
        description="Optional element to act as a menu button. If the trigger is not supplied, the icon will be used."
      />
      <DocItem
        name="triggerStyle?"
        typeInfo="CSSProperties"
        description="Optional style to apply to the menu container element."
      />
      <DocItem
        name="testID?"
        typeInfo="string"
        description={
          <AppText>Used to locate this view in end-to-end tests.</AppText>
        }
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/2-components/Menu/examples`}
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

storiesOf('Components', module).add('Menu', MenuScreen);

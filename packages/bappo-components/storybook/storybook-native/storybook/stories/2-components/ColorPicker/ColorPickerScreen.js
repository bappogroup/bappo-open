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
import ColorPickerExample from './examples/example';

const ColorPickerScreen = () => (
  <UIExplorer title="Color Picker" url="2-components/ColorPicker">
    <WebLink href={`${url}/src/components/ColorPicker`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/ColorPicker/example.js`}
      text="Example Code"
    />

    <Description>
      <AppText>Color Picker</AppText>
      <AppText>
        Color picker allows a color to be selected by selecting a color from a
        list of predefined colors or by manually entering the hexadecimal or
        RGBA values
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="hex"
        typeInfo="string"
        description="The initial color selected by the color picker."
      />
      <DocItem
        name="onClose?: (color: Color) => void"
        typeInfo="function"
        description="A callback function that is fired when the user completed the color selection."
      />
      <DocItem
        name="colors?"
        typeInfo="Array of strings"
        description="A list of predefined colors displayed as swatches."
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
        href={`${url}/storybook/storybook-native/storybook/stories/2-components/ColorPicker/examples`}
        text="Examples Code"
      />
      <DocItem
        example={{
          render: () => <ColorPickerExample />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ColorPicker', ColorPickerScreen);

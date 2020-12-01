/* eslint-disable react/jsx-sort-props */

import React from 'react';

import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import Example from './examples/tabPickerExample';
import Example2 from './examples/tabPickerExample2';

const TabPickerScreen = () => (
  <UIExplorer title="TabPicker" url="2-components/TabPicker">
    <WebLink href={`${url}/src/primitives/TabPicker`} text="Source Code" />
    <Description>
      <AppText>TabPicker</AppText>
    </Description>

    <DocItem
      name="options"
      typeInfo="$ReadOnlyArray<Option>"
      description={
        <AppText>
          An array of arbitrary objects. E.g.
          <Code>
            {`[{ value: 'one', label: 'one' }, { value: 'two', label: 'Two'}]`}
          </Code>
        </AppText>
      }
    />

    <DocItem
      name="selected"
      typeInfo="Object or Array of Objects"
      description={
        <AppText>
          <AppText>An Object (if multi is off)</AppText>
          <AppText>
            An array of objects (if multi is on), where each array item is a
            pointer to an item in the options array. eg{' '}
            <Code>
              {`options = [{ ... }, { ... }, { ... }]; selected = [options[0], options[2]];`}
            </Code>
          </AppText>
        </AppText>
      }
    />

    <DocItem
      name="optionToString"
      typeInfo="(option) => {}"
      description={
        <AppText>
          Convert an option to string for Label display, e.g.
          {` (option) => option.label `}
        </AppText>
      }
    />

    <DocItem
      name="multi"
      typeInfo="Boolean"
      description={<AppText>Enables multiple selections</AppText>}
    />

    <DocItem
      name="onChange"
      typeInfo="(selected}) => {}"
      description={
        <AppText>
          <AppText>
            If Multi if off, this function returns the selected option.
          </AppText>
          <AppText>
            {' '}
            If Multi is on, it returns an array of the selected options.{' '}
          </AppText>
        </AppText>
      }
    />

    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/TabPicker/examples`}
      text="Examples Code"
    />

    <DocItem
      description="Multi Picker"
      example={{
        render: () => <Example />,
      }}
    />

    <DocItem
      description="Single Picker"
      example={{
        render: () => <Example2 />,
      }}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('TabPicker', TabPickerScreen);

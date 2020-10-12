/* eslint-disable react/jsx-sort-props */

import { View } from 'bappo-components';
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
import BooleanProps from './examples/BooleanProps';
import Clean from './examples/Clean';
import Minimal from './examples/Minimal';
import Multi from './examples/Multi';
import PropRenderDropdownIcon from './examples/PropRenderDropdownIcon';

const SelectScreen = () => (
  <UIExplorer title="Select" url="2-components/Select">
    <WebLink
      href={`${url}/src/components/input-fields/Select`}
      text="Source Code"
    />

    <Description>
      <AppText>
        Select is the basic Select component wrapped with Bappo's stylings. It
        can be either standalone or in a form.
      </AppText>
      <AppText>
        It accepts props for basic select and props for InputFieldWrapper.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="options"
        typeInfo="array of objects"
        description="An array of all available options. Each option is an object containing 'value' and 'label'."
      />

      <DocItem
        name="onValueChange"
        typeInfo="function"
        description="Callback function fired when an option is selected."
      />

      <DocItem
        name="value?"
        typeInfo="string"
        description="Current selected option if specified. Should be the value of the option."
      />

      <DocItem
        name="multi?"
        typeInfo="boolean"
        description="Whether this field can select multiple options. Defaults to false."
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean"
        description="Disable value changes. Defaults to false."
      />

      <DocItem
        name="searchable?"
        typeInfo="boolean"
        description="If false, disables input search and user can only click on an option from dropdown. Defaults to true."
      />

      <DocItem
        name="noResultsText?"
        typeInfo="string"
        description="Message to show when no matching result found for user's input. Defaults to 'No results found'. "
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description="The short hint displayed in the input before the user enters a value. "
      />

      <DocItem
        name="isLoading?"
        typeInfo="boolean"
        description="Show a spinner to indicate async actions in progress."
      />

      <DocItem
        name="clearable?"
        typeInfo="boolean"
        description="Whether to show a cross button to clear field value. Defaults to true."
      />

      <DocItem
        name="renderDropdownIcon?"
        typeInfo="() => JSX.Element | null"
        description="Customer function to render dropdown icon."
        example={{
          render: () => <PropRenderDropdownIcon />,
        }}
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/2-components/Select/examples`}
        text="Examples Code"
      />
      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />

      <DocItem
        description="Clean version"
        example={{
          render: () => <Clean />,
        }}
      />

      <DocItem
        description="Boolean props"
        example={{
          render: () => <BooleanProps />,
        }}
      />

      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <AppText>Multiple select</AppText>
        <AppText>
          selectedValues is an array of strings (option values).
        </AppText>
      </View>

      <DocItem
        example={{
          render: () => <Multi />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Select', SelectScreen);

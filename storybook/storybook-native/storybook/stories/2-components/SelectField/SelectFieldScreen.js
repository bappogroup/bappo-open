/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';
import Multi from './examples/Multi';

const SelectFieldScreen = () => (
  <UIExplorer title="SelectField" url="2-components/SelectField">
    <Description>
      <AppText>
        SelectField is basic select wrapped with Bappo's stylings. It can be
        either standalone or in a form.
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
        name="label?"
        typeInfo="string"
        description="Label displays before the select field."
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
    </Section>

    <Section title="Examples">
      <DocItem
        description="Minimal"
        example={{
          code: `
const options = [
  { label: 'Bob Mc Donald', value: '1' },
  { label: 'Andrew Smith', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

class SelectFieldMinimalExample extends React.Component {
  state = {
    selectedValue: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <SelectField
          label="Participant"
          options={options}
          value={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        />
      </View>
    );
  }
}
          `,
          render: () => <Minimal />,
        }}
      />

      <DocItem
        description={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AppText>Multiple select</AppText>
            <AppText>
              selectedValues is an array of strings (option values).
            </AppText>
          </div>
        }
        example={{
          code: `
const options = [
  { label: 'Bob', value: '1' },
  { label: 'Andrew', value: '2' },
  { label: 'Sandra', value: '3' },
  { label: 'Peter', value: '4' },
  { label: 'Joe', value: '5' },
];

class SelectFieldMinimalExample extends React.Component {
  state = {
    selectedValues: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <SelectField
          label="All Participants"
          options={options}
          value={this.state.selectedValue}
          onValueChange={selectedValues => this.setState({ selectedValues })}
          placeholder="Add multiple participants"
          multi
        />
      </View>
    );
  }
}
          `,
          render: () => <Multi />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('SelectField', SelectFieldScreen);

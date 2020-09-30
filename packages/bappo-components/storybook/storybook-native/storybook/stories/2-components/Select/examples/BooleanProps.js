import { Select, SwitchField, View, styled } from 'bappo-components';
import React from 'react';

const options = [
  { label: 'Bob Mc Donald', value: '1' },
  { label: 'Andrew Smith', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

export default function SelectBooleanPropsExample() {
  const [value, setValue] = React.useState(null);
  const [clearable, setClearable] = React.useState(true);
  const [searchable, setSearchable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <SwitchField
          label="clearable"
          onValueChange={setClearable}
          value={clearable}
        />
        <Spacer />
        <SwitchField
          label="searchable"
          onValueChange={setSearchable}
          value={searchable}
        />
        <Spacer />
        <SwitchField
          label="isLoading"
          onValueChange={setIsLoading}
          value={isLoading}
        />
      </View>
      <View style={{ width: 300 }}>
        <Select
          clearable={clearable}
          isLoading={isLoading}
          onValueChange={setValue}
          options={options}
          searchable={searchable}
          value={value}
        />
      </View>
    </View>
  );
}

const Spacer = styled(View)`
  width: 8px;
`;

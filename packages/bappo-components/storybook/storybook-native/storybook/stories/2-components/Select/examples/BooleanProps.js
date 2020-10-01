import { Select, SwitchField, View, styled } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

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
          options={states.AU}
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

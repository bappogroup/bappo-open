import { Icon, Select, View } from 'bappo-components';
import React from 'react';

const options = [
  { label: 'Bob Mc Donald', value: '1' },
  { label: 'Andrew Smith', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

const renderDropdownIcon = () => <Icon name="calendar-today" />;

export default function SelectPropRenderDropdownIconExample() {
  const [value, setValue] = React.useState(null);

  return (
    <View style={{ width: 300 }}>
      <Select
        onValueChange={setValue}
        options={options}
        renderDropdownIcon={renderDropdownIcon}
        value={value}
      />
    </View>
  );
}

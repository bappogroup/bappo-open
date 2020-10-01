import { Icon, Select, View } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

const renderDropdownIcon = () => <Icon name="calendar-today" />;

export default function SelectPropRenderDropdownIconExample() {
  const [value, setValue] = React.useState(null);

  return (
    <View style={{ width: 300 }}>
      <Select
        onValueChange={setValue}
        options={states.AU}
        renderDropdownIcon={renderDropdownIcon}
        value={value}
      />
    </View>
  );
}

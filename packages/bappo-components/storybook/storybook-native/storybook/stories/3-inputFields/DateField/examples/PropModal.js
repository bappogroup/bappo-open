import { DateField } from 'bappo-components';
import React from 'react';

export default function PropModal() {
  const [value, setValue] = React.useState('2017-11-11');

  return (
    <DateField
      label="Birthday"
      modal={true}
      onValueChange={setValue}
      value={value}
    />
  );
}

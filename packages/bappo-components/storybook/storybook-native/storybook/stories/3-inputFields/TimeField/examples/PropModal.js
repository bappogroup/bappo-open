import { TimeField } from 'bappo-components';
import React from 'react';

export default function PropModal() {
  const [value, setValue] = React.useState('11:22:33');

  return (
    <TimeField
      label="Time"
      modal={true}
      onValueChange={setValue}
      value={value}
    />
  );
}

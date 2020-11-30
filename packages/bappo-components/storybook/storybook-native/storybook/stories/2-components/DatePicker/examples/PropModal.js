import { DatePicker } from 'bappo-components';
import React from 'react';

export default function PropModal() {
  const [value, setValue] = React.useState('2017-11-11');

  return <DatePicker modal={true} onValueChange={setValue} value={value} />;
}

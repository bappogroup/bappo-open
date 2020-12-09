import { Checkbox } from 'bappo-components';
import React from 'react';

const CheckboxMinimalExample = () => {
  const [value, setValue] = React.useState(true);

  const check = (value) => setValue(value);

  return <Checkbox onValueChange={check} checked={value} />;
};

export default CheckboxMinimalExample;

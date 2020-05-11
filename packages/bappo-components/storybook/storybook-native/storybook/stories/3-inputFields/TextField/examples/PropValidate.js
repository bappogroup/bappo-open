import { TextField } from 'bappo-components';
import React from 'react';
import { isEmail } from 'validator';

export default function TextInputValidateExample() {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      label="Email"
      validate={value =>
        value && isEmail(value) ? undefined : 'Invalid email'
      }
      value={value}
      onValueChange={setValue}
    />
  );
}

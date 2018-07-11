import React from 'react';
import { SelectField } from 'bappo-components';

const SelectFieldTypeExample = () => {
  const items = [
    { value: 'apple' },
    { value: 'pear' },
    { value: 'orange' },
    { value: 'grape' },
    { value: 'banana' },
  ];

  return <SelectField items={items} />;
};

export default SelectFieldTypeExample;

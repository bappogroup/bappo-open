import React from 'react';
import { Select } from 'bappo-components';

const SelectTypeExample = () => {
  const items = [
    { value: 'apple' },
    { value: 'pear' },
    { value: 'orange' },
    { value: 'grape' },
    { value: 'banana' },
  ];

  return <Select items={items} />;
};

export default SelectTypeExample;

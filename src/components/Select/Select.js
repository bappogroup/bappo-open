// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import TextField from '../input-fields/TextField';

type Props = {
  items: Array<any>,
  onSelect: () => void,
};

const Select = ({  }: Props) => {
  return (
    <TextField
      {...getInputProps()}
      label="Test label"
      onValueChange={e => console.log({ e })}
    />
  );
};

Select.defaultProps = {
  items: [],
};

export default Select;

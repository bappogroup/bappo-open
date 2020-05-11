import React from 'react';
import { TouchableOpacity } from 'react-native';

import { FormConfigContext } from '../Form.native/FormConfigContext';
import { useFormStateStrict } from '../FormState';
import { SubmitButtonProps } from './types';

type Props = SubmitButtonProps;

const SubmitButton = ({ children, style, testID }: Props) => {
  const formState = useFormStateStrict();
  const { onSubmit } = React.useContext(FormConfigContext)!;
  const { fieldErrors, values, actions } = formState;
  const handleSubmit = () => {
    actions.touchAll();
    if (Object.keys(fieldErrors).length === 0) {
      actions.submit(() => onSubmit && onSubmit(values));
    }
  };
  return (
    <TouchableOpacity onPress={handleSubmit} style={style} testID={testID}>
      {typeof children === 'function' ? children(formState) : children}
    </TouchableOpacity>
  );
};

export default SubmitButton;

import React from 'react';

import { Form } from '../../primitives/Form';
import { useFormStateStrict } from '../../primitives/Form/FormState';
import createButton from '../Button/createButton';
import { SubmitButtonProps } from './types';

type Props = SubmitButtonProps & {
  className?: string;
};

const Button = createButton(Form.SubmitButton);

const SubmitButton = ({
  className,
  disabled,
  icon,
  iconStyle,
  style,
  textStyle,
  testID,
  text,
  type,
}: Props) => {
  const { submitting } = useFormStateStrict();

  const props = {
    className,
    disabled,
    icon,
    iconStyle,
    style,
    textStyle,
    testID,
    text,
    type,
  };

  return <Button {...props} loading={submitting} />;
};

export default SubmitButton;

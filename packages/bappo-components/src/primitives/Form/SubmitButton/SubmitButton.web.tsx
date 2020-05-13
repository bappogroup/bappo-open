import React from 'react';

import { createTouchableViewBase } from '../../../internals/web/TouchableViewBase';
import { useFormStateStrict } from '../FormState';
import { SubmitButtonProps } from './types';

type Props = SubmitButtonProps & {
  // Will be removed
  className?: string;
};

const ButtonTouchableViewBase = createTouchableViewBase('button');

const SubmitButton = ({
  children,
  className,
  disabled,
  style,
  testID,
}: Props) => {
  const formState = useFormStateStrict();
  return (
    <ButtonTouchableViewBase
      className={className}
      disabled={disabled}
      style={style}
      type="submit"
      testID={testID}
    >
      {typeof children === 'function' ? children(formState) : children}
    </ButtonTouchableViewBase>
  );
};

export default SubmitButton;

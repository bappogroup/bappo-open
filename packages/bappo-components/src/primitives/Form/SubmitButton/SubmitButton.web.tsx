import React from 'react';

import TouchableViewBase from '../../../internals/web/TouchableViewBase';
import { useFormStateStrict } from '../FormState';
import { SubmitButtonProps } from './types';

type Props = SubmitButtonProps & {
  // Will be removed
  className?: string;
};

const SubmitButton = ({
  children,
  className,
  disabled,
  style,
  testID,
}: Props) => {
  const formState = useFormStateStrict();
  return (
    <TouchableViewBase
      className={className}
      component="button"
      disabled={disabled}
      style={style}
      type="submit"
      testID={testID}
    >
      {typeof children === 'function' ? children(formState) : children}
    </TouchableViewBase>
  );
};

export default SubmitButton;

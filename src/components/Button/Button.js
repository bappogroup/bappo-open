// @flow

import * as React from 'react';
import { ButtonLabel, StyledIcon, StyledTouchableView } from './styles';
import ButtonSpinner from './ButtonSpinner';

type Props = {
  disabled?: boolean,
  icon?: string,
  loading?: boolean,
  onPress?: () => void,
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  text?: string,
  type: 'primary' | 'secondary' | 'tertiary' | 'destructive',
  // Will be removed
  className?: string,
};

const Button = ({
  className,
  disabled,
  icon,
  loading,
  onPress,
  style,
  testID,
  text,
  type,
}: Props) => {
  const props = {
    className,
    disabled: disabled || loading,
    onPress,
    icon,
    style,
    testID,
    text,
    type,
  };
  const styleProps = {
    disabled,
    type,
  };

  return (
    <StyledTouchableView {...props}>
      {icon && <StyledIcon {...styleProps} name={icon} />}
      {text && <ButtonLabel {...styleProps}>{text}</ButtonLabel>}
      {loading && <ButtonSpinner {...styleProps} />}
    </StyledTouchableView>
  );
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;

// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { ButtonContainerProps, ButtonProps } from './types.js.flow';
import { buttonContainerStyle, ButtonLabel, StyledIcon } from './styles';
import ButtonSpinner from './ButtonSpinner';

type Props = ButtonProps & {
  // Will be removed
  className?: string,
};

const createButton = (
  containerComponent: React.ComponentType<ButtonContainerProps>,
  containerProps?: {},
) => {
  const StyledContainer = styled(containerComponent)`
    ${buttonContainerStyle};
  `;

  const Button = ({
    className,
    disabled,
    icon,
    loading,
    onPress,
    style,
    textStyle,
    testID,
    text,
    type,
  }: Props) => {
    const styleProps = {
      // pass the original value of `disabled` so that we know if button is
      // disabled because it's loading
      hasDisabledStyle: disabled,
      loading,
      type,
    };
    const containerStyleProps = {
      ...styleProps,
      className,
      icon,
      style,
      text,
    };

    return (
      <StyledContainer
        {...containerProps || {}}
        {...containerStyleProps}
        disabled={disabled || loading}
        onPress={onPress}
        testID={testID}
      >
        {icon && <StyledIcon {...styleProps} name={icon} />}
        {text && (
          <ButtonLabel {...styleProps} style={textStyle}>
            {text}
          </ButtonLabel>
        )}
        {loading && <ButtonSpinner {...styleProps} />}
      </StyledContainer>
    );
  };

  Button.defaultProps = {
    type: 'primary',
  };

  return Button;
};

export default createButton;

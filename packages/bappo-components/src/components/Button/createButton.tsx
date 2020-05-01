import React from 'react';
import styled from 'styled-components';

import ButtonSpinner from './ButtonSpinner';
import { ButtonLabel, StyledIcon, buttonContainerStyle } from './styles';
import { ButtonContainerStyleProps, ButtonProps } from './types';

type Props = ButtonProps & {
  // Will be removed
  className?: string;
};

interface ButtonContainerProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
  testID?: string;
  [prop: string]: any;
}

const createButton = (
  containerComponent: React.ComponentType<
    ButtonContainerProps & {
      // Will be removed
      className?: string;
    }
  >,
  getContainerProps?: (
    buttonProps: ButtonProps,
  ) => Partial<ButtonContainerProps>,
) => {
  const StyledContainer = styled(containerComponent)<ButtonContainerStyleProps>`
    ${buttonContainerStyle};
  `;

  function Button(props: Props) {
    const {
      className,
      disabled,
      icon,
      iconStyle,
      loading,
      onPress,
      style,
      textStyle,
      testID,
      text,
      type,
    } = props;
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
        {...((getContainerProps && getContainerProps(props)) || {})}
        {...containerStyleProps}
        disabled={disabled || loading}
        onPress={onPress}
        testID={testID}
      >
        {icon && <StyledIcon {...styleProps} name={icon} style={iconStyle} />}
        {text && (
          <ButtonLabel {...styleProps} style={textStyle}>
            {text}
          </ButtonLabel>
        )}
        {loading && <ButtonSpinner {...styleProps} />}
      </StyledContainer>
    );
  }

  Button.defaultProps = {
    type: 'primary',
  };

  return Button;
};

export default createButton;

import React from 'react';
import {
  NativeSyntheticEvent,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import Icon from '../../../components/Icon';
import { InputHandle } from '../../../input-handle';
import { CheckboxProps } from '../types';

const Checkbox = React.forwardRef(
  (
    {
      accessibilityLabel,
      value = false,
      colorChecked = '#FF7800',
      colorUnchecked = '#B0ADAB',
      size = 'medium',
      disabled = false,
      style,
      onBlur,
      onFocus,
      onValueChange,
      testID,
    }: CheckboxProps,
    ref: React.Ref<InputHandle>,
  ) => {
    const containerRef = React.useRef<TouchableOpacity>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => containerRef.current?.focus(),
      blur: () => containerRef.current?.blur(),
    }));

    const sizes = {
      small: 16,
      medium: 24,
      large: 32,
    };

    const _onBlur = (_event: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onFocus = (_event: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _toggle = () => !disabled && onValueChange?.(!value);

    const containerprops = {
      accessibilityLabel,
      onBlur: _onBlur,
      onPress: _toggle,
      onFocus: _onFocus,
      testID,
      $checked: !!value,
      $disabled: disabled,
    };

    const styleProps = {
      style,
    };

    const icon = value ? 'check-box' : 'check-box-outline-blank';
    const color = disabled ? 'gray' : value ? colorChecked : colorUnchecked;

    return (
      <CheckboxContainer
        ref={containerRef}
        $size={sizes[size]}
        {...containerprops}
        {...styleProps}
      >
        <CheckIcon
          name={icon}
          color={color}
          size={sizes[size]}
          $disabled={disabled}
        />
      </CheckboxContainer>
    );
  },
);

export default Checkbox;

const CheckboxContainer = styled(TouchableOpacity).attrs((_props) => ({
  activeOpacity: 1,
}))<{ $size: number; $checked: boolean; $disabled: boolean }>`
  flex: none;
  flex-direction: row;
  border-radius: 3px;
  width: ${({ $size }) => `${$size}`}px;
  height: ${({ $size }) => `${$size}`}px;
`;

const CheckIcon = styled(Icon)<{ $disabled: boolean }>`
  border-radius: 3px;
  ${({ $disabled }) => ($disabled ? `background-color: #00000029;` : ``)}
`;

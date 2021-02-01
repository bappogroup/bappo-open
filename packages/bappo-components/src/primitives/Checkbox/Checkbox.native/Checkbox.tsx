import React from 'react';
import {
  NativeSyntheticEvent,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import Icon from '../../../components/Icon';
import { CheckboxProps } from '../types';

export default function Checkbox({
  accessibilityLabel,
  checked = false,
  colorChecked = '#FF7800',
  colorUnchecked = '#B0ADAB',
  size = 'medium',
  disabled = false,
  style,
  onBlur,
  onFocus,
  onValueChange,
  testID,
}: CheckboxProps) {
  const sizes = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const _onBlur = (_event: NativeSyntheticEvent<TargetedEvent>) => {
    onBlur?.({
      nativeEvent: {
        checked,
      },
    });
  };

  const _onFocus = (_event: NativeSyntheticEvent<TargetedEvent>) => {
    onFocus?.({
      nativeEvent: {
        checked,
      },
    });
  };

  const _onKeyPress = (event: React.KeyboardEvent<TouchableOpacity>) => {
    const ENTER = 13;
    const SPACE = 32;

    if (event.which === ENTER || event.which === SPACE) {
      event.preventDefault();
      event.stopPropagation();
      _toggle();
    }
  };

  const _toggle = () => !disabled && onValueChange?.(!checked);

  const containerprops = {
    accessibilityLabel,
    onBlur: _onBlur,
    onPress: _toggle,
    onFocus: _onFocus,
    onKeyPress: _onKeyPress,
    testID,
    $checked: !!checked,
    $disabled: disabled,
  };

  const styleProps = {
    style,
  };

  const icon = checked ? 'check-box' : 'check-box-outline-blank';
  const color = disabled ? 'gray' : checked ? colorChecked : colorUnchecked;

  return (
    <CheckboxContainer $size={sizes[size]} {...containerprops} {...styleProps}>
      <CheckIcon
        name={icon}
        color={color}
        size={sizes[size]}
        $disabled={disabled}
      />
    </CheckboxContainer>
  );
}

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
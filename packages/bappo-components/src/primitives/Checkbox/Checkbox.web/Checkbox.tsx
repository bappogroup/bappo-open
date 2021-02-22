import React from 'react';
import styled from 'styled-components';

import Icon from '../../../components/Icon';
import { InputHandle } from '../../../input-handle';
import { DivViewBase } from '../../../internals/web/ViewBase';
import { CheckboxProps } from '../types';

type Props = CheckboxProps & {
  className?: string;
};

const Checkbox = React.forwardRef(
  (
    {
      accessibilityLabel,
      className,
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
    }: Props,
    ref: React.Ref<InputHandle>,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => containerRef.current?.focus(),
      blur: () => containerRef.current?.blur(),
    }));

    const sizes = {
      small: 16,
      medium: 24,
      large: 32,
    };

    const _onBlur = (_event: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onFocus = (_event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const ENTER = 13;
      const SPACE = 32;

      if (event.which === ENTER || event.which === SPACE) {
        event.preventDefault();
        event.stopPropagation();
        _toggle();
      }
    };

    const _toggle = () => !disabled && onValueChange?.(!value);

    const containerprops = {
      accessibilityLabel,
      onBlur: _onBlur,
      onClick: _toggle,
      onFocus: _onFocus,
      onKeyPress: _onKeyPress,
      testID,
      $checked: !!value,
      $disabled: disabled,
    };

    const styleProps = {
      className,
      style,
    };

    const icon = value ? 'check-box' : 'check-box-outline-blank';
    const color = disabled ? 'gray' : value ? colorChecked : colorUnchecked;

    return (
      <Container
        className={className}
        $size={sizes[size]}
        {...containerprops}
        {...styleProps}
        ref={containerRef}
      >
        <CheckIcon
          name={icon}
          color={color}
          size={sizes[size]}
          $disabled={disabled}
        />
      </Container>
    );
  },
);

export default Checkbox;

const Container = styled(DivViewBase).attrs<{ $checked: boolean }>(
  ({ $checked }) => ({
    'aria-checked': $checked ? 'true' : 'false',
    role: 'checkbox',
    tabIndex: 0,
  }),
)<{ $size: number; $checked: boolean; $disabled: boolean }>`
  vertical-align: middle;
  outline: none;
  display: inline-flex;
  flex: none;
  cursor: ${({ $disabled }) => `${!$disabled ? 'pointer' : 'not-allowed'}`};
  width: ${({ $size }) => `${$size}`}px;
  height: ${({ $size }) => `${$size}`}px;
  border-radius: 3px;
`;

const CheckIcon = styled(Icon)<{ size: number; $disabled: boolean }>`
  transition: box-shadow 0.2s;
  border-radius: 3px;
  ${({ $disabled }) =>
    !$disabled
      ? `${Container}:hover &, ${Container}:focus &  {
          box-shadow: inset 0 0 0 3px #00000029;
        },`
      : ``}
  ${({ $disabled }) => ($disabled ? `background-color: #00000029;` : ``)}
`;

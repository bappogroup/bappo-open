import * as React from 'react';
import styled from 'styled-components';

import { InputHandle } from '../../../input-handle';
import { DivViewBase } from '../../../internals/web/ViewBase';
import { SwitchProps } from '../types';

type Props = SwitchProps & {
  // Will be removed
  className?: string;
};

const Switch = React.forwardRef(
  (
    {
      accessibilityLabel,
      disabled = false,
      onBlur,
      onFocus,
      onValueChange,
      style,
      testID,
      value = false,
      className,
    }: Props,
    ref: React.Ref<InputHandle>,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        containerRef.current?.focus();
      },
      blur: () => {
        if (containerRef && containerRef.current) containerRef.current.blur();
      },
    }));

    const _onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus &&
        onFocus({
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

    const _toggle = () => {
      !disabled && onValueChange && onValueChange(!value);
    };

    const props = {
      accessibilityLabel,
      onBlur: _onBlur,
      onClick: _toggle,
      onFocus: _onFocus,
      onKeyPress: _onKeyPress,
      testID,
    };

    const styleProps = {
      className,
      style,
      $value: !!value,
    };

    return (
      <SwitchContainer ref={containerRef} {...props} {...styleProps}>
        <Track $value={!!value} />
        <FocusIndicator
          $disabled={disabled}
          $position={value ? 'right' : 'left'}
        >
          <Handle $disabled={disabled} />
        </FocusIndicator>
      </SwitchContainer>
    );
  },
);

export default Switch;

const SwitchContainer = styled(DivViewBase).attrs<{ $value: boolean }>(
  ({ $value }) => ({
    'aria-checked': $value ? 'true' : 'false',
    role: 'checkbox',
    tabIndex: 0,
  }),
)<{ $value: boolean }>`
  outline: none;
  display: inline-flex;
  flex: none;
  cursor: pointer;
  height: 38px;
  width: 56px;
  padding: 9px;
  z-index: 0;
`;

const Handle = styled(DivViewBase)<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) => `${!$disabled ? 'white' : '#d6d3d1'}`};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const FocusIndicator = styled(DivViewBase)<{
  $position: 'right' | 'left';
  $disabled: boolean;
}>`
  background-color: transparent;
  border-radius: 50%;
  padding: 9px;
  position: absolute;
  top: 0px;
  left: ${({ $position }) => ($position === 'left' ? 0 : 18)}px;
  transition: left 0.2s, background-color 0.2s;
  z-index: 1;
  ${({ $disabled }) =>
    !$disabled
      ? `${SwitchContainer}:hover &, ${SwitchContainer}:focus &  {
    background-color: #00000029;
  },`
      : ``}
`;

const Track = styled(DivViewBase)<{ $value: boolean }>`
  background-color: ${({ $value }) => ($value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

// @flow

import * as React from 'react';
import styled from 'styled-components';
// $FlowFixMe typescript
import ViewBase from '../../../internals/web/ViewBase';
import type { SwitchProps } from '../types.js.flow';
import SwitchDefaultProps from '../defaultProps';

type Props = SwitchProps & {
  // Will be removed
  className?: string,
};

class Switch extends React.Component<Props> {
  static defaultProps = SwitchDefaultProps;

  render() {
    const { accessibilityLabel, className, style, testID, value } = this.props;

    const props = {
      accessibilityLabel,
      onBlur: this._onBlur,
      onClick: this._toggle,
      onFocus: this._onFocus,
      onKeyPress: this._onKeyPress,
      testID,
    };

    const styleProps = {
      className,
      style,
      value,
    };

    return (
      <SwitchContainer {...props} {...styleProps}>
        <Handle position={value ? 'right' : 'left'} />
      </SwitchContainer>
    );
  }

  _onBlur = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { onBlur, value } = this.props;

    onBlur &&
      onBlur({
        nativeEvent: {
          value,
        },
      });
  };

  _onFocus = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { onFocus, value } = this.props;

    onFocus &&
      onFocus({
        nativeEvent: {
          value,
        },
      });
  };

  _onKeyPress = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const ENTER = 13;
    const SPACE = 32;

    if (event.which === ENTER || event.which === SPACE) {
      event.preventDefault();
      event.stopPropagation();
      this._toggle();
    }
  };

  _toggle = () => {
    const { disabled, onValueChange, value } = this.props;

    !disabled && onValueChange && onValueChange(!value);
  };
}

export default Switch;

const SwitchContainer = styled(ViewBase).attrs({
  'aria-checked': ({ value }) => (value ? 'true' : 'false'),
  role: 'checkbox',
  tabIndex: 0,
})`
  flex: none;
  outline: none;
  flex-direction: row;
  background-color: ${({ value }) => (value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  cursor: pointer;
  height: 24px;
  width: 48px;
`;

const Handle = styled(ViewBase)`
  background-color: white;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: ${({ position }) => (position === 'left' ? 2 : 26)}px;
  transition: left 0.2s;
`;

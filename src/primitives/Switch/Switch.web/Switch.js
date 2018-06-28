// @flow

import * as React from 'react';
import styled from 'styled-components';
import ViewBase from '../../../internals/web/ViewBase';
import type { SwitchProps } from '../types.js.flow';
import SwitchDefaultProps from '../defaultProps';

type Props = SwitchProps & {
  // Will be removed
  className?: string,
};

class Switch extends React.Component<Props> {
  props: Props;

  static defaultProps = SwitchDefaultProps;

  render() {
    const { accessibilityLabel, className, style, testID, value } = this.props;

    const props = {
      accessibilityLabel,
      onClick: this._toggle,
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

  _toggle = () => {
    const { disabled, onValueChange, value } = this.props;

    !disabled && onValueChange && onValueChange(!value);
  };
}

export default Switch;

const SwitchContainer = styled(ViewBase)`
  flex: none;
  flex-direction: row;
  background-color: ${({ value }) => (value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
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

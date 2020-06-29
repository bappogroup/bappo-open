// @flow

import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components';

import SwitchDefaultProps from '../defaultProps';
import type { SwitchProps } from '../types.js.flow';

type Props = SwitchProps;
type State = {
  toggleHandleLeft: Animated.Value,
};

class Switch extends React.Component<Props, State> {
  static defaultProps = SwitchDefaultProps;

  state = {
    toggleHandleLeft: new Animated.Value(2),
  };

  componentDidUpdate(prevProps: Props) {
    if (!!this.props.value !== !!prevProps.value) {
      Animated.timing(this.state.toggleHandleLeft, {
        toValue: this.props.value ? 26 : 2,
        duration: 200,
      }).start();
    }
  }

  render() {
    const { accessibilityLabel, style, testID, value } = this.props;

    const props = {
      accessibilityLabel,
      onPress: this._toggle,
      testID,
    };

    const styleProps = {
      style,
      value,
    };

    return (
      <SwitchContainer {...props} {...styleProps}>
        <Animated.View
          style={[styles.handle, { left: this.state.toggleHandleLeft }]}
        />
      </SwitchContainer>
    );
  }

  _toggle = () => {
    const { disabled, onValueChange, value } = this.props;

    !disabled && onValueChange && onValueChange(!value);
  };
}

export default Switch;

const SwitchContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 1,
}))`
  flex: none;
  flex-direction: row;
  background-color: ${({ value }) => (value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  height: 24px;
  width: 48px;
`;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 2,
    bottom: 2,
  },
});

// @flow

import * as React from 'react';
import RN from 'react-native';
import styled from 'styled-components';
import type { OverlayProps } from '../types.js.flow';
import OverlayDefaultProps from '../defaultProps';

type Props = OverlayProps;

class Overlay extends React.Component<Props> {
  props: Props;

  static defaultProps = OverlayDefaultProps;

  render() {
    const { children, color, onLayout, visible } = this.props;

    return (
      <RN.Modal
        animationType="none"
        onRequestClose={this._onPress}
        transparent
        visible={visible}
      >
        <OverlayContainer
          onLayout={onLayout}
          onPress={this._onPress}
          color={color}
        >
          {children}
        </OverlayContainer>
      </RN.Modal>
    );
  }

  _onPress = (event: SyntheticEvent<>) => {
    if (event.target === event.currentTarget) {
      const { onPress } = this.props;
      onPress && onPress();
    }
  };
}

export default Overlay;

const OverlayContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  background-color: rgba(178, 178, 178, 0.8);
`;

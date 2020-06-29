// @flow

import * as React from 'react';
import RN from 'react-native';
import styled from 'styled-components';

import OverlayDefaultProps from '../defaultProps';
import type { OverlayProps } from '../types.js.flow';

type Props = OverlayProps;

class Overlay extends React.Component<Props> {
  static defaultProps = OverlayDefaultProps;

  render() {
    const { children, onLayout, visible } = this.props;

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
          testID="overlay-container"
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

const OverlayContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 1,
}))`
  flex: 1;
  background-color: rgba(178, 178, 178, 0.8);
`;

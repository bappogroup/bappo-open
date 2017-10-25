// @flow

import * as React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

type Props = {
  /**
   * Content of the popup.
   */
  children?: React.Node,
  /**
   * Height of the popup.
   */
  height: number,
  /**
   * Callback that is called when the user taps on the backdrop or the hardware back button on
   * Android.
   */
  onRequestClose?: ?() => void,
  /**
   * Determines whether the popup is shown.
   */
  show?: ?boolean,
};

type State = {
  animatedHeight: Animated.Value,
  showModal: boolean,
};

class Popup extends React.Component<Props, State> {
  props: Props;

  static defaultProps = {
    height: 259,
    show: false,
  };

  state: State = {
    animatedHeight: new Animated.Value(0),
    showModal: !!this.props.show,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show) {
      this._setModalVisible(!!nextProps.show);
    }
  }

  render() {
    return (
      <Modal
        onRequestClose={this.props.onRequestClose}
        transparent
        visible={this.state.showModal}
      >
        <TouchableHighlight
          activeOpacity={1}
          onPress={this.props.onRequestClose}
          style={styles.modalBackdrop}
          underlayColor="#00000075"
        >
          <TouchableHighlight
            underlayColor="#fff"
          >
            <Animated.View
              style={[styles.container, { height: this.state.animatedHeight }]}
            >
              {this.props.children}
            </Animated.View>
          </TouchableHighlight>
        </TouchableHighlight>
      </Modal>
    );
  }

  _setModalVisible = (visible: boolean) => {
    this.setState({ showModal: visible });

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.props.height,
          duration: 300,
        },
      ).start();
    } else {
      this.setState({
        animatedHeight: new Animated.Value(0),
      });
    }
  };
}

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: '#00000075',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden',
  },
});

export default Popup;

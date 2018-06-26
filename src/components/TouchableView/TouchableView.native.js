// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  activeOpacity: number,
  children?: React.Node,
  /**
   * Delay in ms, from onPressIn, before onLongPress is called. Default is 500ms.
   */
  delayLongPress?: number,
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean,
  onLongPress?: () => void,
  onPress?: () => void,
  onPressIn?: () => void,
  onPressOut?: () => void,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class TouchableView extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    activeOpacity: 0.2,
    delayLongPress: 500,
    disabled: false,
  };

  static displayName = 'TouchableView';

  render() {
    const {
      accessibilityLabel,
      children,
      delayLongPress,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      style,
      testID,
    } = this.props;

    const props = {
      accessibilityLabel,
      delayLongPress,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      style,
      testID,
    };

    return <RN.TouchableOpacity {...props}>{children}</RN.TouchableOpacity>;
  }
}

export default TouchableView;

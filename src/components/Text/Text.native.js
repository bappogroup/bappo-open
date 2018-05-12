// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  /**
   * Used to truncate the text with an ellipsis after computing the text layout, including line
   * wrapping, such that the total number of lines does not exceed this number.
   */
  numberOfLines?: number,
  /**
   * Lets the user select text, to use the native copy and paste functionality.
   */
  selectable?: boolean,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class Text extends React.Component<Props> {
  static displayName = 'Text';

  props: Props;

  // To be able to use Text inside TouchableHighlight/TouchableOpacity
  setNativeProps = (...args: Array<any>) => {
    this._nativeText && this._nativeText.setNativeProps(...args);
  };

  render() {
    const {
      accessibilityLabel,
      children,
      numberOfLines,
      selectable,
      style,
      testID,
    } = this.props;

    const props = {
      accessibilityLabel,
      numberOfLines,
      selectable,
      style,
      testID,
    };

    return (
      <RN.Text {...props} ref={this._captureNativeTextRef}>
        {children}
      </RN.Text>
    );
  }

  _nativeText: ?React.ElementRef<typeof RN.Text>;

  _captureNativeTextRef = (ref: ?React.ElementRef<typeof RN.Text>) => {
    this._nativeText = ref;
  };
}

export default Text;

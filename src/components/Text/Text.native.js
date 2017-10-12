// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
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
};

class Text extends React.Component<Props> {
  props: Props;

  // To be able to use Text inside TouchableHighlight/TouchableOpacity
  setNativeProps = (...args: Array<any>) => {
    this._nativeText && this._nativeText.setNativeProps(...args);
  };

  static displayName = 'Text';

  render() {
    const {
      children,
      numberOfLines,
      selectable,
      style,
    } = this.props;

    const props = {
      numberOfLines,
      selectable,
      style,
    };

    return (
      <RN.Text
        {...props}
        ref={this._captureNativeTextRef}
      >
        {children}
      </RN.Text>
    );
  }

  _nativeText = (null: any);

  _captureNativeTextRef = (ref) => {
    this._nativeText = ref;
  };
}

export default Text;

// @flow

import * as React from 'react';
import RN from 'react-native';
import type { ViewLayoutEvent } from '../../events.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  onLayout?: (event: ViewLayoutEvent) => void,
  /**
   * Controls whether the View can be the target of touch events.
   *
   * - 'auto': The View can be the target of touch events.
   * - 'none': The View is never the target of touch events.
   * - 'box-none': The View is never the target of touch events but it's subviews can be.
   * - 'box-only': The view can be the target of touch events but it's subviews cannot be.
   */
  pointerEvents: 'auto' | 'none' | 'box-none' | 'box-only',
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class View extends React.Component<Props> {
  static displayName = 'View';

  // To be able to use View inside TouchableHighlight/TouchableOpacity
  setNativeProps = (...args: Array<any>) => {
    this._nativeView && this._nativeView.setNativeProps(...args);
  };

  render() {
    const {
      accessibilityLabel,
      children,
      onLayout,
      pointerEvents,
      style,
      testID,
    } = this.props;

    const props = {
      accessibilityLabel,
      onLayout,
      pointerEvents,
      style,
      testID,
    };

    return (
      <RN.View {...props} ref={this._captureNativeViewRef}>
        {children}
      </RN.View>
    );
  }

  _nativeView: ?React.ElementRef<typeof RN.View>;

  _captureNativeViewRef = (ref: ?React.ElementRef<typeof RN.View>) => {
    this._nativeView = ref;
  };
}

export default View;

// @flow

import * as React from 'react';
import RN from 'react-native';
import type {
  ViewLayoutEvent,
} from '../../events.js.flow';

type Props = {
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
};

class View extends React.Component<Props> {
  props: Props;

  // To be able to use View inside TouchableHighlight/TouchableOpacity
  setNativeProps = (...args: Array<any>) => {
    this._nativeView && this._nativeView.setNativeProps(...args);
  };

  static displayName = 'View';

  render() {
    const {
      children,
      onLayout,
      pointerEvents,
      style,
    } = this.props;

    const props = {
      onLayout,
      pointerEvents,
      style,
    };

    return (
      <RN.View
        {...props}
        ref={this._captureNativeViewRef}
      >
        {children}
      </RN.View>
    );
  }

  _nativeView = (null: any);

  _captureNativeViewRef = (ref) => {
    this._nativeView = ref;
  };
}

export default View;

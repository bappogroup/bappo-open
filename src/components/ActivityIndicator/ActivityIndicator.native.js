// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating: boolean,
  /**
   * The foreground color of the spinner (default is gray).
   */
  color: string,
  /**
   * Size of the indicator (default is 'small').
   */
  size: 'small' | 'large',
  // TODO
  style?: any,
};

class ActivityIndicator extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    animating: true,
    color: '#999',
    size: 'small',
  };

  static displayName = 'ActivityIndicator';

  render() {
    const { animating, color, size, style } = this.props;

    const props = {
      animating,
      color,
      size,
      style,
    };

    return <RN.ActivityIndicator {...props} />;
  }
}

export default ActivityIndicator;

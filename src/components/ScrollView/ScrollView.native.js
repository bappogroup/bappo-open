// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
  children?: React.Node,
  /**
   * Fires at most once per frame during scrolling. The frequency of the events can be controlled
   * using the scrollEventThrottle prop.
   */
  onScroll?: ?({ x: number, y: number }) => void,
  /**
   * This controls how often the scroll event will be fired while scrolling (as a time interval in
   * ms). A lower number yields better accuracy for code that is tracking the scroll position, but
   * can lead to scroll performance problems due to the volume of information being send over the
   * bridge. You will not notice a difference between values set between 1-16 as the JS run loop is
   * synced to the screen refresh rate. If you do not need precise scroll position tracking, set
   * this value higher to limit the information being sent across the bridge. The default value is
   * zero, which results in the scroll event being sent only once each time the view is scrolled.
   */
  scrollEventThrottle?: number,
  // TODO
  style?: any,
};

class ScrollView extends React.Component<Props> {
  props: Props;

  scrollTo = (options: { x?: number, y?: number }) => {
    this._scrollableNode && this._scrollableNode.scrollTo(options);
  };

  scrollToEnd = () => {
    this._scrollableNode && this._scrollableNode.scrollToEnd();
  };

  static defaultProps = {
    scrollEventThrottle: 16, // Fire at 60fps
  };

  static displayName = 'ScrollView';

  render() {
    const {
      children,
      onScroll,
      scrollEventThrottle,
      style,
    } = this.props;

    const props = {
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: 'handled',
      onScroll,
      scrollEventThrottle,
      style,
    };

    return (
      <RN.ScrollView
        {...props}
        ref={this._captureScrollableNodeRef}
      >
        {children}
      </RN.ScrollView>
    );
  }

  _scrollableNode = (null: any);

  _captureScrollableNodeRef = (ref) => {
    this._scrollableNode = ref;
  };
}

export default ScrollView;

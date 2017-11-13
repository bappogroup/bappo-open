// @flow

import * as React from 'react';
import RN from 'react-native';
import type {
  ScrollEvent,
  ViewLayoutEvent,
} from '../../events.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  /**
   * When true, the scroll view's children are arranged horizontally in a row instead of vertically
   * in a column. The default value is `false`.
   */
  horizontal?: boolean,
  /**
   * Called when scrollable content view of the ScrollView changes.
   * Handler function is passed the content width and content height as parameters:
   * (contentWidth, contentHeight)
   * It's implemented using onLayout handler attached to the content container which this ScrollView
   * renders.
   */
  onContentSizeChange?: ?(width: number, height: number) => void,
  onLayout?: ?(event: ViewLayoutEvent) => void,
  /**
   * Fires at most once per frame during scrolling. The frequency of the events can be controlled
   * using the scrollEventThrottle prop.
   */
  onScroll?: ?(event: ScrollEvent) => void,
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
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class ScrollView extends React.Component<Props> {
  static defaultProps = {
    scrollEventThrottle: 16, // Fire at 60fps
  };

  static displayName = 'ScrollView';

  props: Props;

  scrollTo = (options: { x?: number, y?: number }) => {
    this._scrollableNode && this._scrollableNode.scrollTo(options);
  };

  scrollToEnd = () => {
    this._scrollableNode && this._scrollableNode.scrollToEnd();
  };

  render() {
    const {
      accessibilityLabel,
      children,
      horizontal,
      onContentSizeChange,
      onLayout,
      onScroll,
      scrollEventThrottle,
      style,
      testID,
    } = this.props;

    const props = {
      accessibilityLabel,
      horizontal,
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: 'handled',
      onContentSizeChange,
      onLayout,
      onScroll,
      scrollEventThrottle,
      style,
      testID,
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

  _scrollableNode: ?React.ElementRef<typeof RN.ScrollView>;

  _captureScrollableNodeRef = (ref: ?React.ElementRef<typeof RN.ScrollView>) => {
    this._scrollableNode = ref;
  };
}

export default ScrollView;

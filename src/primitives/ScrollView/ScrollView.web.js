// @flow

import * as React from 'react';
import throttle from 'lodash/throttle';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import ViewBase from '../../internals/web/ViewBase';
import type { ScrollEvent, ViewLayoutEvent } from '../../events.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
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

  scrollTo = (options: { x?: number, y?: number }) => {
    const { x, y } = options;

    if (this._scrollableNode) {
      if (typeof x === 'number') {
        this._scrollableNode.scrollLeft = x;
      }
      if (typeof y === 'number') {
        this._scrollableNode.scrollTop = y;
      }
    }
  };

  scrollToEnd = () => {
    if (this._scrollableNode) {
      this._scrollableNode.scrollTop = this._scrollableNode.scrollHeight;
    }
  };

  render() {
    const {
      accessibilityLabel,
      children,
      className,
      horizontal,
      onLayout,
      style,
      testID,
    } = this.props;

    const styleProps = {
      className,
      horizontal,
      style,
    };

    return (
      <ScrollContainer
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        innerRef={this._captureScrollableNodeRef}
        onLayout={onLayout}
        onScroll={this._onScroll}
        testID={testID}
      >
        <ContentContainer
          horizontal={horizontal}
          onLayout={this._onContentLayout}
        >
          {children}
        </ContentContainer>
      </ScrollContainer>
    );
  }

  _scrollableNode: ?HTMLElement;

  _captureScrollableNodeRef = (ref: ?React.ElementRef<typeof ViewBase>) => {
    const node = findDOMNode(ref);
    if (node instanceof HTMLElement) {
      this._scrollableNode = node;
    }
  };

  _onContentLayout = (event: ViewLayoutEvent) => {
    const { width, height } = event.nativeEvent.layout;

    const { onContentSizeChange } = this.props;

    onContentSizeChange && onContentSizeChange(width, height);
  };

  _onScroll = (event: SyntheticWheelEvent<HTMLDivElement>) => {
    event.persist();
    this._onScrollThrottled(event);
  };

  _onScrollThrottled = throttle(event => {
    const { onScroll } = this.props;

    onScroll &&
      onScroll({
        nativeEvent: {
          contentOffset: {
            x: event.target.scrollLeft,
            y: event.target.scrollTop,
          },
          contentSize: {
            height: event.target.scrollHeight,
            width: event.target.scrollWidth,
          },
          layoutMeasurement: {
            height: event.target.offsetHeight,
            width: event.target.offsetWidth,
          },
        },
        timeStamp: Date.now(),
      });
  }, this.props.scrollEventThrottle);
}

export default ScrollView;

const ScrollContainer = styled(ViewBase)`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);

  ${({ horizontal }) =>
    horizontal &&
    `
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  `};
`;

const ContentContainer = styled(ViewBase)`
  ${({ horizontal }) =>
    horizontal &&
    `
    flex-direction: row;
  `};
`;

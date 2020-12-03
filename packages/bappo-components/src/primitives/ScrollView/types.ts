import { ScrollEvent, ViewLayoutEvent } from '../../events';

export type ScrollViewProps = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string;
  children?: React.ReactNode;
  /**
   * When true, the scroll view's children are arranged horizontally in a row instead of vertically
   * in a column. The default value is `false`.
   */
  horizontal?: boolean;
  /**
   * Called when scrollable content view of the ScrollView changes.
   * Handler function is passed the content width and content height as parameters:
   * (contentWidth, contentHeight)
   * It's implemented using onLayout handler attached to the content container which this ScrollView
   * renders.
   */
  onContentSizeChange?: (width: number, height: number) => void;
  onLayout?: (event: ViewLayoutEvent) => void;
  /**
   * Fires at most once per frame during scrolling. The frequency of the events can be controlled
   * using the scrollEventThrottle prop.
   */
  onScroll?: (event: ScrollEvent) => void;
  /**
   * This controls how often the scroll event will be fired while scrolling (as a time interval in
   * ms). A lower number yields better accuracy for code that is tracking the scroll position, but
   * can lead to scroll performance problems due to the volume of information being send over the
   * bridge. You will not notice a difference between values set between 1-16 as the JS run loop is
   * synced to the screen refresh rate. If you do not need precise scroll position tracking, set
   * this value higher to limit the information being sent across the bridge. The default value is
   * zero, which results in the scroll event being sent only once each time the view is scrolled.
   */
  scrollEventThrottle?: number;
  // TODO
  style?: any;
  /**
   * These styles will be applied to the scroll view content container which wraps all of the child views.
   */
  contentContainerStyle?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
};

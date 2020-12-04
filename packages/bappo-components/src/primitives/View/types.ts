import { ViewLayoutEvent } from '../../events';

export type ViewProps = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string;
  children?: React.ReactNode;
  className?: string;
  onLayout?: (event: ViewLayoutEvent) => void;
  /**
   * Controls whether the View can be the target of touch events.
   *
   * - 'auto': The View can be the target of touch events.
   * - 'none': The View is never the target of touch events.
   * - 'box-none': The View is never the target of touch events but it's subviews can be.
   * - 'box-only': The view can be the target of touch events but it's subviews cannot be.
   */
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  // TODO
  style?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
};

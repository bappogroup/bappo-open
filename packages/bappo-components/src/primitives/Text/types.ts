export interface TextProps {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string;
  children?: React.ReactNode;
  /**
   * Used to truncate the text with an ellipsis after computing the text layout, including line
   * wrapping, such that the total number of lines does not exceed this number.
   */
  numberOfLines?: number;
  /**
   * Lets the user select text, to use the native copy and paste functionality.
   */
  selectable?: boolean;
  // TODO
  style?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  /**
   * Show ... for numberOfLines > 1 on web.
   */
  ellipsis?: boolean;
}

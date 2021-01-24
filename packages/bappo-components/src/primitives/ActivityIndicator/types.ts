export type ActivityIndicatorProps = {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating?: boolean;
  /**
   * The foreground color of the spinner (default is gray).
   */
  color?: string;
  /**
   * Size of the indicator (default is 'small').
   */
  size?: 'small' | 'large';
  // TODO
  style?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
};

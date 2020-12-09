export type IconCardProps = {
  icon?: string;
  color?: string;
  badge?: number;
  size?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  text?: string;
  onPress?: () => void;
  style?: any;
};

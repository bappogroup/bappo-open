export interface SubmitButtonProps {
  disabled?: boolean;
  icon?: string;
  iconStyle?: any;
  style?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  textStyle?: any;
  text?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
}

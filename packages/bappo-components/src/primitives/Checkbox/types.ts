import { BlurEvent, FocusEvent } from '../../events';

export type CheckboxProps = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string;
  /**
   * The checked state of the Checkbox. If true the Checkbox will be checked. Default value is false.
   */
  checked?: boolean;
  /**
   * The Checkbox's color when checked is true.
   */
  colorChecked?: string;
  /**
   * The Checkbox's color when checked is false.
   */
  colorUnchecked?: string;
  size?: 'small' | 'medium' | 'large';
  /**
   * If true the user won't be able to toggle the Checkbox. Default value is false.
   */
  disabled?: boolean;
  /**
   * Callback that is called when the switch is blurred.
   */
  onBlur?: ((event: BlurEvent) => void) | null;
  /**
   * Callback that is called when the switch is focused.
   */
  onFocus?: ((event: FocusEvent) => void) | null;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: ((value: boolean) => void) | null;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  style?: any;
};

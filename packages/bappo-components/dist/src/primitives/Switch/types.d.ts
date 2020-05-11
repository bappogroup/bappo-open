import { BlurEvent, FocusEvent } from '../../events';
export declare type SwitchProps = {
    /**
     * Overrides the text that's read by the screen reader when the user interacts with the element.
     */
    accessibilityLabel?: string;
    /**
     * If true the user won't be able to toggle the switch. Default value is false.
     */
    disabled?: boolean;
    /**
     * Callback that is called when the switch is blurred.
     */
    onBlur?: (event: BlurEvent) => void;
    /**
     * Callback that is called when the switch is focused.
     */
    onFocus?: (event: FocusEvent) => void;
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void;
    style?: any;
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
    /**
     * The value of the switch. If true the switch will be turned on. Default value is false.
     */
    value?: boolean;
};

import { BlurEvent, FocusEvent } from '../../events';
export interface TextInputProps {
    /**
     * Overrides the text that's read by the screen reader when the user interacts with the element.
     */
    accessibilityLabel?: string;
    /**
     * If true, focuses the input on componentDidMount. The default value is false.
     */
    autoFocus?: boolean;
    /**
     * Provides an initial value that will change when the user starts typing. Useful for simple
     * use-cases where you do not want to deal with listening to events and updating the value prop to
     * keep the controlled state in sync.
     */
    defaultValue?: string;
    /**
     * Limits the maximum number of characters that can be entered.
     */
    maxLength?: number;
    /**
     * If true, the text input can be multiple lines. The default value is false.
     */
    multiline?: boolean;
    /**
     * Callback that is called when the text input is blurred.
     */
    onBlur?: (event: BlurEvent) => void;
    /**
     * Callback that is called when the text input is focused.
     */
    onFocus?: (event: FocusEvent) => void;
    /**
     * Callback that is called when the text input's text changes. Changed text is passed as an
     * argument to the callback handler.
     */
    onValueChange?: (value: string) => void;
    /**
     * The string that will be rendered before text input has been entered.
     */
    placeholder?: string;
    /**
     * If true, text is not editable. The default value is false.
     */
    readOnly?: boolean;
    style?: any;
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
    /**
     * Input type. Only works with `multiline={false}`.
     */
    type?: 'email' | 'number' | 'password' | 'tel' | 'text';
    /**
     * The value to show for the text input. TextInput is a controlled component, which means the
     * native value will be forced to match this value prop if provided.
     */
    value?: string;
}

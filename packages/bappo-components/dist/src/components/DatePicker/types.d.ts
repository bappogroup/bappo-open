import React from 'react';
export declare type DatePickerProps = {
    /**
     * Overrides the text that's read by the screen reader when the user interacts with the element.
     */
    accessibilityLabel?: string;
    /**
     * If `true`, focuses the input on `componentDidMount`. The default value is `false`.
     */
    autoFocus?: boolean;
    /**
     * If `true`, the input value can be cleared by pressing a button. The default value is `true`.
     */
    clearable?: boolean;
    clearValueText?: string;
    /**
     * Date format of the displayed value.
     */
    displayFormat?: string;
    /**
     * Callback that is called when the input is blurred.
     */
    onBlur?: () => void;
    /**
     * Callback that is called when the input is focused.
     */
    onFocus?: () => void;
    /**
     * Callback that is called when the input value changes.
     */
    onValueChange?: (value: string | null) => void;
    /**
     * The string that will be rendered when there is no value.
     */
    placeholder?: string;
    /**
     * If `true`, the input is not editable. The default value is `false`.
     */
    readOnly?: boolean;
    /**
     * Function to render the dropdown icon.
     */
    renderDropdownIcon?: () => React.ReactNode;
    style?: any;
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
    /**
     * The value of the date input.
     */
    value?: string;
    /**
     * Date format of the input value.
     */
    valueFormat?: string;
};

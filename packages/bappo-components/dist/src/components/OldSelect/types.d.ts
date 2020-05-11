import React from 'react';
export declare type Option = {
    disabled?: boolean;
    [key: string]: any;
};
export declare type Value = string | number | null | ReadonlyArray<string | number>;
export declare type renderOptionType = (info: {
    index: number;
    option: Option;
    isSelected: boolean;
}) => React.ReactElement<any>;
export interface SelectProps {
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
    clearAllText?: string;
    clearValueText?: string;
    filterOption?: (option: Option, searchText: string) => boolean;
    /**
     * See `getItemLayout` of `FlatList`.
     */
    getDropdownItemLayout?: (options: Array<Option>, index: number) => {
        length: number;
        offset: number;
        index: number;
    };
    /**
     * If `true`, a spinner is displayed. The default value is `false`.
     */
    isLoading?: boolean;
    labelKey?: string;
    /**
     * If `true`, the input becomes a multi-select. The default value is `false`.
     */
    multi?: boolean;
    /**
     * Text to show when there are no search results.
     */
    noResultsText?: string;
    /**
     * Callback that is called when the input is blurred.
     */
    onBlur?: () => void;
    /**
     * Called once when the scroll position gets within `onDropdownEndReachedThreshold` of the
     * rendered content of the dropdown.
     */
    onDropdownEndReached?: () => void;
    /**
     * How far from the end (in units of visible length of the list) the bottom edge of the
     * list must be from the end of the content to trigger the `onDropdownEndReached` callback.
     */
    onDropdownEndReachedThreshold?: number;
    /**
     * Callback that is called when the input is focused.
     */
    onFocus?: () => void;
    /**
     * Callback that is called when the search input's text changes.
     */
    onInputChange?: (text: string, triggeredByUser: boolean) => void;
    /**
     * Callback that is called when the input value changes.
     */
    onValueChange?: (value: Value) => void;
    /**
     * An array of options.
     */
    options?: Option[];
    pageSize?: number;
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
    /**
     * Function to render an option. Requires `getDropdownItemLayout` to be implemented.
     */
    renderOption?: renderOptionType;
    /**
     * If `true`, user can use the text input to filter options. The default value is `true`.
     */
    searchable?: boolean;
    style?: any;
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
    /**
     * The value of the select input.
     */
    value?: Value;
    valueKey?: string;
}

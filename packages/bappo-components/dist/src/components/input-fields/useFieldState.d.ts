import { FieldState, InputFieldProps } from './types';
export declare function useFieldState<V>(props: InputFieldProps<V>): {
    fieldState: FieldState<unknown>;
    onBlur: (() => void) | undefined;
    onFocus: (() => void) | undefined;
};

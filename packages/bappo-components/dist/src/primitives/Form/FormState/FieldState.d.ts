import { FieldValidator } from './types';
export declare function useFieldState({ name, validate, }: {
    name: string;
    validate?: FieldValidator | FieldValidator[];
}): {
    active: boolean;
    dirty: boolean;
    error: any;
    pristine: boolean;
    touched: boolean;
    value: any;
    visited: boolean;
    formState: import("./types").FormStateAndHelpersAndActions;
};

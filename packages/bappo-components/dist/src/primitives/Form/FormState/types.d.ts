export interface Errors {
    __formError?: any;
    [key: string]: any;
}
export declare type Values = any;
export declare type FormState = {
    activeField: string | void;
    allTouched: boolean;
    anyTouched: boolean;
    fieldErrors: {
        [fieldName: string]: any;
    };
    fieldStates: {
        [fieldName: string]: {
            active?: boolean;
            touched?: boolean;
            visited?: boolean;
        };
    };
    formError: any;
    submitting: boolean;
    values: Values;
};
export declare type FormStateAndHelpers = FormState & {
    dirty: boolean;
    pristine: boolean;
    fieldActive: (fieldName: string) => boolean;
    fieldDirty: (fieldName: string) => boolean;
    fieldPristine: (fieldName: string) => boolean;
    fieldTouched: (fieldName: string) => boolean;
    fieldVisited: (fieldName: string) => boolean;
    getFieldError: (fieldName: string) => any;
    getFieldValue: (fieldName: string) => any;
};
export declare type FieldValidator = (value: any, stateAndHelpers: FormStateAndHelpers) => any;
export declare type FormValidator = (stateAndHelpers: FormStateAndHelpers) => Errors;
export declare type FormActionSenders = {
    blur: (fieldName: string) => void;
    changeValue: (fieldName: string, value: any) => void;
    focus: (fieldName: string) => void;
    setFieldValidators: (fieldName: string, validators: FieldValidator | FieldValidator[]) => void;
    submit: (doSubmit: () => any) => Promise<void>;
    touchAll: () => void;
};
export declare type FormStateAndHelpersAndActions = FormStateAndHelpers & {
    actions: FormActionSenders;
};
export declare type ActionTypes = 'BLUR' | 'CHANGE_VALUE' | 'FOCUS' | 'SET_FIELD_VALIDATORS' | 'SET_SUBMIT_SUCCEEDED' | 'SET_SUBMIT_FAILED' | 'START_SUBMIT' | 'TOUCH_ALL' | 'VALIDATE';
export declare type FieldState<V> = {
    active: boolean;
    dirty: boolean;
    error: any;
    pristine: boolean;
    touched: boolean;
    value: V;
    visited: boolean;
};

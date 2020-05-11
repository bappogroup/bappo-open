export interface Errors {
  __formError?: any;
  [key: string]: any;
}

export type Values = any;

export type FormState = {
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

export type FormStateAndHelpers = FormState & {
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

export type FieldValidator = (
  value: any,
  stateAndHelpers: FormStateAndHelpers,
) => any;

export type FormValidator = (stateAndHelpers: FormStateAndHelpers) => Errors;

export type FormActionSenders = {
  blur: (fieldName: string) => void;
  changeValue: (fieldName: string, value: any) => void;
  focus: (fieldName: string) => void;
  setFieldValidators: (
    fieldName: string,
    validators: FieldValidator | FieldValidator[],
  ) => void;
  submit: (doSubmit: () => any) => Promise<void>;
  touchAll: () => void;
};

export type FormStateAndHelpersAndActions = FormStateAndHelpers & {
  actions: FormActionSenders;
};

export type ActionTypes =
  | 'BLUR'
  | 'CHANGE_VALUE'
  | 'FOCUS'
  | 'SET_FIELD_VALIDATORS'
  | 'SET_SUBMIT_SUCCEEDED'
  | 'SET_SUBMIT_FAILED'
  | 'START_SUBMIT'
  | 'TOUCH_ALL'
  | 'VALIDATE';

export type FieldState<V> = {
  active: boolean;
  dirty: boolean;
  error: any;
  pristine: boolean;
  touched: boolean;
  value: V;
  visited: boolean;
};

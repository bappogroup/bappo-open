import { isEqual } from 'lodash';
import React from 'react';
import warning from 'warning';

import { useFormState } from './FormState/Context';
import { FieldState, FieldValidator } from './FormState/types';
import { deepEqual } from './FormState/utils';
import { InputFieldProps } from './types';

/**
 * This hook works differently depending on whether it's inside a form state
 * context and whether it receives prop `fieldState`.
 *
 * Controlled (receiving prop `fieldState`): it will not have any local state
 * and just return the received `fieldState`.
 * This is when used like <Form><Form.Field component={MyField} /></Form>.
 *
 * Form Field (receiving prop `fieldState` and inside a form): it will connect
 * with the form and retrieve field state from the form state.
 * This is when used like <Form><MyField /></Form>.
 *
 * Standalone (not receiving prop `fieldState` and not inside a form): it will
 * have local field state and do validations by itself.
 * This is when used like <MyField />.
 */
export function useFieldState<V>(
  props: InputFieldProps<V>,
): {
  fieldState: FieldState<V>;
  onBlur?: InputFieldProps<V>['onBlur'];
  onFocus?: InputFieldProps<V>['onFocus'];
  onValueChange?: InputFieldProps<V>['onValueChange'];
} {
  const {
    fieldState,
    name,
    onBlur,
    onFocus,
    onValueChange,
    validate,
    value,
  } = props;
  const formState = useFormState();
  const mode = fieldState
    ? 'controlled'
    : formState && name
    ? 'form-field'
    : 'standalone';

  /* Begin form field mode */
  warning(
    !(formState && !name),
    `Field is inside a form but is regarded as a standalone field as it doesn't have the "name" prop.`,
  );
  // register validators with form
  React.useEffect(() => {
    if (mode === 'form-field' && formState && name && validate) {
      formState.actions.setFieldValidators(name, validate);
    }
    // TODO: We currently don't support changing field name and validators on
    // the fly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formFieldModeReturnValue = React.useMemo(() => {
    if (mode !== 'form-field' || !formState || !name) return;
    const {
      fieldActive,
      fieldDirty,
      fieldPristine,
      fieldTouched,
      fieldVisited,
      getFieldError,
      getFieldValue,
      actions,
    } = formState;
    return {
      fieldState: {
        // field state
        active: fieldActive(name),
        dirty: fieldDirty(name),
        error: getFieldError(name),
        pristine: fieldPristine(name),
        touched: fieldTouched(name),
        value: getFieldValue(name),
        visited: fieldVisited(name),
        // form state
        formState,
      },
      onBlur: () => {
        onBlur && onBlur();
        actions.blur(name);
      },
      onFocus: () => {
        onFocus && onFocus();
        actions.focus(name);
      },
      onValueChange: (value: V) => {
        onValueChange && onValueChange(value);
        actions.changeValue(name, value);
      },
    };
  }, [formState, mode, name, onBlur, onFocus, onValueChange]);
  /* End form field mode */

  /* Begin standalone mode */
  const [standaloneState, dispatch] = React.useReducer(
    createFieldStateReducer<V>(),
    props,
    (...args) => getInitialStandaloneState(mode, ...args),
  );

  // validate whenever value or validator changes
  React.useEffect(() => {
    if (
      mode === 'standalone' &&
      (value !== prevValueRef.current || validate !== prevValidateRef.current)
    ) {
      dispatch({
        type: 'CHANGE_VALUE_OR_VALIDATORS',
        newValue: value,
        newValidators: validate,
      });
    }
  }, [mode, validate, value]);
  // save previous validator
  const prevValidateRef = React.useRef(validate);
  React.useEffect(() => {
    prevValidateRef.current = validate;
  });
  // save previous value
  const prevValueRef = React.useRef(value);
  React.useEffect(() => {
    prevValueRef.current = value;
  });

  const standaloneModeReturnValue = React.useMemo(() => {
    if (mode !== 'standalone') return;
    return {
      fieldState: getFieldStateFromStandaloneState(value, standaloneState),
      onBlur: () => {
        dispatch({
          type: 'BLUR',
        });
        onBlur && onBlur();
      },
      onFocus: () => {
        dispatch({
          type: 'FOCUS',
        });
        onFocus && onFocus();
      },
      onValueChange,
    };
  }, [mode, onBlur, onFocus, onValueChange, standaloneState, value]);
  /* End standalone mode */

  return mode === 'controlled'
    ? {
        fieldState: fieldState!,
        onBlur,
        onFocus,
        onValueChange,
      }
    : mode === 'form-field'
    ? formFieldModeReturnValue!
    : standaloneModeReturnValue!;
}

type StandaloneFieldState<V> = Pick<FieldState<V>, 'touched' | 'visited'> & {
  errors: string[];
  initialValue?: V;
};
type Action<V> =
  | {
      type: 'BLUR';
    }
  | {
      type: 'CHANGE_VALUE_OR_VALIDATORS';
      newValue: InputFieldProps<V>['value'];
      newValidators: InputFieldProps<V>['validate'];
    }
  | {
      type: 'FOCUS';
    };

function createFieldStateReducer<V>() {
  return function fieldStateReducer(
    state: StandaloneFieldState<V>,
    action: Action<V>,
  ): StandaloneFieldState<V> {
    switch (action.type) {
      case 'BLUR':
        return {
          ...state,
          touched: true,
        };
      case 'CHANGE_VALUE_OR_VALIDATORS': {
        const oldErrors = state.errors;
        const newState: typeof state = {
          ...state,
          errors: [],
        };
        if (action.newValidators) {
          newState.errors = validate(
            getFieldStateFromStandaloneState(action.newValue, newState),
            action.newValidators,
          );
        }
        if (isEqual(oldErrors, newState.errors)) {
          // Errors didn't changed. Return old state to avoid rerender.
          return state;
        }
        return newState;
      }
      case 'FOCUS':
        return {
          ...state,
          visited: true,
        };
      default:
        return state;
    }
  };
}

function getInitialStandaloneState<V>(
  mode: 'controlled' | 'form-field' | 'standalone',
  props: InputFieldProps<V>,
): StandaloneFieldState<V> {
  const initialState: StandaloneFieldState<V> = {
    errors: [],
    initialValue: props.value == null ? undefined : props.value,
    touched: false,
    visited: false,
  };
  if (mode === 'standalone' && props.validate) {
    initialState.errors = validate(
      getFieldStateFromStandaloneState(props.value, initialState),
      props.validate,
    );
  }
  return initialState;
}

function getFieldStateFromStandaloneState<V>(
  value: InputFieldProps<V>['value'],
  { errors, initialValue, touched, visited }: StandaloneFieldState<V>,
): FieldState<V> {
  const pristine = deepEqual(initialValue, value);
  return {
    dirty: !pristine,
    error: errors[0],
    pristine,
    touched,
    value,
    visited,
  };
}

function validate<V>(
  state: FieldState<V>,
  validators: NonNullable<InputFieldProps<V>['validate']>,
) {
  const errors: StandaloneFieldState<V>['errors'] = [];

  const validateField = (validator: FieldValidator<V>) => {
    const error = validator(state.value, state);
    if (error) {
      errors.push(error);
    }
  };
  if (Array.isArray(validators)) {
    validators.forEach(validateField);
  } else {
    validateField(validators);
  }

  return errors;
}

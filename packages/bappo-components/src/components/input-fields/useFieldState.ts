import React from 'react';

import { deepEqual } from '../../primitives/Form/FormState/utils';
import { FieldState, FieldValidator, InputFieldProps } from './types';

export function useFieldState<V>(props: InputFieldProps<V>) {
  const insideForm = !!props.fieldState;
  const [minimalState, dispatch] = React.useReducer(
    createFieldStateReducer<V>(),
    props,
    getInitialState,
  );

  // validate whenever value or validator changes
  React.useEffect(() => {
    if (
      !insideForm &&
      (props.value !== prevValueRef.current ||
        props.validate !== prevValueRef.current)
    ) {
      dispatch({
        type: 'CHANGE_VALUE_OR_VALIDATORS',
        newValue: props.value,
        newValidators: props.validate,
      });
    }
  }, [insideForm, props.validate, props.value]);
  // save previous validator
  const prevValidateRef = React.useRef(props.validate);
  React.useEffect(() => {
    prevValidateRef.current = props.validate;
  });
  // save previous value
  const prevValueRef = React.useRef(props.value);
  React.useEffect(() => {
    prevValueRef.current = props.value;
  });

  return {
    fieldState: props.fieldState
      ? props.fieldState
      : getFieldStateFromMinimal(props.value, minimalState),
    onBlur: insideForm
      ? props.onBlur
      : () => {
          dispatch({
            type: 'BLUR',
          });
          props.onBlur && props.onBlur();
        },
    onFocus: insideForm
      ? props.onFocus
      : () => {
          dispatch({
            type: 'FOCUS',
          });
          props.onFocus && props.onFocus();
        },
  };
}

type MinimalFieldState<V> = Pick<FieldState<V>, 'touched' | 'visited'> & {
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
    state: MinimalFieldState<V>,
    action: Action<V>,
  ): MinimalFieldState<V> {
    switch (action.type) {
      case 'BLUR':
        return {
          ...state,
          touched: true,
        };
      case 'CHANGE_VALUE_OR_VALIDATORS':
        const newState: typeof state = {
          ...state,
          errors: [],
        };
        if (action.newValidators) {
          newState.errors = validate(
            getFieldStateFromMinimal(action.newValue, newState),
            action.newValidators,
          );
        }
        return newState;
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

function getInitialState<V>(props: InputFieldProps<V>): MinimalFieldState<V> {
  const initialState: MinimalFieldState<V> = {
    errors: [],
    initialValue: props.value,
    touched: false,
    visited: false,
  };
  if (props.validate) {
    initialState.errors = validate(
      getFieldStateFromMinimal(props.value, initialState),
      props.validate,
    );
  }
  return initialState;
}

function getFieldStateFromMinimal<V>(
  value: InputFieldProps<V>['value'],
  { errors, initialValue, touched, visited }: MinimalFieldState<V>,
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
  const errors: MinimalFieldState<V>['errors'] = [];

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

// @flow

import * as React from 'react';
import { get, flow, identity, merge, pick, set, unset } from 'lodash/fp';
import { ReComponent, NoUpdate, Update } from 'react-recomponent';
import type {
  ActionSenders,
  ActionTypes,
  Errors,
  FieldValidator,
  FormState,
  FormValidator,
  StateAndHelpers,
  StateAndHelpersAndActions,
  Values,
} from './types.js.flow';
import { deepEqual, unwrapChildren } from './utils';
import { FormStateProvider } from './Context';
import SubmissionError from './SubmissionError';

type Props = {
  children: (
    stateAndHelpersAndActions: StateAndHelpersAndActions,
  ) => React.Node,
  initialValues?: mixed,
};
type FormInternalState = {
  fieldValidators: {
    [string]: FieldValidator | FieldValidator[],
  },
  formValidator: ?FormValidator,
  initialValues: Values,
};
type State = FormState & FormInternalState;

const formStateKeys = [
  'activeField',
  'allTouched',
  'anyTouched',
  'fieldErrors',
  'fieldStates',
  'formError',
  'submitting',
  'values',
];
const getFormState = (state: State): FormState => pick(formStateKeys, state);
const getStateAndHelpers = (state: State): StateAndHelpers => {
  const { allTouched, fieldErrors, fieldStates, initialValues, values } = state;

  const pristine = deepEqual(initialValues, values);
  const getFieldError = fieldName => get(fieldName, fieldErrors);
  const getFieldValue = fieldName => get(fieldName, values);
  const fieldActive = fieldName => !!get([fieldName, 'active'], fieldStates);
  const fieldPristine = fieldName =>
    deepEqual(get(fieldName, initialValues), getFieldValue(fieldName));
  const fieldTouched = fieldName =>
    !!allTouched || !!get([fieldName, 'touched'], fieldStates);
  const fieldVisited = fieldName => !!get([fieldName, 'visited'], fieldStates);

  return {
    // state
    ...getFormState(state),
    // computed
    dirty: !pristine,
    pristine,
    // helpers
    fieldActive,
    fieldDirty: fieldName => !fieldPristine(fieldName),
    fieldPristine,
    fieldTouched,
    fieldVisited,
    getFieldError,
    getFieldValue,
  };
};
const validate = (state: State): Errors => {
  const stateAndHelpers = getStateAndHelpers(state);
  const { fieldValidators, formValidator } = state;
  const { values, getFieldValue } = stateAndHelpers;

  let errors = {};

  // validate fields
  const validateField = (fieldName, fn) => {
    if (typeof fn !== 'function') return;
    const error = fn(getFieldValue(fieldName), values);
    if (error) {
      errors = set(fieldName, error, errors);
    }
  };
  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    if (Array.isArray(validators)) {
      validators.forEach(validator => validateField(fieldName, validator));
    } else {
      validateField(fieldName, validators);
    }
  });

  // validate form
  if (formValidator) {
    errors = merge(errors, formValidator(stateAndHelpers));
  }

  return errors;
};
const getStateAfterValidation = (state: State): State => {
  const { __formError, ...fieldErrors } = validate(state);
  let newState = set('fieldErrors', fieldErrors, state);
  if (__formError !== undefined) {
    newState = set('formError', __formError, newState);
  }
  return newState;
};

class FormStateManager extends ReComponent<Props, State, ActionTypes> {
  static defaultProps = {
    initialValues: {},
  };

  state: State = {
    activeField: undefined,
    allTouched: false,
    anyTouched: false,
    fieldErrors: {},
    fieldStates: {},
    formError: undefined,
    submitting: false,
    values: this.props.initialValues,
    // internal state
    fieldValidators: {},
    formValidator: undefined,
    initialValues: this.props.initialValues,
  };

  static reducer(
    // $FlowFixMe: ReComponent's action param is { type: ActionTypes }
    action: { type: ActionTypes, payload?: mixed, meta?: mixed },
    state: State,
  ) {
    console.log(action);
    switch (action.type) {
      case 'BLUR': {
        const {
          meta: { fieldName },
        } = action;
        const update = flow(
          state.activeField === fieldName
            ? set('activeField', undefined)
            : identity,
          set('anyTouched', true),
          unset(['fieldStates', fieldName, 'active']),
          state.allTouched
            ? identity
            : set(['fieldStates', fieldName, 'touched'], true),
        );
        const newState = update(state);
        return Update(newState);
      }
      case 'CHANGE_VALUE': {
        const {
          meta: { fieldName },
          payload,
        } = action;
        let newState = set(`values.${fieldName}`, payload, state);

        newState = getStateAfterValidation(newState);

        return Update(newState);
      }
      case 'FOCUS': {
        const {
          meta: { fieldName },
        } = action;
        const previouslyActive = get('activeField', state);
        const update = flow(
          set('activeField', fieldName),
          unset(['fieldStates', previouslyActive, 'active']),
          set(['fieldStates', fieldName, 'active'], true),
          set(['fieldStates', fieldName, 'visited'], true),
        );
        const newState = update(state);
        return Update(newState);
      }
      // case "SET_ERRORS": {
      //   const { payload: { __formError, ...fieldErrors } } = action;
      //   const update = flow(
      //     set("fieldErrors", fieldErrors),
      //     set("formError", __formError)
      //   );
      //   const newState = update(state);
      //   return Update(newState);
      // }
      case 'SET_FIELD_VALIDATORS': {
        const {
          meta: { fieldName },
          payload,
        } = action;
        const newState = set(['fieldValidators', fieldName], payload, state);
        return Update(newState);
      }
      case 'SET_SUBMIT_SUCCEEDED': {
        const update = flow(
          set('submitting', false),
          set('formError', undefined),
          // unset("submitFailed"),
          // set("submitSucceeded", true),
          // unset("submitErrors")
        );
        const newState = update(state);
        return Update(newState);
      }
      case 'SET_SUBMIT_FAILED': {
        const {
          payload: { __formError, ...fieldErrors },
        } = action;
        const update = flow(
          set('submitting', false),
          set('fieldErrors', fieldErrors),
          set('formError', __formError),
          // unset('submitSucceeded'),
          // set('submitFailed', true),
          // Object.keys(fieldErrors).length ? set('submitErrors', fieldErrors) : unset('submitErrors'),
        );
        const newState = update(state);
        return Update(newState);
      }
      case 'START_SUBMIT': {
        const newState = set('submitting', true, state);
        return Update(newState);
      }
      case 'TOUCH_ALL': {
        const update = flow(
          set('allTouched', true),
          set('anyTouched', true),
        );
        const newState = update(state);
        return Update(newState);
      }
      case 'VALIDATE': {
        const newState = getStateAfterValidation(state);
        return Update(newState);
      }
      default:
        return NoUpdate();
    }
  }

  componentDidMount() {
    this.send({
      type: 'VALIDATE',
    });
  }

  render() {
    const render = unwrapChildren(this.props.children);
    if (typeof render !== 'function') {
      throw new Error('Prop `children` must be a function');
    }

    const stateAndHelpers = getStateAndHelpers(this.state);
    const stateAndHelpersAndActions: StateAndHelpersAndActions = {
      ...stateAndHelpers,
      ...this._getActions(stateAndHelpers),
    };
    console.log(stateAndHelpersAndActions);

    return (
      <FormStateProvider value={stateAndHelpersAndActions}>
        {render(stateAndHelpersAndActions)}
      </FormStateProvider>
    );
  }

  _getActions(stateAndHelpers: StateAndHelpers): ActionSenders {
    return {
      blur: fieldName =>
        this.send({
          type: 'BLUR',
          meta: {
            fieldName,
          },
        }),
      changeValue: (fieldName, value) => {
        this.send({
          type: 'CHANGE_VALUE',
          meta: {
            fieldName,
          },
          payload: value,
        });
      },
      focus: fieldName =>
        this.send({
          type: 'FOCUS',
          meta: {
            fieldName,
          },
        }),
      // setErrors: errors => {
      //   this.send({
      //     type: "SET_ERRORS",
      //     payload: errors
      //   });
      // },
      setFieldValidators: (fieldName, validators) => {
        this.send({
          type: 'SET_FIELD_VALIDATORS',
          meta: {
            fieldName,
          },
          payload: validators,
        });
      },
      // $FlowFixMe
      submit: async doSubmit => {
        try {
          this.send({
            type: 'START_SUBMIT',
          });
          // $FlowFixMe
          const res = await doSubmit();
          this.send({
            type: 'SET_SUBMIT_SUCCEEDED',
          });
          return res;
        } catch (err) {
          if (err instanceof SubmissionError) {
            this.send({
              type: 'SET_SUBMIT_FAILED',
              payload: err.errors,
            });
          } else {
            throw err;
          }
        }
      },
      touchAll: () => {
        this.send({
          type: 'TOUCH_ALL',
        });
      },
    };
  }
}

export default FormStateManager;

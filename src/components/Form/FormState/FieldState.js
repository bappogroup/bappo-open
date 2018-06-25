// @flow

import * as React from 'react';
import type {
  FieldValidator,
  StateAndHelpersAndActions,
} from './types.js.flow';
import { unwrapChildren } from './utils';
import withFormState from './withFormState';

type FieldState = {
  active: boolean,
  dirty: boolean,
  error: mixed,
  pristine: boolean,
  touched: boolean,
  value: mixed,
  visited: boolean,
};
type RequiredProps = {
  children: (fieldState: FieldState) => React.Node,
  name: string,
};
type OptionalProps = {
  validate?: FieldValidator,
};
type HOCProps = {
  formState: StateAndHelpersAndActions,
};
type Props = RequiredProps & OptionalProps & HOCProps;

class FieldStateManager extends React.Component<Props> {
  constructor(...args) {
    super(...args);

    if (!this.props.name) {
      throw new Error(`Field name is required`);
    }
  }

  componentDidMount() {
    const { formState, name, validate } = this.props;

    if (validate) {
      formState.setFieldValidators(name, validate);
    }
  }

  getFieldStateAndHelpers() {
    const { formState, name } = this.props;
    const {
      fieldActive,
      fieldDirty,
      fieldPristine,
      fieldTouched,
      fieldVisited,
      getFieldError,
      getFieldValue,
      changeValue,
    } = formState;

    return {
      // state
      active: fieldActive(name),
      dirty: fieldDirty(name),
      error: getFieldError(name),
      pristine: fieldPristine(name),
      touched: fieldTouched(name),
      value: getFieldValue(name),
      visited: fieldVisited(name),
      // actions
      changeValue,
    };
  }

  render() {
    const render = unwrapChildren(this.props.children);
    if (typeof render !== 'function') {
      throw new Error('Prop `children` must be a function');
    }

    return render(this.getFieldStateAndHelpers());
  }
}

export default withFormState(FieldStateManager);

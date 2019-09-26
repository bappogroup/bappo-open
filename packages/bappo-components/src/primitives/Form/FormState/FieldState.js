// @flow

import * as React from 'react';
import type {
  FieldState,
  FieldValidator,
  FormStateAndHelpersAndActions,
} from './types.js.flow';
import { unwrapChildren } from './utils';
import withFormState from './withFormState';

type RequiredProps = {
  children: (fieldState: FieldState) => React.Node,
  name: string,
};
type OptionalProps = {
  validate?: FieldValidator,
};
type HOCProps = {
  formState: FormStateAndHelpersAndActions,
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
      formState.actions.setFieldValidators(name, validate);
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
    } = formState;

    return {
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

import React from 'react';

import { useFormStateStrict } from './Context';
import { FieldValidator } from './types';

export function useFieldState({
  name,
  validate,
}: {
  name: string;
  validate?: FieldValidator | FieldValidator[];
}) {
  const formState = useFormStateStrict();
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

  // register validators with form
  React.useEffect(() => {
    if (validate) {
      actions.setFieldValidators(name, validate);
    }
    // TODO: We currently don't support changing field name and validators on
    // the fly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

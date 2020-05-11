import invariant from 'invariant';
import React from 'react';

import { FormStateAndHelpersAndActions } from './types';

const Context = React.createContext<FormStateAndHelpersAndActions | undefined>(
  undefined,
);

export function FormStateProvider({
  children,
  value,
}: {
  value: FormStateAndHelpersAndActions;
  children?: React.ReactNode;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFormState() {
  return React.useContext(Context);
}

export function useFormStateStrict() {
  const formState = useFormState();
  invariant(formState, `Please put the component inside a Form or ModalForm.`);
  return formState;
}

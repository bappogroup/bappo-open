import React from 'react';
import { FormStateAndHelpersAndActions } from './types';
export declare function FormStateProvider({ children, value, }: {
    value: FormStateAndHelpersAndActions;
    children?: React.ReactNode;
}): JSX.Element;
export declare function useFormState(): FormStateAndHelpersAndActions | undefined;
export declare function useFormStateStrict(): FormStateAndHelpersAndActions;

import React from 'react';
import { InputField, InputFieldComponent } from '../../components/input-fields/types';
import { FieldValidator } from './FormState/types';
declare type InternalProps<V, InputProps extends {
    [prop: string]: any;
}> = {
    component: InputFieldComponent<V, InputProps>;
    inputRef: React.Ref<InputField>;
    label: string;
    name: string;
    props: InputProps;
    testID?: string;
    validate?: FieldValidator | FieldValidator[];
};
export declare const Field: React.ForwardRefExoticComponent<Pick<InternalProps<unknown, {
    [prop: string]: any;
}>, "label" | "name" | "validate" | "component" | "testID"> & {
    props?: {
        [prop: string]: any;
    } | undefined;
} & React.RefAttributes<InputField>>;
export {};

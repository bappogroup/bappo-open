import React from 'react';
import { FormProps } from '../types';
declare type Props = FormProps & {
    className?: any;
};
declare class Form extends React.Component<Props> {
    static Field: React.ForwardRefExoticComponent<Pick<{
        component: React.ComponentType<{
            [prop: string]: any;
        } & import("../../..").InputFieldProps<unknown>>;
        inputRef: React.Ref<import("../../..").InputField>;
        label: string;
        name: string;
        props: {
            [prop: string]: any;
        };
        testID?: string | undefined;
        validate?: import("../FormState/types").FieldValidator | import("../FormState/types").FieldValidator[] | undefined;
    }, "label" | "name" | "validate" | "component" | "testID"> & {
        props?: {
            [prop: string]: any;
        } | undefined;
    } & React.RefAttributes<import("../../..").InputField>>;
    static SubmissionError: any;
    static SubmitButton: ({ children, className, disabled, style, testID, }: import("../SubmitButton/types").SubmitButtonProps & {
        className?: string | undefined;
    }) => JSX.Element;
    render(): JSX.Element;
}
export default Form;

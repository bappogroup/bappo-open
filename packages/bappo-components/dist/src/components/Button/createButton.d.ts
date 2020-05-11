import React from 'react';
import { ButtonProps } from './types';
declare type Props = ButtonProps & {
    className?: string;
};
interface ButtonContainerProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onPress?: () => void;
    style?: any;
    testID?: string;
    [prop: string]: any;
}
declare const createButton: (containerComponent: React.ComponentType<ButtonContainerProps & {
    className?: string | undefined;
}>, getContainerProps?: ((buttonProps: ButtonProps) => Partial<ButtonContainerProps>) | undefined) => {
    (props: Props): JSX.Element;
    defaultProps: {
        type: string;
    };
};
export default createButton;

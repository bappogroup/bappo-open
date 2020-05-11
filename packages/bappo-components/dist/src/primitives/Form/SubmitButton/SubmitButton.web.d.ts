/// <reference types="react" />
import { SubmitButtonProps } from './types';
declare type Props = SubmitButtonProps & {
    className?: string;
};
declare const SubmitButton: ({ children, className, disabled, style, testID, }: Props) => JSX.Element;
export default SubmitButton;
